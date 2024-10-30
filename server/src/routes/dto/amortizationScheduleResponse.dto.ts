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
