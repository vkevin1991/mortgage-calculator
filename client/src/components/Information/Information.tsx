import { useEffect, useMemo, useState } from "react";
import AmortizationTable from "../AmortizationTable/AmortizationTable";
import Pagination from "../Pagination/Pagination";
import numeral from "numeral";
import { InformationProps } from "./Information.interface";

export default function Information({
  payment,
  amortizationData,
  totalInterest,
  totalPayments,
}: InformationProps) {
  const PAGESIZE = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const amortizationTable = useMemo(() => {
    const firstIndex = (currentPage - 1) * PAGESIZE;
    const lastIndex = firstIndex + PAGESIZE;
    return amortizationData.slice(firstIndex, lastIndex);
  }, [amortizationData, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [amortizationData]);
  const onChangePage = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <div className="mx-auto mt-4 max-w-xl sm:mt-4">
      <div className="px-4 sm:px-0">
        <h3 className="text-xl font-semibold text-gray-900">
          Mortgage Information
        </h3>
        <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">
          Details and information about your mortgage application.
        </p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">
              Period Payment
            </dt>
            <dd className="mt-1 text-base font-bold text-gray-700 sm:col-span-2 sm:mt-0">
              {numeral(payment).format("$ 0,0[.]00")}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">
              Total Payments
            </dt>
            <dd className="mt-1 text-base font-bold text-gray-700 sm:col-span-2 sm:mt-0">
              {numeral(totalPayments).format("$ 0,0[.]00")}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">
              Total Interest
            </dt>
            <dd className="mt-1 text-base font-bold text-gray-700 sm:col-span-2 sm:mt-0">
              {numeral(totalInterest).format("$ 0,0[.]00")}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">
              Amortization Schedule
            </dt>
            <dd className="mt-2 text-sm text-gray-900 sm:col-span-3 sm:mt-0">
              <AmortizationTable data={amortizationTable} />
              <Pagination
                total={amortizationData.length}
                onChange={onChangePage}
                currentPage={currentPage}
              />
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
