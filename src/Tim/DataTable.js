import { useState, useMemo, useEffect } from "react";
import { truncate } from "truncate-ethereum-address";
import Spinner from "../Spinner";
import Error from "../Error";

const columns = [
  { label: "", accessor: "checkbox", sortable: false },
  { label: "Name", accessor: "name", sortable: true },
  { label: "Email", accessor: "email", sortable: true },
  { label: "Date", accessor: "timestamp", sortable: true },
  { label: "Transaction ID", accessor: "transactionId", sortable: true },
  {
    label: "Amount (Crypto/USD)",
    accessor: "usdAmountAtTransaction",
    sortable: true
  },
  { label: "Tax Receipt", accessor: "receipt", sortable: false }
];

export default function ({ title, onReload, loading, error, data }) {
  const [sortedData, setSortedData] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  useMemo(() => {
    if (data.length > 0) {
      const sortedData = [...data].sort((a, b) => {
        return (
          a[sortBy]?.toString().localeCompare(b[sortBy]?.toString(), "en", {
            numeric: true
          }) * (sortOrder === "asc" ? 1 : -1)
        );
      });
      setSortedData(sortedData);
    }
  }, [data, sortBy, sortOrder]);

  const handleSort = (sortKey) => {
    if (sortBy === sortKey) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(sortKey);
      setSortOrder("asc");
    }
  };

  // const formatter = new Intl.NumberFormat('en-US', {
  //   style: 'currency',
  //   currency: 'USD',
  // });

  useEffect(() => {
    setSortedData(data);
  }, [data]);

  return (
    <>
      <table className="table-auto w-full text-left rounded-md shadow-xl m-2 bg-white">
        <thead className="bg-gray-100">
          <tr>
            {columns.map(({ label, accessor, sortable }) => {
              const cl = sortable
                ? sortBy === accessor && sortOrder === "asc"
                  ? "🔼"
                  : sortBy === accessor && sortOrder === "desc"
                  ? "🔽"
                  : ""
                : "";
              if (accessor === "checkbox")
                return (
                  <th className="align-middle justify-center h-full p-4">
                    <input type="checkbox" />
                  </th>
                );
              return (
                <th
                  key={accessor}
                  onClick={sortable ? () => handleSort(accessor) : null}
                  className={
                    (sortable ? "cursor-pointer" : "") + " py-4 uppercase"
                  }
                >
                  {`${label} ${cl}`}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {!loading &&
            sortedData.length > 0 &&
            sortedData.map((data) => {
              return (
                <tr key={data.id} className="">
                  {columns.map(({ accessor }) => {
                    switch (accessor) {
                      case "checkbox":
                        return (
                          <td
                            key={accessor}
                            className="align-middle justify-center p-4 border-t"
                          >
                            <input type="checkbox" />
                          </td>
                        );
                      case "usdAmountAtTransaction":
                        const amount = `${Number(data["cryptoAmount"]).toFixed(
                          8
                        )} ${data["cryptoType"]} ($${data[accessor]})`;
                        return (
                          <td key={accessor} className="py-4 border-t">
                            {amount}
                          </td>
                        );
                      case "transactionId":
                        return (
                          <td
                            key={accessor}
                            className="py-4 border-t underline"
                          >
                            {truncate(data[accessor], { nPrefix: 2 })}
                          </td>
                        );
                      case "timestamp":
                        const date = new Date(data[accessor]);
                        const formattedDate = `${date.getMonth()}/${date.getMonth()}/${
                          date.getFullYear() % 100
                        }`;
                        return (
                          <td key={accessor} className="py-4 border-t">
                            {formattedDate}
                          </td>
                        );
                      case "receipt":
                        return (
                          <div className="py-4 border-t align-middle">
                            <a href={data[accessor]}>Preview</a>
                          </div>
                        );
                      default:
                        return (
                          <td key={accessor} className="py-4 border-t">
                            {data[accessor]}
                          </td>
                        );
                    }
                  })}
                </tr>
              );
            })}
        </tbody>
      </table>
      {loading && (
        <div className="flex justify-center w-full">
          <Spinner />
        </div>
      )}
      <Error error={error} />
    </>
  );
}
