"use client";
import { useEffect,useState } from "react";import { BottomNav } from "@/components/bottom-nav";
export default function Alerts(){const[d,setD]=useState<any>();useEffect(()=>{fetch('/api/patient').then(r=>r.json()).then(setD)},[]);return <main className='mx-auto max-w-md p-4 pb-24'><h1 className='text-xl font-semibold mb-3'>Alerts Timeline</h1>{d?.alerts?.map((a:any)=><div key={a.id} className='card mb-2'><p>{a.message}</p><p className='text-xs text-white/50'>{new Date(a.timestamp).toLocaleTimeString()}</p></div>)}<BottomNav/></main>}
