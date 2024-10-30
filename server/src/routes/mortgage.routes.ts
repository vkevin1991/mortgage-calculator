import { Router, Request, Response } from "express";
import mortgageService from "../services/mortgage.service";
import { FREQUENCY_MAP } from "../interfaces/frequency.dto";
import { validateDto } from "../middlewares/validation.middleware";
import { ErrorResponse } from "../middlewares/validation.dto";
import { MortgageRequestBody } from "./dto/mortgageRequestBody.dto";
import { RemainingBalanceBody } from "./dto/remainingBalanceRequestBody.dto";
import { AmortizationScheduleResponse } from "./dto/amortizationScheduleResponse.dto";

const router = Router();

router.post("/calculate", async (req: Request, res: Response): Promise<any> => {
  const validationData = await validateDto(req, res, MortgageRequestBody);
  if (validationData?.errors) {
    return res.status(400).json({
      ...validationData,
    });
  }
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
  async (req: Request, res: Response): Promise<any> => {
    const validationData = await validateDto(req, res, RemainingBalanceBody);
    if (validationData?.errors) {
      return res.status(400).json({
        ...validationData,
      });
    }
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
  async (
    req: Request,
    res: Response<AmortizationScheduleResponse | ErrorResponse>
  ): Promise<any> => {
    const validationData = await validateDto(req, res, MortgageRequestBody);
    if (validationData?.errors) {
      return res.status(400).json({
        ...validationData,
      });
    }
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
