import numeral from "numeral";
import { AmortizationTableProps } from "./AmortizationTable.interface";
import { AmortizationData } from "../../interfaces/AmortizationData.interface";
export default function AmortizationTable({ data }: AmortizationTableProps) {
  return (
    <>
      <table
        className="w-full text-left table-auto min-w-max"
        data-testid="amortization-table"
      >
        <thead>
          <tr>
            <th className="p-4 border-b border-blue-gray-100 bg-slate-100">
              <p className="font-semibold text-slate-700">Period</p>
            </th>
            <th className="p-4 border-b border-blue-gray-100 bg-slate-100">
              <p className="font-semibold text-slate-700">Principal Paid</p>
            </th>
            <th className="p-4 border-b border-blue-gray-100 bg-slate-100">
              <p className="font-semibold text-slate-700">Interest Paid</p>
            </th>
            <th className="p-4 border-b border-blue-gray-100 bg-slate-100">
              <p className="font-semibold text-slate-700">Balance</p>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: AmortizationData) => {
            return (
              <tr key={item.period} data-testid={`amortization-table-row`}>
                <td
                  className="p-4 border-b border-blue-gray-50"
                  data-testid={`amortization-table-data-period`}
                >
                  <p className="block text-base font-bold text-slate-800">
                    {item.period}
                  </p>
                </td>
                <td
                  className="p-4 border-b border-blue-gray-50"
                  data-testid={`amortization-table-data-principal`}
                >
                  <p className="block text-base text-slate-800">
                    {numeral(item.principal).format("$ 0,0[.]00")}
                  </p>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <p className="block text-base text-slate-800">
                    {numeral(item.interest).format("$ 0,0[.]00")}
                  </p>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <p className="block text-base text-slate-800">
                    {numeral(item.remainingBalance).format("$ 0,0[.]00")}
                  </p>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
