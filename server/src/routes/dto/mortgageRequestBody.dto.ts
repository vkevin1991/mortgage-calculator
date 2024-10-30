import { FREQUENCY } from "../../interfaces/frequency.dto";
import { IsNumber, IsNotEmpty, IsIn } from "class-validator";

export class MortgageRequestBody {
  @IsNumber()
  @IsNotEmpty()
  propertyPrice: number;

  @IsNumber()
  @IsNotEmpty()
  downPayment: number;

  @IsNumber()
  @IsNotEmpty()
  years: number;

  @IsNumber()
  @IsNotEmpty()
  annualInterestRate: number;

  @IsNotEmpty()
  @IsIn(["monthly", "bi-weekly", "accelerate-bi-weekly", "yearly"])
  paymentSchedule: FREQUENCY;
}
