import Link from "next/link";

export default function Home() {
  return <main className="mx-auto max-w-5xl p-6 pb-24"><section className="py-14 text-center"><h1 className="text-4xl font-bold">VitalPulse</h1><p className="mt-4 text-white/80">Real-time care visibility for patient families.</p><Link href="/login" className="mt-7 inline-block rounded-xl bg-teal px-5 py-3 font-semibold text-navy">Start Demo</Link></section><section className="grid gap-4 md:grid-cols-3"><div className="card">Families feel anxious waiting for updates.</div><div className="card">VitalPulse shows clear, calm updates.</div><div className="card">Live status + alerts + records in one place.</div></section><section className="card mt-6"><h2 className="text-xl font-semibold">How it works</h2><ol className="mt-2 list-decimal space-y-1 pl-5 text-white/80"><li>Login with patient ID.</li><li>Track status and vitals live.</li><li>Get alerts and ask VitalPulse AI.</li></ol></section></main>;
}
