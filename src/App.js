/**
 *  --- INSTRUCTIONS ---
 *
 * Hello!
 *
 * The objective here is to create a simple
 * dashboard using asynchronous data sources.
 * You have been provided with a rough view
 * for the data you will receive. An image of
 * the UI you will implement is found in the
 * root folder of this project - Mockup.png.
 *
 * All table headers (except tax receipt) should
 * sort the data in the table by that column when
 * clicked, toggling between ascending and descending
 * order.
 *
 * Feel free to add any libraries you may need to this
 * sandbox.
 *
 * The CSS files for TailwindCSS is already
 * included. Please use the conventions described
 * by the TailwindCSS docs to implement this UI.
 * The docs are found here: https://tailwindcss.com/
 *
 * NOTE: the "preview" button can just link to the
 * "receipt" attribute value.
 *
 */

import React from "react";
import DataCard from "./DataCard";

import "./styles.css";
import useTestData from "./useTestData";

import Statistics from "./Tim/Statistics";
import DataTable from "./Tim/DataTable";

export default function App() {
  const {
    statisticsData,
    statisticsLoading,
    statisticsError,
    reloadStatistics,
    transactionData,
    transactionsLoading,
    transactionError,
    reloadTransactions
  } = useTestData();

  return (
    <div id="application" className="bg-gray-200 h-screen">
      <div className="flex justify-center">
        <button
          className={
            "bg-white text-gray-600 px-2 text-xs rounded-sm hover:bg-gray-600 hover:text-black border border-solid border-gray-500" +
            (statisticsLoading ? " cursor-progress opacity-25" : "")
          }
          onClick={() => {
            if (!statisticsLoading) {
              reloadStatistics();
            }
          }}
        >
          Reload Statistics
        </button>
        <button
          className={
            "bg-white text-gray-600 px-2 text-xs rounded-sm hover:bg-gray-600 hover:text-black border border-solid border-gray-500" +
            (transactionsLoading ? " cursor-progress opacity-25" : "")
          }
          onClick={() => {
            if (!transactionsLoading) {
              reloadTransactions();
            }
          }}
        >
          Reload Transactions
        </button>
      </div>
      <Statistics
        title="Statistics"
        onReload={reloadStatistics}
        loading={statisticsLoading}
        error={statisticsError}
        data={statisticsData}
      />
      <DataTable
        title="Transactions"
        onReload={reloadTransactions}
        loading={transactionsLoading}
        error={transactionError}
        data={transactionData}
      />

      <h1 className="text-2xl font-semibold px-2 py-3">Dashboard</h1>
      <DataCard
        title="Statistics"
        onReload={reloadStatistics}
        loading={statisticsLoading}
        error={statisticsError}
        data={statisticsData}
      />
      <DataCard
        title="Transactions"
        onReload={reloadTransactions}
        loading={transactionsLoading}
        error={transactionError}
        data={transactionData}
      />
    </div>
  );
}
