import { AmortizationData } from "../../interfaces/AmortizationData.interface";

export interface FormMortgageProps {
  onCalculate: (
    monthlyPayment: number,
    data: AmortizationData[],
    totalInterest: number,
    totalPayments: number
  ) => void;
}

export interface ErrorsProps {
  [key: string]: string;
}

export interface TouchedProps {
  [key: string]: boolean;
}

export interface MortgageInputFields {
  propertyPrice: string;
  downPayment: string;
  annualInterestRate: string;
  years: string;
  paymentSchedule: string;
}
