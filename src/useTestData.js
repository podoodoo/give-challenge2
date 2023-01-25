import React from "react";
import { getStatistics, getTransactions } from "./data";

export default function useTestData() {
  const [statisticsData, setStatisticsData] = React.useState({});
  const [transactionData, setTransactionData] = React.useState([]);
  const [statisticsError, setStatisticsError] = React.useState(null);
  const [statisticsLoading, setStatisticsLoading] = React.useState(false);
  const [transactionError, setTransactionError] = React.useState(null);
  const [transactionsLoading, setLoadingTransactions] = React.useState(false);

  const getStatisticsData = async () => {
    setStatisticsLoading(true);
    setStatisticsData({});
    setStatisticsError(null);
    try {
      const jsonData = await getStatistics();
      setStatisticsData(jsonData);
    } catch (e) {
      setStatisticsError(e.message);
    }
    setStatisticsLoading(false);
  };

  const getTransactionData = async () => {
    setLoadingTransactions(true);
    setTransactionData({});
    setTransactionError(null);
    try {
      const jsonData = await getTransactions();
      setTransactionData(jsonData);
    } catch (e) {
      setTransactionError(e.message);
    }
    setLoadingTransactions(false);
  };

  function reloadStatistics() {
    getStatisticsData();
  }

  function reloadTransactions() {
    getTransactionData();
  }

  React.useEffect(() => {
    getStatisticsData();
    getTransactionData();
  }, []);

  return {
    statisticsData,
    statisticsLoading,
    statisticsError,
    reloadStatistics,
    transactionData,
    transactionsLoading,
    transactionError,
    reloadTransactions
  };
}
