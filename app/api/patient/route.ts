import { NextResponse } from "next/server";
import { db } from "@/lib/mock-db";

export async function GET(){return NextResponse.json({patient:db.patient,alerts:db.alerts,records:db.records});}
