"use client";
import { useEffect, useState } from "react";
import { BottomNav, StatusBadge } from "@/components/bottom-nav";

export default function Dashboard(){
  const [data,setData]=useState<any>();
  useEffect(()=>{const f=()=>fetch('/api/patient').then(r=>r.json()).then(setData);f();const t=setInterval(f,5000);return()=>clearInterval(t)},[]);
  if(!data) return <main className="p-6">Loading...</main>;
  const p=data.patient;
  return <main className="mx-auto max-w-md p-4 pb-24"><div className="card"><h2 className="text-xl font-semibold">{p.name}</h2><p className="text-white/70">Room {p.room} · Bed {p.bed}</p><div className="mt-3"><StatusBadge status={p.status}/></div></div><div className="mt-3 grid grid-cols-2 gap-3">{[['Heart Rate',p.heart_rate+' bpm'],['SpO2',p.spo2+'%'],['BP',p.bp],['Temp',p.temp+'°F']].map(v=><div key={v[0]} className="card"><p className="text-white/70">{v[0]}</p><p className="text-xl font-semibold">{v[1]}</p></div>)}</div><div className="card mt-3"><p className="text-white/70">AI Summary</p><p className="mt-1">Patient is {p.status.toLowerCase()}. No immediate concern.</p><p className="mt-2 text-xs text-white/50">Updated 5 sec ago</p></div><BottomNav/></main>
}
