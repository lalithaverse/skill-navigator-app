require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { addToSheet } = require('./googlesheet'); // Make sure this path is correct

// Helper function to clean Gemini output before parsing
function extractJsonFromMarkdown(raw) {
  // Find anything between ``````
  const match = raw.match(/``````/i);
  if (match) {
    return match[1].trim();
  }
  // Fallback: Find anything between `````` without json
  const match2 = raw.match(/``````/i);
  if (match2) {
    return match2[1].trim();
  }
  // No code block at all, just return the raw string
  return raw.trim();
}

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/api/analyze', async (req, res) => {
  try {
    const user = req.body;

    const prompt = `
You are a career guidance expert.

Given the following candidate profile:
${JSON.stringify(user, null, 2)}

Provide your analysis as VALID JSON (no markdown, no explanations).

Return fields in this order:
1. "job_market_forecast": ...
2. "skills_needed": ...
3. "skill_gap": ...
4. "recommended_courses_city": ...
5. "recommended_courses_abroad": ...
6. "city_opportunities": ...
Ensure the output is pure JSON only. Example:
{
  "job_market_forecast": "...",
  "skills_needed": ["..."],
  "skill_gap": ["..."],
  "recommended_courses_city": ["..."],
  "recommended_courses_abroad": ["..."],
  "city_opportunities": "..."
}`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);

    // Extract and clean output, then parse as JSON
    const raw = result.response.text();
    console.log('Gemini raw output:', raw);

    const cleanJsonStr = extractJsonFromMarkdown(raw);
    let parsed;
    try {
      parsed = JSON.parse(cleanJsonStr);
      // Save to Google Sheets
      try {
        await addToSheet(user, parsed);
        console.log('Saved to Google Sheet.');
      } catch (sheetError) {
        console.error('Google Sheet Insert Error:', sheetError.message);
      }
      console.log('Sending to frontend:', parsed);
      res.json({ response: parsed });
    } catch (err) {
      console.error('Gemini output JSON parse failed:', err, cleanJsonStr);
      res.json({ response: raw, error: "LLM response was not valid JSON. Check for markdown formatting." });
    }
  } catch (e) {
    console.error('Backend /api/analyze error:', e);
    res.status(500).json({ error: e.message });
  }
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));