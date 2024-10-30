export type FREQUENCY =
  | "monthly"
  | "bi-weekly"
  | "accelerate-bi-weekly"
  | "yearly";
export const FREQUENCY_MAP: Record<FREQUENCY, number> = {
  monthly: 12,
  "bi-weekly": 24,
  "accelerate-bi-weekly": 26,
  yearly: 1,
};
