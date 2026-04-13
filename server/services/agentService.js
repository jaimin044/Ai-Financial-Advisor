const analyzeDecision = (topNews) => {
    const positiveWords = [
        "growth", "profit", "gain", "approval", "expansion",
        "strong", "surge", "record", "rise", "positive", "upgrade"
    ];

    const negativeWords = [
        "loss", "decline", "drop", "fall", "risk",
        "lawsuit", "down", "pressure", "negative", "cut", "downgrade"
    ];

    let score = 0;

    topNews.forEach(item => {
        const text = item.text.toLowerCase();

        positiveWords.forEach(word => {
            if (text.includes(word)) score += 2;
        });

        negativeWords.forEach(word => {
            if (text.includes(word)) score -= 2;
        });
    });

    let decision = "HOLD";
    let reason = "Mixed or neutral sentiment in news.";
    let confidence = "50%";

    if (score >= 2) {
        decision = "BUY";
        reason = "Positive signals detected in recent news.";
        confidence = Math.min(60 + score * 5, 95) + "%";
    } else if (score <= -2) {
        decision = "SELL";
        reason = "Negative signals detected in recent news.";
        confidence = Math.min(60 + Math.abs(score) * 5, 95) + "%";
    }

    return {
        decision,
        confidence,
        reason
    };
};

module.exports = {
    analyzeDecision
};