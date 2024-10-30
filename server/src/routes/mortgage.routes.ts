import { Router, Request, Response } from "express";
import {
  AmortizationScheduleResponse,
  MortgageRequestBody,
  MortgageResponse,
  RemainingBalanceBody,
  RemainingBalanceResponse,
} from "./mortgage.dto";
import mortgageService from "../services/mortgage.service";
import { FREQUENCY_MAP } from "../interfaces/frequency.dto";

const router = Router();

router.post("/calculate", (req: Request, res: Response<MortgageResponse>) => {
  const {
    propertyPrice,
    downPayment,
    annualInterestRate,
    years,
    paymentSchedule,
  } = req.body as MortgageRequestBody;

  const principal = propertyPrice - downPayment;
  const monthlyPayment = mortgageService.calculateFrequencyPayment(
    principal,
    years,
    annualInterestRate,
    paymentSchedule
  );
  res.status(200).json({ data: monthlyPayment });
});

router.post(
  "/remaining-balance",
  (req: Request, res: Response<RemainingBalanceResponse>) => {
    const {
      propertyPrice,
      downPayment,
      annualInterestRate,
      years,
      period,
      paymentSchedule,
    } = req.body as RemainingBalanceBody;

    const principal = propertyPrice - downPayment;
    const monthlyPayment = mortgageService.calculateFrequencyPayment(
      principal,
      years,
      annualInterestRate,
      paymentSchedule
    );
    const remainingBalance = mortgageService.calculateRemainingBalance(
      principal,
      years,
      annualInterestRate,
      monthlyPayment,
      period,
      paymentSchedule
    );
    res.status(200).json({
      principal: remainingBalance.principal,
      remainingBalance: remainingBalance.remainingBalance,
      interest: remainingBalance.interest,
    });
  }
);

router.post(
  "/amortization-schedule",
  (req: Request, res: Response<AmortizationScheduleResponse>) => {
    const {
      propertyPrice,
      downPayment,
      annualInterestRate,
      years,
      paymentSchedule,
    } = req.body as MortgageRequestBody;

    const principal = propertyPrice - downPayment;
    const monthlyPayment = mortgageService.calculateFrequencyPayment(
      principal,
      years,
      annualInterestRate,
      paymentSchedule
    );
    let totalPayments = 0;
    let totalInterest = 0;
    const data = [...new Array(years * FREQUENCY_MAP[paymentSchedule])].map(
      (_, index) => {
        const period = index + 1;
        const remainingBalance = mortgageService.calculateRemainingBalance(
          principal,
          years,
          annualInterestRate,
          monthlyPayment,
          period,
          paymentSchedule
        );
        totalPayments += monthlyPayment;
        totalInterest += remainingBalance.interest;
        return {
          period,
          principal: remainingBalance.principal,
          interest: remainingBalance.interest,
          remainingBalance: remainingBalance.remainingBalance,
        };
      }
    );
    res.status(200).json({
      totalPayments: Number(totalPayments.toFixed(2)),
      totalInterest: Number(totalInterest.toFixed(2)),
      details: data,
    });
  }
);

export default router;
