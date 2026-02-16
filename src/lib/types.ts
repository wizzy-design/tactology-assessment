export interface User {
  id: string;
  name: string;
  initials: string;
  totalHours: string;
  weeklyHours: string;
  status: "Available" | "On Leave";
  leaveRange?: string;
  indicators: string[];
}

export interface Schedule {
  id: string;
  userId: string;
  userName: string;
  userInitials: string;
  title: string;
  startTime: string;
  endTime: string;
  department: string;
  date: string;
  color: string;
}
