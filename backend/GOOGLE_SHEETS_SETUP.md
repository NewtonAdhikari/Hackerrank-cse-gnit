# Google Sheets Setup Guide — HackerRank Club GNIT

This guide walks you through setting up the Google Sheets database backend for the HackerRank Club website.

## Step 1: Create the Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com) and create a new blank spreadsheet
2. Name it `HackerRank Club GNIT Database`
3. Note the spreadsheet ID from the URL: `https://docs.google.com/spreadsheets/d/{SPREADSHEET_ID}/edit`

## Step 2: Create Sheets (Tabs)

Create 8 tabs (sheets) at the bottom of the spreadsheet, each named EXACTLY as below (case-sensitive):

1. `Leadership`
2. `Members`
3. `Events`
4. `Registrations`
5. `Gallery`
6. `Achievements`
7. `ContactMessages`
8. `Newsletter`

## Step 3: Add Column Headers

In row 1 of each sheet, add the headers EXACTLY as shown (lowercase, underscores preserved):

### Leadership
| id | name | position | photo | department | branch | year | linkedin | github | email |

### Members
| id | name | roll | branch | year | role | photo |

### Events
| id | title | slug | banner | description | date | venue | status | registration_link |

### Registrations
| id | event | name | roll | branch | year | email | phone | timestamp |

### Gallery
| id | title | type | url | event |

### Achievements
| id | title | description | year | image |

### ContactMessages
| id | name | email | message | timestamp |

### Newsletter
| id | email | timestamp |

> **Tip:** Instead of adding headers manually, you can paste the Apps Script code (in `backend/Code.gs`) into Extensions → Apps Script and run the `setupSheets()` function. It will create all sheets and headers automatically.

## Step 4: Deploy the Apps Script Backend

1. In the Google Sheet, click **Extensions → Apps Script**
2. Delete the default `Code.gs` content
3. Paste the entire content of `backend/Code.gs` from this repo
4. Click **Save** (Ctrl/Cmd + S)
5. Click **Run → setupSheets** to auto-create headers (authorize when prompted)
6. Click **Deploy → New Deployment**
7. Choose type **Web app**
8. Configure:
   - **Description**: `HackerRank Club API v1`
   - **Execute as**: `Me (your-email@gmail.com)`
   - **Who has access**: `Anyone`
9. Click **Deploy** and authorize the permissions
10. Copy the **Web App URL** (looks like `https://script.google.com/macros/s/AKfyc.../exec`)

## Step 5: Add Sample Data

Add a few rows of data to each sheet so the website has content to display. See `sample-data.csv` for example rows you can paste in.

## Step 6: Connect to the Website

1. Copy the Web App URL from step 4
2. Set it as an environment variable in Vercel:
   ```
   GAS_API_URL=https://script.google.com/macros/s/AKfyc.../exec
   ```
3. Redeploy the website. Contact, newsletter, and registration forms will submit through Next.js API routes and then forward to Google Apps Script server-side.

## Step 7: Verify

- Visit the site — leadership, members, events, gallery, and achievements should load from Sheets
- Submit a registration form — a new row should appear in the `Registrations` sheet
- Submit a contact form — a new row should appear in the `ContactMessages` sheet

## Troubleshooting

- **CORS errors**: Browser forms should call `/api/contact`, `/api/newsletter`, and `/api/register`, not the Apps Script URL directly.
- **Empty data**: Verify headers exactly match the expected names (case-sensitive)
- **404 on API**: Re-deploy the Apps Script as a new version after any code change
- **Permission denied**: Re-authorize the script from Apps Script editor (Run → any function)
