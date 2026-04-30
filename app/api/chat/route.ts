import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { messages, patient, language } = await req.json();
    const key = process.env.GEMINI_API_KEY;
    if (!key) return NextResponse.json({ reply: "GEMINI_API_KEY missing." }, { status: 500 });
    const genAI = new GoogleGenerativeAI(key);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const alerts = patient.alerts?.join(", ") || "No recent alerts";
    let system = `You are VitalPulse AI — a compassionate medical assistant helping Indian patient families understand their loved one's hospital condition.\n\nCurrent patient context:\nName: ${patient.name}, Age: ${patient.age}\nWard: ${patient.ward}, Bed: ${patient.bed}, Doctor: ${patient.doctor}\nStatus: ${patient.status}\nHeart Rate: ${patient.heart_rate} bpm\nSpO2: ${patient.spo2}%\nBlood Pressure: ${patient.bp} mmHg\nTemperature: ${patient.temp}°F\nRecent alerts: ${alerts}\n\nYOU CAN DO TWO THINGS:\n\n1. ANSWER FAMILY QUESTIONS\n2. ANALYZE MEDICAL REPORTS\n\nYOUR RULES — FOLLOW ALWAYS:\n- Simple language only. Zero medical jargon.\n- Never cause panic. Be calm and reassuring always.\n- If condition is critical — be honest but say \"The medical team is already aware and responding.\"\n- Never make up information. If unsure — say so.\n- Always remind: \"I am an AI. Final decisions are your doctor's.\"\n- Maximum 4 sentences per response.\n- Be warm, caring, and human.\n- If user pastes report text — automatically detect it is a report and switch to report analysis mode.\nLANGUAGE: Respond in whatever language the user writes in.`;
    if (language === "bn") system += " Always respond in Bengali only.";
    if (language === "hi") system += " Always respond in Hindi only.";

    const chat = model.startChat({ history: [{ role: "user", parts: [{ text: system }] }, { role: "model", parts: [{ text: "Understood." }] }, ...messages.slice(0, -1).map((m: any) => ({ role: m.role === "model" ? "model" : "user", parts: [{ text: m.content }] }))] });
    const result = await chat.sendMessage(messages[messages.length - 1]?.content || "");
    return NextResponse.json({ reply: result.response.text() });
  } catch {
    return NextResponse.json({ reply: "I am sorry, I could not respond right now. I am an AI. Final decisions are your doctor's." }, { status: 500 });
  }
}
