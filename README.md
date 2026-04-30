# VitalPulse MVP

Next.js MVP for family-facing patient monitoring with demo admin controls and Gemini AI chat/report analysis.

## Setup
1. `npm install`
2. Copy `.env.example` to `.env.local` and fill variables.
3. `npm run dev`

## Database (Supabase schema)
Use these tables:
- patients(id, name, room, status, heart_rate, spo2, bp, temp, updated_at)
- alerts(id, patient_id, message, severity, timestamp)
- records(id, patient_id, title, file_url)

Current MVP uses in-memory mock DB in `lib/mock-db.ts` for fast demo.

## Vercel Deployment
1. Push repo to GitHub.
2. Import project in Vercel.
3. Set env vars: `GEMINI_API_KEY`, optional Supabase keys.
4. Deploy.

## Future Upgrades
- Replace mock DB with Supabase realtime subscriptions.
- Add OTP auth and role-based access.
- Persist chat history in DB.
- Add report upload + OCR.
- Add audit logs and HIPAA-grade security controls.
