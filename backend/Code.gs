/**
 * HackerRank Club GNIT — Google Apps Script REST API
 * Backend for the Next.js website
 *
 * Setup:
 * 1. Create a new Google Sheet at https://sheets.google.com
 * 2. Add the following sheets (tabs) with these EXACT column headers in row 1:
 *
 *    Leadership:       id | name | position | photo | department | branch | year | linkedin | github | email
 *    Members:          id | name | roll | branch | year | role | photo
 *    Events:           id | title | slug | banner | description | date | venue | status | registration_link
 *    Registrations:    id | event | name | roll | branch | year | email | phone | timestamp
 *    Gallery:          id | title | type | url | event
 *    Achievements:     id | title | description | year | image
 *    ContactMessages:  id | name | email | message | timestamp
 *    Newsletter:       id | email | timestamp
 *
 * 3. In the Sheet, go to Extensions → Apps Script
 * 4. Paste this entire file content into Code.gs (overwrite the default)
 * 5. Click Deploy → New Deployment → Type: Web App
 *    - Description: HackerRank Club API
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 6. Copy the deployment URL (looks like https://script.google.com/macros/s/AKfyc.../exec)
 * 7. Set GAS_API_URL in your Vercel env to this URL
 */

const SHEET_NAMES = {
  LEADERSHIP: 'Leadership',
  MEMBERS: 'Members',
  EVENTS: 'Events',
  REGISTRATIONS: 'Registrations',
  GALLERY: 'Gallery',
  ACHIEVEMENTS: 'Achievements',
  CONTACT: 'ContactMessages',
  NEWSLETTER: 'Newsletter',
}

const HEADERS = {
  Leadership: ['id', 'name', 'position', 'photo', 'department', 'branch', 'year', 'linkedin', 'github', 'email'],
  Members: ['id', 'name', 'roll', 'branch', 'year', 'role', 'photo'],
  Events: ['id', 'title', 'slug', 'banner', 'description', 'date', 'venue', 'status', 'registration_link'],
  Registrations: ['id', 'event', 'name', 'roll', 'branch', 'year', 'email', 'phone', 'timestamp'],
  Gallery: ['id', 'title', 'type', 'url', 'event'],
  Achievements: ['id', 'title', 'description', 'year', 'image'],
  ContactMessages: ['id', 'name', 'email', 'message', 'timestamp'],
  Newsletter: ['id', 'email', 'timestamp'],
}

// CORS headers — adjust ORIGIN in production to your Vercel domain
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
}

function getSheet(name) {
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  let sheet = ss.getSheetByName(name)
  if (!sheet) {
    sheet = ss.insertSheet(name)
    sheet.getRange(1, 1, 1, HEADERS[name].length).setValues([HEADERS[name]])
  }
  return sheet
}

function sheetToJSON(sheet) {
  const data = sheet.getDataRange().getValues()
  if (data.length < 2) return []
  const headers = data[0]
  return data.slice(1).filter(row => row[0]).map(row => {
    const obj = {}
    headers.forEach((h, i) => { obj[h] = row[i] })
    return obj
  })
}

function appendRow(sheetName, rowData) {
  const sheet = getSheet(sheetName)
  const headers = HEADERS[sheetName]
  const row = headers.map(h => rowData[h] !== undefined ? rowData[h] : '')
  sheet.appendRow(row)
}

function generateId(prefix) {
  return prefix + '-' + Date.now() + '-' + Math.floor(Math.random() * 1000)
}

// ==================== ROUTER ====================

function doGet(e) {
  const path = (e.parameter.path || '').toLowerCase().replace(/^\//, '')
  try {
    let data
    switch (path) {
      case 'leadership':
        data = sheetToJSON(getSheet(SHEET_NAMES.LEADERSHIP)); break
      case 'members':
        data = sheetToJSON(getSheet(SHEET_NAMES.MEMBERS)); break
      case 'events':
        data = sheetToJSON(getSheet(SHEET_NAMES.EVENTS)); break
      case 'gallery':
        data = sheetToJSON(getSheet(SHEET_NAMES.GALLERY)); break
      case 'achievements':
        data = sheetToJSON(getSheet(SHEET_NAMES.ACHIEVEMENTS)); break
      default:
        return jsonOut({ error: 'Invalid path: ' + path }, 400)
    }
    return jsonOut({ success: true, data: data })
  } catch (err) {
    return jsonOut({ success: false, error: err.toString() }, 500)
  }
}

function doPost(e) {
  const path = (e.parameter.path || '').toLowerCase().replace(/^\//, '')
  let body = {}
  try { body = JSON.parse(e.postData.contents || '{}') } catch (err) {}

  try {
    switch (path) {
      case 'register': {
        const id = generateId('REG')
        appendRow(SHEET_NAMES.REGISTRATIONS, {
          id,
          event: body.event || '',
          name: body.fullName || body.name || '',
          roll: body.roll || '',
          branch: body.department || body.branch || '',
          year: body.year || '',
          email: body.email || '',
          phone: body.phone || '',
          timestamp: new Date().toISOString(),
        })
        // Optional: send confirmation email
        sendRegistrationEmail(body.email, id, body.event)
        return jsonOut({ success: true, id })
      }
      case 'contact': {
        const id = generateId('MSG')
        appendRow(SHEET_NAMES.CONTACT, {
          id,
          name: body.name || '',
          email: body.email || '',
          message: body.message || '',
          timestamp: new Date().toISOString(),
        })
        return jsonOut({ success: true, id })
      }
      case 'newsletter': {
        const id = generateId('NEWS')
        appendRow(SHEET_NAMES.NEWSLETTER, {
          id,
          email: body.email || '',
          timestamp: new Date().toISOString(),
        })
        return jsonOut({ success: true, id })
      }
      default:
        return jsonOut({ error: 'Invalid POST path: ' + path }, 400)
    }
  } catch (err) {
    return jsonOut({ success: false, error: err.toString() }, 500)
  }
}

// OPTIONS handler for CORS preflight
function doOptions() {
  return ContentService.createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT)
}

function jsonOut(obj, status = 200) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON)
}

// ==================== EMAIL ====================

function sendRegistrationEmail(toEmail, regId, eventName) {
  if (!toEmail) return
  try {
    MailApp.sendEmail({
      to: toEmail,
      subject: 'HackerRank Club CSE GNIT — Registration Confirmed',
      htmlBody: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #16a34a;">Registration Confirmed!</h2>
          <p>Thank you for registering for <strong>${eventName}</strong>.</p>
          <p>Your Registration ID is: <strong style="color: #dc2626;">${regId}</strong></p>
          <p>Please keep this ID for future reference. We will reach out with more details soon.</p>
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">
          <p style="color: #666; font-size: 12px;">
            HackerRank Club · CSE<br>
            Department of Computer Science & Engineering<br>
            Guru Nanak Institute of Technology<br>
            Ibrahimpatnam, Hyderabad, Telangana 501506
          </p>
        </div>
      `,
    })
  } catch (err) {
    console.log('Email send failed: ' + err.toString())
  }
}

// ==================== ADMIN HELPERS ====================
// Run these manually from the Apps Script editor for setup/maintenance

function setupSheets() {
  Object.keys(HEADERS).forEach(name => {
    const sheet = getSheet(name)
    const range = sheet.getRange(1, 1, 1, HEADERS[name].length)
    range.setValues([HEADERS[name]])
    range.setFontWeight('bold')
    sheet.setFrozenRows(1)
  })
  Logger.log('All sheets set up successfully.')
}

function clearAllData() {
  Object.keys(SHEET_NAMES).forEach(key => {
    const sheet = getSheet(SHEET_NAMES[key])
    const lastRow = sheet.getLastRow()
    if (lastRow > 1) sheet.deleteRows(2, lastRow - 1)
  })
  Logger.log('All data cleared.')
}
