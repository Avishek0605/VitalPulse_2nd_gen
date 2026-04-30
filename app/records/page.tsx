"use client";
import { useEffect,useState } from "react";import { BottomNav } from "@/components/bottom-nav";
export default function Records(){const[d,setD]=useState<any>();useEffect(()=>{fetch('/api/patient').then(r=>r.json()).then(setD)},[]);return <main className='mx-auto max-w-md p-4 pb-24'><h1 className='text-xl font-semibold mb-3'>Records</h1>{d?.records?.map((r:any)=><a key={r.id} href={r.file_url} className='card mb-2 block'>{r.title}</a>)}<BottomNav/></main>}
