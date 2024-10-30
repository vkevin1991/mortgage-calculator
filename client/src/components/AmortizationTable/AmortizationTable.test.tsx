import { render, screen } from "@testing-library/react";
import AmortizationTable from "./AmortizationTable";

describe("Amortization Table", () => {
  it("should render", () => {
    render(
      <AmortizationTable
        data={[
          {
            period: 1,
            principal: 1000,
            interest: 100,
            remainingBalance: 900,
          },
          {
            period: 2,
            principal: 1000,
            interest: 100,
            remainingBalance: 800,
          },
          {
            period: 3,
            principal: 1000,
            interest: 100,
            remainingBalance: 700,
          },
          {
            period: 4,
            principal: 1000,
            interest: 100,
            remainingBalance: 600,
          },
          {
            period: 5,
            principal: 1000,
            interest: 100,
            remainingBalance: 500,
          },
          {
            period: 6,
            principal: 1000,
            interest: 100,
            remainingBalance: 400,
          },
          {
            period: 7,
            principal: 1000,
            interest: 100,
            remainingBalance: 300,
          },
          {
            period: 8,
            principal: 1000,
            interest: 100,
            remainingBalance: 200,
          },
          {
            period: 9,
            principal: 1000,
            interest: 100,
            remainingBalance: 100,
          },
          {
            period: 10,
            principal: 1000,
            interest: 100,
            remainingBalance: 0,
          },
        ]}
      />
    );
    const amortizationTable = screen.getByTestId("amortization-table");
    const headers = ["Period", "Principal Paid", "Interest Paid", "Balance"];
    headers.forEach((header) => {
      expect(screen.getByText(header)).toBeInTheDocument();
    });
    expect(screen.getAllByTestId("amortization-table-row").length).toBe(10);
    const periods = screen.getAllByTestId("amortization-table-data-period");
    const principals = screen.getAllByTestId(
      "amortization-table-data-principal"
    );
    expect(periods.length).toBe(10);
    expect(periods[0]).toHaveTextContent("1");
    expect(principals[0]).toHaveTextContent("$ 1,000");
    expect(amortizationTable).toBeInTheDocument();
  });
});
