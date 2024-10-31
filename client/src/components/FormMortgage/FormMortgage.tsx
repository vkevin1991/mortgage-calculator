import { useState } from "react";
import {
  FormMortgageProps,
  ErrorsProps,
  TouchedProps,
  MortgageInputFields,
} from "./FormMortgage.interface";

const API_URL = import.meta.env.VITE_API_URL;
export default function FormMortgage({ onCalculate }: FormMortgageProps) {
  const [inputFields, setInputFields] = useState<MortgageInputFields>({
    propertyPrice: "",
    downPayment: "",
    annualInterestRate: "",
    years: "5",
    paymentSchedule: "monthly",
  });

  const [errors, setErrors] = useState<ErrorsProps>({
    propertyPrice: "",
    downPayment: "",
    annualInterestRate: "",
  });

  const [touched, setTouched] = useState<TouchedProps>({
    propertyPrice: false,
    downPayment: false,
    annualInterestRate: false,
  });

  const validate = (inputValues: MortgageInputFields) => {
    const errors = {
      propertyPrice: "",
      downPayment: "",
      annualInterestRate: "",
    } as ErrorsProps;
    if (!inputValues.propertyPrice) {
      errors.propertyPrice = "Property Price is required";
    }

    if (!inputValues.downPayment) {
      errors.downPayment = "Down payment is required";
    }

    if (!inputValues.annualInterestRate) {
      errors.annualInterestRate = "Annual Interest Rate is required";
    }

    if (inputValues.propertyPrice && Number(inputValues.propertyPrice) === 0) {
      errors.propertyPrice = "Property Price must be greater than 0";
    }

    if (inputValues.downPayment && Number(inputValues.downPayment) === 0) {
      errors.downPayment = "Down Payment must be greater than 0";
    }

    if (
      inputValues.propertyPrice &&
      inputValues.downPayment &&
      Number(inputValues.propertyPrice) < Number(inputValues.downPayment)
    ) {
      errors.propertyPrice = "Property Price must be greater than Down Payment";
      errors.downPayment = "Down Payment must be less than Property Price";
    }
    if (
      inputValues.downPayment &&
      (Number(inputValues.downPayment) / Number(inputValues.propertyPrice)) *
        100 <
        5
    ) {
      errors.downPayment =
        "Down Payment must be at least 5% of the Property Price";
    }

    if (Number(inputValues.annualInterestRate) >= 100) {
      errors.annualInterestRate = "Annual Interest Rate must be less than 100";
    }

    if (
      inputValues.annualInterestRate &&
      Number(inputValues.annualInterestRate) === 0
    ) {
      errors.annualInterestRate = "Annual Interest Rate must be greater than 0";
    }

    return errors;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const listErrors = validate({ ...inputFields });
    if (
      listErrors.propertyPrice ||
      listErrors.downPayment ||
      listErrors.annualInterestRate
    ) {
      setErrors(listErrors);
      return;
    }

    const payload = {
      propertyPrice: Number(inputFields.propertyPrice),
      downPayment: Number(inputFields.downPayment),
      annualInterestRate: Number(inputFields.annualInterestRate),
      years: Number(inputFields.years),
      paymentSchedule: inputFields.paymentSchedule,
    };
    const data = await fetch(`${API_URL}/api/mortgage/calculate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const monthlyPayment = await data.json();
    const amortizationData = await fetch(
      `${API_URL}/api/mortgage/amortization-schedule`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    const tableAmortization = await amortizationData.json();
    onCalculate(
      monthlyPayment.data,
      tableAmortization.details,
      tableAmortization.totalInterest,
      tableAmortization.totalPayments
    );
  };

  return (
    <form
      className="mx-auto mt-16 max-w-xl sm:mt-10"
      onSubmit={onSubmit}
      data-testid="form-mortgage"
    >
      <div className="border-gray-900/10 pb-12">
        <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="sm:col-span-3">
            <label
              htmlFor="property-price"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Property Price
            </label>
            <div className="mt-2">
              <input
                id="property-price"
                name="property-price"
                type="text"
                value={inputFields.propertyPrice}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  setInputFields({
                    ...inputFields,
                    propertyPrice: value,
                  });
                  setTouched({
                    ...touched,
                    propertyPrice: true,
                  });
                  setErrors(validate({ ...inputFields, propertyPrice: value }));
                }}
                onBlur={() => {
                  setTouched({
                    ...touched,
                    propertyPrice: true,
                  });
                  setErrors(validate({ ...inputFields }));
                }}
                className="block w-full rounded-md border-0 pl-3 pr-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              />
            </div>
            {errors.propertyPrice && touched.propertyPrice && (
              <p
                className="flex items-start mt-2 text-xs text-red-600"
                data-testid="property-price-input-error"
              >
                {errors.propertyPrice}
              </p>
            )}
          </div>
          <div className="sm:col-span-3">
            <label
              htmlFor="down-payment"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Down Payment
            </label>
            <div className="mt-2">
              <input
                id="down-payment"
                name="down-payment"
                type="text"
                value={inputFields.downPayment}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  setInputFields({
                    ...inputFields,
                    downPayment: value,
                  });
                  setTouched({
                    ...touched,
                    downPayment: true,
                  });
                  setErrors(validate({ ...inputFields, downPayment: value }));
                }}
                onBlur={() => {
                  setTouched({
                    ...touched,
                    downPayment: true,
                  });
                  setErrors(validate({ ...inputFields }));
                }}
                className="block w-full rounded-md border-0 pl-3 pr-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              />
            </div>
            {errors.downPayment && touched.downPayment && (
              <p
                className="flex items-start mt-2 text-xs text-red-600"
                data-testid="down-payment-input-error"
              >
                {errors.downPayment}
              </p>
            )}
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="annual-interest-rate"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Annual interest Rate
            </label>
            <div className="mt-2">
              <input
                id="annual-interest-rate"
                name="annual-interest-rate"
                type="text"
                value={inputFields.annualInterestRate}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  setInputFields({
                    ...inputFields,
                    annualInterestRate: value,
                  });
                  setTouched({
                    ...touched,
                    annualInterestRate: true,
                  });
                  setErrors(
                    validate({
                      ...inputFields,
                      annualInterestRate: value,
                    })
                  );
                }}
                onBlur={() => {
                  setTouched({
                    ...touched,
                    annualInterestRate: true,
                  });
                  setErrors(validate({ ...inputFields }));
                }}
                className="block w-full rounded-md border-0 pl-3 pr-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              />
            </div>
            {errors.annualInterestRate && touched.annualInterestRate && (
              <p
                className="flex items-start mt-2 text-xs text-red-600"
                data-testid="annual-interest-input-error"
              >
                {errors.annualInterestRate}
              </p>
            )}
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="amortization-period"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Amortization Period
            </label>
            <div className="mt-2">
              <select
                id="amortization-period"
                name="amortization-period"
                value={inputFields.years}
                onChange={(e) =>
                  setInputFields({ ...inputFields, years: e.target.value })
                }
                className="block w-full rounded-md border-0 pl-3 pr-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              >
                <option value={"5"}>5 years</option>
                <option value={"10"}>10 years</option>
                <option value={"15"}>15 years</option>
                <option value={"20"}>20 years</option>
                <option value={"25"}>25 years</option>
                <option value={"30"}>30 years</option>
              </select>
            </div>
          </div>
          <div className="sm:col-span-3">
            <label
              htmlFor="country"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Payment Schedule
            </label>
            <div className="mt-2">
              <select
                id="payment-schedule"
                name="payment-schedule"
                value={inputFields.paymentSchedule}
                onChange={(e) =>
                  setInputFields({
                    ...inputFields,
                    paymentSchedule: e.target.value,
                  })
                }
                className="block w-full rounded-md border-0 pl-3 pr-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              >
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
                <option value="bi-weekly">bi-weekly</option>
                <option value="accelerate-bi-weekly">
                  Accelerate Bi-Weekly
                </option>
              </select>
            </div>
          </div>
          <div className="sm:col-span-3">
            <button
              disabled={
                !Object.values(touched).every((value) => value === true) &&
                Object.keys(errors).length > 0
              }
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Calculate
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
