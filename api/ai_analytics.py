# AI Analytics Module for OmbudsLink
# Simple keyword-based categorization and sentiment analysis

CATEGORY_KEYWORDS = {
    "corruption": ["bribe", "corrupt", "kickback", "fraud", "embezzle", "money", "pay", "payment", "illegal"],
    "delays": ["slow", "delay", "wait", "long", "month", "week", "pending", "stuck", "process"],
    "fees": ["fee", "cost", "expensive", "charge", "overcharge", "price", "money", "pay"],
    "rudeness": ["rude", "disrespect", "insult", "angry", "shout", "threaten", "attitude"],
    "negligence": ["neglect", "ignore", "unresponsive", "lazy", "careless", "mistake", "error"],
    "service_quality": ["quality", "service", "poor", "bad", "terrible", "unsatisfactory"],
    "medical": ["doctor", "hospital", "medicine", "health", "treatment", "patient", "clinic"],
    "education": ["teacher", "school", "student", "class", "exam", "education"],
    "infrastructure": ["road", "water", "electricity", "power", "infrastructure", "facility"]
}

URGENCY_KEYWORDS = {
    "critical": ["emergency", "urgent", "critical", "immediate", "danger", "life", "death", "die", "dying"],
    "high": ["hospital", "medical", "serious", "threat", "violence", "assault", "injury"],
    "medium": ["delay", "weeks", "months", "waiting", "stuck"],
    "low": ["request", "suggestion", "inquiry", "question"]
}

SENTIMENT_KEYWORDS = {
    "negative": ["angry", "frustrated", "terrible", "horrible", "worst", "disgusted", "disappointed", "sad"],
    "positive": ["happy", "satisfied", "good", "great", "excellent", "thank"],
    "neutral": ["report", "file", "complaint", "issue", "problem"]
}


def analyze_complaint(details: str, ministry: str = ""):
    """
    Analyze complaint text and return AI insights
    Returns: dict with category, urgency_score, sentiment
    """
    details_lower = details.lower()
    
    # 1. Category Detection
    category = detect_category(details_lower, ministry)
    
    # 2. Urgency Scoring (1-10)
    urgency_score = calculate_urgency(details_lower)
    
    # 3. Sentiment Analysis
    sentiment = detect_sentiment(details_lower)
    
    return {
        "ai_category": category,
        "urgency_score": urgency_score,
        "sentiment": sentiment
    }


def detect_category(text: str, ministry: str) -> str:
    """Detect complaint category using keyword matching"""
    scores = {}
    
    for category, keywords in CATEGORY_KEYWORDS.items():
        score = sum(1 for keyword in keywords if keyword in text)
        scores[category] = score
    
    # Get category with highest score
    if max(scores.values()) > 0:
        return max(scores, key=scores.get)
    
    # Fallback to ministry-based categorization
    ministry_lower = ministry.lower()
    if "health" in ministry_lower:
        return "medical"
    elif "education" in ministry_lower:
        return "education"
    else:
        return "general"


def calculate_urgency(text: str) -> int:
    """Calculate urgency score from 1-10"""
    # Check for critical keywords
    for keyword in URGENCY_KEYWORDS["critical"]:
        if keyword in text:
            return 10  # Maximum urgency
    
    # Check for high urgency
    high_count = sum(1 for keyword in URGENCY_KEYWORDS["high"] if keyword in text)
    if high_count >= 2:
        return 8
    elif high_count == 1:
        return 7
    
    # Check for medium urgency
    medium_count = sum(1 for keyword in URGENCY_KEYWORDS["medium"] if keyword in text)
    if medium_count >= 2:
        return 6
    elif medium_count == 1:
        return 5
    
    # Check for low urgency indicators
    low_count = sum(1 for keyword in URGENCY_KEYWORDS["low"] if keyword in text)
    if low_count > 0:
        return 3
    
    # Default medium urgency
    return 5


def detect_sentiment(text: str) -> str:
    """Detect sentiment: positive, negative, or neutral"""
    negative_score = sum(1 for keyword in SENTIMENT_KEYWORDS["negative"] if keyword in text)
    positive_score = sum(1 for keyword in SENTIMENT_KEYWORDS["positive"] if keyword in text)
    
    if negative_score > positive_score and negative_score > 0:
        return "negative"
    elif positive_score > negative_score and positive_score > 0:
        return "positive"
    else:
        return "neutral"


# Test function (optional)
if __name__ == "__main__":
    # Test cases
    test_complaints = [
        {
            "details": "The doctor at the hospital was very rude and refused to treat my emergency case. This is urgent!",
            "ministry": "Health",
            "expected": {"category": "rudeness", "urgency": 8-10, "sentiment": "negative"}
        },
        {
            "details": "Road construction has been delayed for 6 months. We are still waiting.",
            "ministry": "Infrastructure",
            "expected": {"category": "delays", "urgency": 5-6, "sentiment": "neutral/negative"}
        },
        {
            "details": "Teacher demanded extra fees for exam. This is corruption.",
            "ministry": "Education",
            "expected": {"category": "corruption", "urgency": 6-7, "sentiment": "negative"}
        }
    ]
    
    for test in test_complaints:
        result = analyze_complaint(test["details"], test["ministry"])
        print(f"\nComplaint: {test['details'][:50]}...")
        print(f"Analysis: {result}")
        print(f"Expected: {test['expected']}")
