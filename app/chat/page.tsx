"use client";
import { useEffect, useRef, useState } from "react";
import { Bot, Send, Paperclip } from "lucide-react";
import { BottomNav } from "@/components/bottom-nav";

export default function ChatPage() {
  const [msgs, setMsgs] = useState<{ role: "user" | "model"; content: string; time: string }[]>([]);
  const [input, setInput] = useState(""); const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState("en"); const [paste, setPaste] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  useEffect(()=>{box.current?.scrollTo({top:box.current.scrollHeight})},[msgs,loading]);

  const send = async (text: string) => {
    if (!text.trim()) return;
    const next=[...msgs.slice(-9),{role:"user" as const, content:text, time:new Date().toLocaleTimeString()}]; setMsgs(next); setInput(""); setLoading(true);
    const p=await fetch('/api/patient').then(r=>r.json());
    const r=await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:next.map(m=>({role:m.role,content:m.content})),patient:{...p.patient,alerts:p.alerts.map((a:any)=>a.message)},language:lang})}).then(r=>r.json());
    setMsgs(m=>[...m,{role:'model',content:r.reply,time:new Date().toLocaleTimeString()}]); setLoading(false);
  };

  return <main className="mx-auto flex h-screen max-w-md flex-col p-3 pb-24"><div className="mb-2 flex items-center justify-between"><div className="flex items-center gap-2 text-teal"><Bot/> <b>VitalPulse AI</b></div><div className="flex gap-1 text-xs">{[['en','EN'],['bn','বাংলা'],['hi','हिंदी']].map(l=><button key={l[0]} onClick={()=>setLang(l[0])} className={`rounded-full px-2 py-1 border ${lang===l[0]?'bg-teal text-navy border-teal':'border-white/25'}`}>{l[1]}</button>)}</div></div>
  <div ref={box} className="flex-1 space-y-2 overflow-y-auto">{msgs.length===0 && <div className="card text-center"><Bot className="mx-auto text-teal" size={36}/><p className="mt-2 font-semibold">Hello. I am VitalPulse AI.</p><p className="text-sm text-white/70">Ask anything or paste any medical report and I will explain it simply.</p>{["Is everything okay?","What do these vitals mean?","What medicines is patient taking?","Should I be worried?","Explain the latest report"].map(q=><button key={q} onClick={()=>send(q)} className='mt-2 mr-2 rounded-full border border-teal/40 px-3 py-1 text-xs'>{q}</button>)}</div>}{msgs.map((m,i)=><div key={i} className={`card ${m.role==='user'?'ml-12 border-teal/50 bg-teal/20':'mr-12 border-l-4 border-l-teal'}`}><p>{m.content}</p><p className='text-right text-xs text-white/50'>{m.time}</p></div>)}{loading && <div className='card mr-12'>...</div>}</div>
  {paste && <textarea value={input} onChange={e=>setInput(e.target.value)} className='card mt-2 w-full' placeholder='Paste your report text here — I will explain it'/>}
  <div className="mt-2 flex gap-2"><button onClick={()=>setPaste(!paste)} className='rounded border border-white/20 p-3'><Paperclip size={16}/></button><input value={input} onChange={e=>setInput(e.target.value)} placeholder='Ask anything or paste a report...' className='flex-1 rounded border border-white/20 bg-navy p-3'/><button onClick={()=>send(paste?`Please analyze this medical report: ${input}`:input)} className='rounded bg-teal p-3 text-navy'><Send size={16}/></button></div>
  <p className='mt-2 text-center text-[11px] text-white/40'>VitalPulse AI · Powered by Gemini · Code by Avishek Bag</p>
  <BottomNav/></main>;
}
