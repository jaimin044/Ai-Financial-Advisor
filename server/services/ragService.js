// Simple text → vector (bag of words)
const textToVector = (text) => {
    const words = text.toLowerCase().split(/\W+/);
    const freq = {};

    words.forEach(word => {
        if (word) {
            freq[word] = (freq[word] || 0) + 1;
        }
    });

    return freq;
};

// Cosine similarity for objects
const cosineSimilarity = (vecA, vecB) => {
    let dot = 0;
    let normA = 0;
    let normB = 0;

    const allWords = new Set([...Object.keys(vecA), ...Object.keys(vecB)]);

    allWords.forEach(word => {
        const a = vecA[word] || 0;
        const b = vecB[word] || 0;

        dot += a * b;
        normA += a * a;
        normB += b * b;
    });

    if (normA === 0 || normB === 0) return 0;

    return dot / (Math.sqrt(normA) * Math.sqrt(normB));
};

// Embed news
const embedNews = async (newsArray) => {
    const embeddings = [];

    for (let item of newsArray) {
        const text = `${item.title} ${item.description}`;
        const vector = textToVector(text);

        embeddings.push({
            text,
            vector
        });
    }

    return embeddings;
};

// Get top relevant news
const getTopNews = async (query, embeddedNews) => {
    const queryVector = textToVector(query);

    const scored = embeddedNews.map(item => ({
        text: item.text,
        score: cosineSimilarity(queryVector, item.vector)
    }));

    scored.sort((a, b) => b.score - a.score);

    return scored.slice(0, 3);
};

module.exports = {
    embedNews,
    getTopNews
};