import React from "react";
import TransPage from "./transPage";

function Transactions() {
  return (
    <div>
      <div className="pl-4 pt-4">
        <h3 className="text-2xl dark:text-white font-semibold my-3">
          Transactions
        </h3>
      </div>

      <TransPage />
    </div>
  );
}

export default Transactions;
