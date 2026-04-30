import { Alert, Patient, RecordItem } from "./types";

export const db = {
  patient: {
    id: "P-1024",
    name: "Anil Kumar",
    age: 62,
    ward: "Cardiac",
    bed: "B-12",
    doctor: "Dr. Priya Sen",
    room: "401A",
    status: "Stable",
    heart_rate: 79,
    spo2: 97,
    bp: "122/80",
    temp: 98.6,
    updated_at: new Date().toISOString()
  } satisfies Patient,
  alerts: [
    { id: "a1", patient_id: "P-1024", message: "Oxygen briefly dropped to 92%", severity: "medium", timestamp: new Date(Date.now() - 600000).toISOString() },
    { id: "a2", patient_id: "P-1024", message: "Doctor reviewed vitals", severity: "low", timestamp: new Date(Date.now() - 360000).toISOString() },
    { id: "a3", patient_id: "P-1024", message: "Medication schedule updated", severity: "low", timestamp: new Date(Date.now() - 120000).toISOString() }
  ] satisfies Alert[],
  records: [
    { id: "r1", patient_id: "P-1024", title: "Prescription.pdf", file_url: "#" },
    { id: "r2", patient_id: "P-1024", title: "Lab Report.pdf", file_url: "#" },
    { id: "r3", patient_id: "P-1024", title: "Discharge Summary.pdf", file_url: "#" }
  ] satisfies RecordItem[]
};
