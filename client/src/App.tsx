import { useState } from "react";
import FormMortgage from "./components/FormMortgage/FormMortgage";
import Information from "./components/Information/Information";
import { AmortizationData } from "./interfaces/AmortizationData.interface";

function App() {
  const [payment, setPayment] = useState(0);
  const [amortizationData, setAmortizationData] = useState<AmortizationData[]>(
    []
  );
  const [totalPayments, setTotalPayments] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const onCalculate = (
    payment: number,
    data: AmortizationData[],
    interest: number,
    payments: number
  ) => {
    setPayment(payment);
    setAmortizationData(data);
    setTotalInterest(interest);
    setTotalPayments(payments);
  };
  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-balance text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
          Mortgage Calculator
        </h2>
        <p className="mt-2 text-lg/8 text-gray-600">
          Calculate your mortgage payments with our easy-to-use calculator.
        </p>
      </div>
      <FormMortgage onCalculate={onCalculate} />
      {payment > 0 && amortizationData.length > 0 && (
        <Information
          payment={payment}
          amortizationData={amortizationData}
          totalInterest={totalInterest}
          totalPayments={totalPayments}
        />
      )}
    </div>
  );
}

export default App;
