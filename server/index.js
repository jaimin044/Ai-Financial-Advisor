const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: "../.env" });

const app = express();

app.use(cors());
app.use(express.json());

const analyzeRoute = require("./routes/analyze");
app.use("/analyze", analyzeRoute);

app.get("/", (req, res) => {
    res.send("Server is running");
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

const { getNews } = require("./services/newsService");

app.get("/test", async (req, res) => {
    const keyword = req.query.q || "Reliance";  // default if not provided

    const news = await getNews(keyword);

    res.json({
        keyword,
        news
    });
});