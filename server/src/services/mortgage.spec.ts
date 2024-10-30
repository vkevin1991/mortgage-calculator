import mortgageService from "./mortgage.service";

describe("Mortgage Service", () => {
  const principal = 100000;
  const annualInterestRate = 6;
  const loanTermYears = 15;
  it("should calculate the monthly payment correctly", () => {
    const expectedMonthlyPayment = 843.86;
    const monthlyPayment = mortgageService.calculateFrequencyPayment(
      principal,
      loanTermYears,
      annualInterestRate
    );
    expect(monthlyPayment).toBe(expectedMonthlyPayment);
  });
  it("should calculate the bi-weekly payment correctly", () => {
    const expectedBiWeeklyPayment = 421.6;
    const biWeeklyPayment = mortgageService.calculateFrequencyPayment(
      principal,
      loanTermYears,
      annualInterestRate,
      "bi-weekly"
    );
    expect(biWeeklyPayment).toBe(expectedBiWeeklyPayment);
  });
  it("should calculate the accelerate-bi-weekly payment correctly", () => {
    const expectedBiWeeklyPayment = 389.15;
    const biWeeklyPayment = mortgageService.calculateFrequencyPayment(
      principal,
      loanTermYears,
      annualInterestRate,
      "accelerate-bi-weekly"
    );
    expect(biWeeklyPayment).toBe(expectedBiWeeklyPayment);
  });

  it("should calculate remaining balance for month 3 using monthly frequency", () => {
    const remainingBalance = mortgageService.calculateRemainingBalance(
      principal,
      loanTermYears,
      annualInterestRate,
      843.86,
      3
    );
    expect(remainingBalance).toMatchObject({
      remainingBalance: 98963.26,
      interest: 494.82,
      principal: 349.04,
    });
  });
});
