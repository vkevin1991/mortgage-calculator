import { AmortizationData } from "../../interfaces/AmortizationData.interface";

export interface InformationProps {
  payment: number;
  amortizationData: AmortizationData[];
  totalInterest: number;
  totalPayments: number;
}
