- Optimized Mediator Utility

---  /utils/mediator.js:

```
const translate = require("@vitalets/google-translate-api");
const franc = require("franc");
const { getCache, setCache } = require("./cache");

// Detect language using franc
function detectLanguage(text) {
  if (!text) return "en";
  const langCode = franc(text, { minLength: 3 });
  if (langCode === "hin") return "hi";
  return "en"; // default English
}

// Translate single text if needed
async function translateIfNeeded(text, preferredLang) {
  if (!text) return text;

  const cacheKey = `translate:${text}:${preferredLang}`;
  const cached = await getCache(cacheKey);
  if (cached) return cached;

  const detectedLang = detectLanguage(text);
  if (detectedLang === preferredLang) return text;

  try {
    const res = await translate(text, { from: detectedLang, to: preferredLang });
    await setCache(cacheKey, res.text, 3600); // cache 1 hour
    return res.text;
  } catch (err) {
    console.error("Translation error:", err);
    return text;
  }
}

// Translate only required fields of a single object
async function translateObjectFields(obj, preferredLang, fields = ["title", "description"]) {
  const result = { ...obj };
  for (const key of fields) {
    if (result[key]) result[key] = await translateIfNeeded(result[key], preferredLang);
  }
  return result;
}

// Translate arrays of objects efficiently
async function translateArray(arr, preferredLang, fields = ["title", "description"]) {
  return Promise.all(arr.map(item => translateObjectFields(item, preferredLang, fields)));
}

module.exports = { translateIfNeeded, translateObjectFields, translateArray };


```

- Job Routes with Optimized Mediator

/routes/job.routes.js:

```
const express = require("express");
const router = express.Router();
const { Job } = require("../models/job.model");
const { translateArray } = require("../utils/mediator");

// Create Job (store original input)
router.post("/", async (req, res) => {
  try {
    const { title, description, jobType, location } = req.body;
    const job = await Job.create({ title, description, jobType, location, createdBy: req.user._id });
    res.status(201).json(job);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create job" });
  }
});

// Get Jobs (translate only necessary fields)
router.get("/", async (req, res) => {
  try {
    const preferredLang = req.query.lang || "en";
    const jobs = await Job.find();
    
    const translatedJobs = await translateArray(jobs.map(j => j.toObject()), preferredLang, ["title", "description"]);

    res.json(translatedJobs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
});

module.exports = router;


```