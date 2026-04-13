const express = require("express");
const router = express.Router();

const { getNews } = require("../services/newsService");
const { embedNews, getTopNews } = require("../services/ragService");
const { analyzeDecision } = require("../services/agentService");

router.post("/", async (req, res) => {
    const { query } = req.body;

    const cleaned = query.replace(/[^a-zA-Z0-9 ]/g, "").trim();
    const words = cleaned.split(" ").filter(word => word.length > 0);

    const keyword = words.length > 0 ? words[words.length - 1] : "stock";

    const news = await getNews(keyword);

    const embeddings = await embedNews(news);

    const topNews = await getTopNews(query, embeddings);

    const decisionData = analyzeDecision(topNews);

    res.json({
        keyword,
        topNews,
        ...decisionData
    });
});

module.exports = router;