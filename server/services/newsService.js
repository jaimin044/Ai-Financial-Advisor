const axios = require("axios");

const getNews = async (query) => {
    try {
        const apiKey = process.env.GNEWS_API_KEY;

        const url = `https://gnews.io/api/v4/search?q=${query}&lang=en&max=5&apikey=${apiKey}`;

        console.log("🔍 Fetching URL:", url);
        console.log("🔑 API KEY:", apiKey);

        const response = await axios.get(url);

        console.log("FULL RESPONSE:", response.data);

        return response.data.articles?.map(article => ({
            title: article.title,
            description: article.description
        })) || [];

    } catch (error) {
        console.error("❌ ERROR:", error.response?.data || error.message);
        return [];
    }
};

module.exports = { getNews };