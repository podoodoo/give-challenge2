import Spinner from "../Spinner";

export default function ({ title, onReload, loading, error, data }) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  });
  return (
    <>
      {data && (
        <div className="grid grid-cols-3 gap-2 pt-4">
          <div className="rounded-md shadow m-2 bg-white p-5">
            <p className="text-gray-500 text-lg">Total Amount</p>
            <h2 className="text-3xl font-bold py-2">
              {loading && <Spinner />}
              {!loading && formatter.format(data.totalAmount)}
            </h2>
          </div>
          <div className="rounded-md shadow m-2 bg-white p-5">
            <p className="text-gray-500 text-lg">Number of Donors</p>
            <h2 className="text-3xl font-bold py-2">
              {loading && <Spinner />}
              {!loading && data.numberOfDonors}
            </h2>
          </div>
          <div className="rounded-md shadow m-2 bg-white p-5">
            <p className="text-gray-500 text-lg">Total Donations</p>
            <h2 className="text-3xl font-bold py-2">
              {loading && <Spinner />}
              {!loading && data.totalDonations}
            </h2>
          </div>
        </div>
      )}
    </>
  );
}
