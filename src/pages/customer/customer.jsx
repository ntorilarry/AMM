import React from "react";
import CusPage from "./cusPage";

function Customer() {
  return (
    <div className="p-4">
      <div className="course">
        <h3 className="text-2xl dark:text-white font-semibold my-3">
          Customer
        </h3>
      </div>
      <CusPage/>
    </div>
  );
}

export default Customer;
