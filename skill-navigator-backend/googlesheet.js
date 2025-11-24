const { google } = require('googleapis');
const path = require('path');

// Replace with your Google Sheet ID (get it from the sheet URL)
const SHEET_ID = '18Xp3qqpECS7hC-vzAPjT4HsDS4YfCoGqlADVvo8gawY';

async function addToSheet(form, aiGuidance) {
  // Authorize using the service account
  const auth = new google.auth.GoogleAuth({
    keyFile: path.join(__dirname, 'google-credentials.json'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  const sheets = google.sheets({ version: 'v4', auth: await auth.getClient() });

  // Flat data for one row (tweak columns as needed)
  const data = [
    new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    form.name,
    form.age,
    form.city,
    form.education,
    form.domain,
    form.current_skills || form.skills,
    form.career_goal || form.careerGoal,
    form.studyAbroad,
    (Array.isArray(form.preferredCities) ? form.preferredCities.join(', ') : form.preferredCities),
    // Short AI summary or the whole guidance
    aiGuidance && JSON.stringify(aiGuidance)
  ];

  // Append as new row to "Sheet1" (change name if your sheet tab is different)
  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: "Sheet1",
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    resource: { values: [data] }
  });
}

module.exports = { addToSheet };
