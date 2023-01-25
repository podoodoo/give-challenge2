import React from "react";
import Error from "./Error";
import Spinner from "./Spinner";

export default function ({ title, onReload, loading, error, data }) {
  return (
    <div className="rounded-md shadow-xl m-2 bg-gray-100">
      <h2 className="rounded-t-lg bg-gray-300 border-solid border-gray-500 px-3 py-1 font-semibold flex flex-row justify-between">
        {title}
        <button
          className={
            "bg-white text-gray-600 px-2 text-xs rounded-sm hover:bg-gray-600 hover:text-black border border-solid border-gray-500" +
            (loading ? " cursor-progress opacity-25" : "")
          }
          onClick={() => {
            if (!loading) {
              onReload();
            }
          }}
        >
          Reload
        </button>
      </h2>
      <div className="px-3 py-1">
        {loading && (
          <div className="flex flex-row justify-center">
            <Spinner />
          </div>
        )}
        <Error error={error} />
        {!loading && (
          <React.Fragment>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}
