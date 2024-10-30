import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response } from "express";
import { ErrorResponse } from "./validation.dto";

export const validateDto = async (
  req: Request,
  res: Response,
  type: any
): Promise<ErrorResponse | undefined> => {
  const dto = plainToInstance(type, req.body);
  const errors = await validate(dto);

  if (errors.length > 0) {
    return {
      message: "Validation failed",
      errors: errors.map((err) => ({
        property: err.property,
        constraints: err.constraints,
      })),
    };
  }

  return;
};
