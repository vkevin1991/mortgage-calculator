import { render, screen } from "@testing-library/react";

import FormMortgage from "./FormMortgage";

describe("Form Mortgage", () => {
  it("should render correctly", () => {
    render(<FormMortgage onCalculate={jest.fn()} />);
    expect(screen.getByTestId("form-mortgage")).toBeInTheDocument();
    const propertyPriceLabel = screen.getByLabelText("Property Price");
    const propertyPriceInput = screen.getByRole("textbox", {
      name: /property price/i,
    });
    const downPaymentLabel = screen.getByLabelText("Down Payment");
    const downPaymentInput = screen.getByRole("textbox", {
      name: /down payment/i,
    });
    const loanTermLabel = screen.getByLabelText("Annual interest Rate");
    const loanTermInput = screen.getByRole("textbox", {
      name: /annual interest rate/i,
    });
    const calculateButton = screen.getByRole("button", {
      name: /calculate/i,
    });
    expect(propertyPriceLabel).toBeInTheDocument();
    expect(propertyPriceInput).toBeInTheDocument();
    expect(downPaymentLabel).toBeInTheDocument();
    expect(downPaymentInput).toBeInTheDocument();
    expect(loanTermLabel).toBeInTheDocument();
    expect(loanTermInput).toBeInTheDocument();
    expect(calculateButton).toBeInTheDocument();
  });
});
