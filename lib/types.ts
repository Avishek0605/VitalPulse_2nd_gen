export type Patient = {
  id: string;
  name: string;
  age: number;
  ward: string;
  bed: string;
  doctor: string;
  room: string;
  status: "Stable" | "Warning" | "Critical";
  heart_rate: number;
  spo2: number;
  bp: string;
  temp: number;
  updated_at: string;
};

export type Alert = {
  id: string;
  patient_id: string;
  message: string;
  severity: "low" | "medium" | "high";
  timestamp: string;
};

export type RecordItem = {
  id: string;
  patient_id: string;
  title: string;
  file_url: string;
};
