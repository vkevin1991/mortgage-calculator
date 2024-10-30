import { MortgageRemainingBalanceDto } from "./mortgage.dto";
import { FREQUENCY, FREQUENCY_MAP } from "../interfaces/frequency.dto";

/**
 * Calculate the monthly payment of a loan based on this formula
 * (P * r * (1 + r)^n) / ((1 + r)^n - 1)
 * @param {number} principal - Value of the Loan
 * @param years - Number of years for the loan
 * @param rate - Annual Interest Rate
 * @param frequency - Payment frequency (monthly, bi-weekly, accelerate-bi-weekly)
 * @returns {number} - Monthly payment amount
 */
const calculateFrequencyPayment = (
  principal: number,
  years: number,
  rate: number,
  frequency: FREQUENCY = "monthly"
): number => {
  const interestRate = rate / 100 / FREQUENCY_MAP[frequency];
  const numberPayments = years * FREQUENCY_MAP[frequency];
  const compoundInterestRate = Math.pow(1 + interestRate, numberPayments);
  const payment =
    (principal * interestRate * compoundInterestRate) /
    (compoundInterestRate - 1);
  return Number(payment.toFixed(2));
};

/**
 * Calculate the remaining balance of a loan based on this formula
 * P * (1 + r)^n − (1 + r)^k / (1 + r)^n - 1
 * @param {number} principal - Value of the Loan
 * @param rate - Annual Interest Rate
 * @param years - Number of years for the loan
 * @param monthlyPayment - Monthly payment amount
 * @param frequency - Payment frequency (monthly, bi-weekly, accelerate-bi-weekly)
 * @returns {object} - Remaining balance, interest paid, and principal paid
 */
const calculateRemainingBalance = (
  principal: number,
  years: number,
  rate: number,
  monthlyPayment: number,
  period: number = 1,
  frequency: FREQUENCY = "monthly"
): MortgageRemainingBalanceDto => {
  const interestRate = rate / 100 / FREQUENCY_MAP[frequency];
  const numPayments = years * FREQUENCY_MAP[frequency];
  const remainingBalance =
    (principal *
      (Math.pow(1 + interestRate, numPayments) -
        Math.pow(1 + interestRate, period))) /
    (Math.pow(1 + interestRate, numPayments) - 1);

  const interestPaid = remainingBalance * interestRate;
  const principalPaid = monthlyPayment - interestPaid;

  return {
    remainingBalance: Number(remainingBalance.toFixed(2)),
    interest: Number(interestPaid.toFixed(2)),
    principal: Number(principalPaid.toFixed(2)),
  };
};

export default {
  calculateFrequencyPayment,
  calculateRemainingBalance,
};
