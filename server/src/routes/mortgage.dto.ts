import { FREQUENCY } from "../interfaces/frequency.dto";

export interface MortgageRequestBody {
  propertyPrice: number;
  downPayment: number;
  years: number;
  annualInterestRate: number;
  paymentSchedule: FREQUENCY;
}

export interface RemainingBalanceBody extends MortgageRequestBody {
  period: number;
}

export interface MortgageResponse {
  data: number;
}

export interface RemainingBalanceResponse {
  remainingBalance: number;
  interest: number;
  principal: number;
}

export interface AmortizationScheduleResponse {
  totalPayments: number;
  totalInterest: number;
  details: {
    [key: number]: {
      remainingBalance: number;
      interest: number;
      principal: number;
    };
  }[];
}
