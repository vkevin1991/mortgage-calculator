import { render, screen } from "@testing-library/react";
import App from "../App";

describe("App", () => {
  it("should render the App", () => {
    render(<App />);
    const title = screen.getByText("Mortgage Calculator");
    const subTitle = screen.getByText(
      "Calculate your mortgage payments with our easy-to-use calculator."
    );
    const propertyPriceLabel = screen.getByLabelText("Property Price");
    const propertyPriceInput = screen.getByRole("textbox", {
      name: /property price/i,
    });
    const calculateButton = screen.getByRole("button", {
      name: /calculate/i,
    });
    expect(title).toBeInTheDocument();
    expect(subTitle).toBeInTheDocument();
    expect(propertyPriceLabel).toBeInTheDocument();
    expect(propertyPriceInput).toBeInTheDocument();
    expect(calculateButton).toBeInTheDocument();
  });
});
