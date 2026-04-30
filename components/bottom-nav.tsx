"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, Bell, FileText, LayoutDashboard, MessageCircle, Shield } from "lucide-react";

const links = [
  ["/dashboard", "Dashboard", LayoutDashboard],
  ["/alerts", "Alerts", Bell],
  ["/records", "Records", FileText],
  ["/chat", "AI Chat", MessageCircle],
  ["/admin", "Admin", Shield]
] as const;

export function BottomNav() {
  const pathname = usePathname();
  return <nav className="fixed bottom-0 left-0 right-0 border-t border-white/10 bg-navy/95 p-2 backdrop-blur"><div className="mx-auto flex max-w-md justify-between">{links.map(([href, label, Icon]) => <Link key={href} href={href} className={`flex flex-col items-center text-xs ${pathname===href?"text-teal":"text-white/70"}`}><Icon size={17}/>{label}</Link>)}</div></nav>;
}

export function StatusBadge({status}:{status:string}){const cls=status==="Stable"?"text-stable":status==="Critical"?"text-critical":"text-warning";return <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 text-xs ${cls} border-current`}><Activity size={12}/>{status}</span>}
