from flask import Flask, request, jsonify, send_from_directory
import os
from flask_cors import CORS

from pdf_parser import extract_text_from_pdf
from text_cleaner import clean_text
from skill_extractor import extract_skills, extract_skills_regex
from matcher import compute_match_score
from classifier import ResumeClassifier

app = Flask(__name__, static_folder=os.path.join(os.path.dirname(__file__), '..', 'static'))
CORS(app)

classifier = ResumeClassifier()

UPLOAD_FOLDER = "Data/Resumes"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/extract-pdf", methods=["POST"])
def extract_pdf():
    resume_file = request.files.get("file")
    if not resume_file:
        return jsonify({"error": "No file provided"}), 400
    
    resume_path = os.path.join(UPLOAD_FOLDER, resume_file.filename)
    resume_file.save(resume_path)
    
    try:
        resume_text = extract_text_from_pdf(resume_path)
        return jsonify({"text": resume_text})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/analyze", methods=["POST"])
def analyze_resume():
    data = request.json
    resume_text = data.get("resume_text", "")
    
    # We will use a mock job description based on targetCompany for TF-IDF since our UI doesn't provide one
    jd_text = "Software Engineer JavaScript React TypeScript Node.js Agile Frontend Backend Fullstack AWS Cloud SQL"
    if "data" in data.get("targetCompany", "").lower():
        jd_text = "Data Scientist Python SQL Machine Learning Pandas Docker Kubernetes AWS Statistics Modeling"

    if not resume_text:
        return jsonify({"error": "Resume text is required"}), 400

    clean_resume = clean_text(resume_text)
    clean_jd = clean_text(jd_text)

    resume_skills = extract_skills(clean_resume) | extract_skills_regex(clean_resume)
    jd_skills = extract_skills(clean_jd) | extract_skills_regex(clean_jd)

    missing_skills = list(jd_skills - resume_skills)
    matched_skills = list(resume_skills & jd_skills)

    match_score = compute_match_score(clean_resume, clean_jd, resume_skills, jd_skills)
    category = classifier.predict(clean_resume)

    return jsonify({
        "overallScore": min(match_score + 10, 100), # Boosting slightly for better UX mapping
        "keywordMatch": len(matched_skills) * 10,
        "keywordDetails": f"Found: {', '.join(matched_skills[:5])}. Missing: {', '.join(missing_skills[:3])}",
        "actionVerbs": 80,
        "actionVerbsDetails": "Classical ML doesn't extract specific verbs. Use OpenAI for verb analysis.",
        "formatting": 100,
        "formattingDetails": f"Classified as {category}.",
        "feedback": [
            f"Classified resume category: {category}",
            f"Matched skills: {', '.join(matched_skills)}",
            f"Missing skills (based on standard JD): {', '.join(missing_skills)}"
        ]
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)