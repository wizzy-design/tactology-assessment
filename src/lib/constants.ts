export const DEPARTMENTS = [
  "Behandelingkamer1",
  "Management",
  "Bijzonderheden-Verlof-Cursus",
  "Financien",
];

// Generates 30-minute intervals from 08:00 to 23:00
export const TIME_SLOTS = Array.from({ length: 31 }, (_, i) => {
  const hours = Math.floor(i / 2) + 8;
  const minutes = (i % 2) * 30;
  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
});
