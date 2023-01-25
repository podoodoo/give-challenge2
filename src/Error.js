import React from "react";

export default function ({ error }) {
  return (
    <div>
      {error && (
        <div className="bg-red-400 text-white px-3 py-2 rounded-md my-5">
          {error}
        </div>
      )}
    </div>
  );
}
