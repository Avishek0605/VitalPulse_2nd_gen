import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/mock-db";

export async function POST(req:NextRequest){
  const body=await req.json();
  db.patient={...db.patient,...body,updated_at:new Date().toISOString()};
  return NextResponse.json({ok:true,patient:db.patient});
}
