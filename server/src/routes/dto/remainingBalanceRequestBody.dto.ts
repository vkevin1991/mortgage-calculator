import { IsNotEmpty, IsNumber } from "class-validator";
import { MortgageRequestBody } from "./mortgageRequestBody.dto";

export class RemainingBalanceBody extends MortgageRequestBody {
  @IsNumber()
  @IsNotEmpty()
  period: number;
}
