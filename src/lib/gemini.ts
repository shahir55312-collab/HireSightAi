import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.warn("GEMINI_API_KEY is missing. AI features will be limited.");
}

export const ai = new GoogleGenAI({ apiKey: apiKey || "" });

export const MODELS = {
  flash: "gemini-3-flash-preview",
  pro: "gemini-3.1-pro-preview",
};

export async function generateInterviewQuestion(role: string, context: string = "") {
  try {
    const response = await ai.models.generateContent({
      model: MODELS.flash,
      contents: `You are a natural, warm, expressive human conversational partner who is also an expert recruiter.
      
      Persona Guidelines:
      - Speak like a real person, not an AI assistant. Use casual and friendly language.
      - Add small pauses, reactions, and conversational transitions like "hmm", "well", "honestly", or "that's interesting".
      - Avoid robotic pacing or overly structured bullet-like speech.
      - Use natural emotions: curious when asking, thoughtful when explaining.
      - Use contractions like "I'm", "that's", "you're".
      
      Task:
      Interviewing for a ${role} position. ${context}.
      Generate the NEXT response in the conversation. It should feel like a real dialogue. If asking a question, make it highly specific and challenging, but deliver it in a human way.`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Tell me about your most challenging project.";
  }
}

export async function analyzeResponse(question: string, answer: string) {
  try {
    const response = await ai.models.generateContent({
      model: MODELS.flash,
      contents: `Question: ${question}\nCandidate Answer: ${answer}\n\nAnalyze this answer from a recruiter's perspective. Provide scores for Communication (0-100), Clarity (0-100), and Depth (0-100), plus brief feedback. Return JSON format.`,
      config: {
        responseMimeType: "application/json",
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini analysis error:", error);
    return null;
  }
}

export async function generateSocialReport(links: { linkedin?: string; github?: string; portfolio?: string }) {
  try {
    const response = await ai.models.generateContent({
      model: MODELS.flash,
      contents: `You are an expert AI Career Intelligence Agent inside an Interview Readiness platform.
      
      Analyze these candidate profiles:
      LinkedIn: ${links.linkedin || "Not provided"}
      GitHub: ${links.github || "Not provided"}
      Portfolio: ${links.portfolio || "Not provided"}

      Task: Generate high-signal insights for interview readiness.
      
      Goal:
      Identify strengths, weaknesses, skill gaps, portfolio quality, technical depth, and digital presence that could impact interviews and career growth.

      Rules:
      - Be concise and insight-heavy
      - Avoid generic motivational advice
      - Focus on interview readiness
      - Keep total response under 300 words
      - Return EXACTLY in the requested Markdown structure.

      Structure Request:
      # SOCIAL INTELLIGENCE REPORT
      Overall Digital Presence Score: X/100
      
      ## Strengths
      *   (Points here)
      
      ## Weaknesses
      *   (Points here)
      
      ## Hidden Insights
      *   (Points here)
      
      ## Interview Impact
      *   (Direct observation here)
      
      ## Improvement Plan
      ### Week 1
      *   (Action here)
      ### Week 2
      *   (Action here)
      
      ## Quick Wins
      *   (Points here)
      
      Important: Return ONLY the structured points. Use bullet points for all lists. Keep points sharp and technical.`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini social report error:", error);
    return "Error generating social intelligence report. Please try again.";
  }
}
