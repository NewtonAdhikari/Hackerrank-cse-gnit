import { NextResponse } from 'next/server'
import { z } from 'zod'
import type { ApiErrorResponse, ApiSuccessResponse } from '@/lib/types'

type GasPath = 'contact' | 'newsletter' | 'register'

type GasResponse = {
  success?: boolean
  id?: unknown
  error?: unknown
  [key: string]: unknown
}

interface GasProxyConfig<TPayload, TExtra extends object> {
  path: GasPath
  schema: z.ZodType<TPayload>
  successMessage: string
  pickResponse?: (response: GasResponse) => TExtra
}

export async function handleGasProxy<TPayload, TExtra extends object = Record<string, never>>(
  request: Request,
  config: GasProxyConfig<TPayload, TExtra>
) {
  const rawPayload = await readJson(request)

  if (!rawPayload.ok) {
    console.error(`[api/${config.path}] Invalid JSON payload`, rawPayload.error)
    return jsonError(rawPayload.error, 400)
  }

  const parsedPayload = config.schema.safeParse(rawPayload.data)

  if (!parsedPayload.success) {
    const details = parsedPayload.error.flatten().fieldErrors as Record<string, string[]>
    console.warn(`[api/${config.path}] Validation failed`, details)
    return jsonError('Please check the form fields and try again.', 400, details)
  }

  const payload = parsedPayload.data
  console.info(`[api/${config.path}] Request payload`, payload)

  const gasUrl = getGasUrl(config.path)

  if (!gasUrl.ok) {
    console.error(`[api/${config.path}] Configuration error`, gasUrl.error)
    return jsonError(gasUrl.error, 500)
  }

  try {
    const response = await fetch(gasUrl.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      cache: 'no-store',
    })

    const responseText = await response.text()
    const gasResponse = parseGasResponse(responseText)

    console.info(`[api/${config.path}] Google Apps Script response`, {
      status: response.status,
      ok: response.ok,
      body: gasResponse ?? responseText,
    })

    if (!response.ok) {
      return jsonError('Google Apps Script returned an error. Please try again later.', 502)
    }

    if (!gasResponse) {
      return jsonError('Google Apps Script returned an invalid response.', 502)
    }

    if (gasResponse.success !== true) {
      const message =
        typeof gasResponse.error === 'string'
          ? gasResponse.error
          : 'Google Apps Script did not confirm the request.'

      return jsonError(message, 502)
    }

    const extra = config.pickResponse?.(gasResponse) ?? ({} as TExtra)

    return NextResponse.json<ApiSuccessResponse<TExtra>>({
      success: true,
      message: config.successMessage,
      ...extra,
    })
  } catch (error) {
    console.error(`[api/${config.path}] Proxy request failed`, error)
    return jsonError('Unable to submit the form right now. Please try again later.', 502)
  }
}

function getGasUrl(path: GasPath): { ok: true; url: string } | { ok: false; error: string } {
  const gasApiUrl = process.env.GAS_API_URL || process.env.NEXT_PUBLIC_GAS_API_URL

  if (!gasApiUrl) {
    return {
      ok: false,
      error: 'GAS_API_URL is not configured on the server.',
    }
  }

  try {
    const url = new URL(gasApiUrl)
    url.searchParams.set('path', path)
    return { ok: true, url: url.toString() }
  } catch {
    return {
      ok: false,
      error: 'GAS_API_URL is not a valid URL.',
    }
  }
}

async function readJson(
  request: Request
): Promise<{ ok: true; data: unknown } | { ok: false; error: string }> {
  try {
    return { ok: true, data: await request.json() }
  } catch {
    return { ok: false, error: 'Request body must be valid JSON.' }
  }
}

function parseGasResponse(responseText: string): GasResponse | null {
  if (!responseText.trim()) return null

  try {
    const parsed = JSON.parse(responseText)
    return parsed && typeof parsed === 'object' ? (parsed as GasResponse) : null
  } catch {
    return null
  }
}

function jsonError(
  error: string,
  status: number,
  details?: Record<string, string[]>
) {
  const body: ApiErrorResponse = {
    success: false,
    error,
    ...(details ? { details } : {}),
  }

  return NextResponse.json<ApiErrorResponse>(body, { status })
}
