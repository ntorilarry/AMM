import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "../component/navbar/navbar";
import Sidebar from "../component/navbar/sidebar";

import { Routes, BrowserRouter, Route, Navigate } from "react-router-dom";
import Customer from "./customer/customer";
import Message from "../pages/message/message";
import Overview from "../pages/overview/overview";
import Transactions from "./transactions/transactions";
import Settings from "../pages/settings/settings";
import Adminstrators from "./adminstrators/adminstrators";

function HomeCmp() {
  const [active, setActive] = useState(false);

  const onClick = () => {
    setActive(!active);
  };

  return (
    <div className="font-inter transition-colors duration-300 ease-out">
      <div className="bg-gray-100 dark:bg-slate-900 h-screen w-full overflow-y-hidden flex">
        {/* sidebar */}
        <div className="side-bar">
          <div
            className={`absolute top-0 left-0 bottom-0 right-0 bg-gray-400/20 dark:bg-gray-900/50 z-[100] ${
              active ? "lg:hidden block" : "hidden"
            }`}
            onClick={onClick}
          ></div>
          <Sidebar sidebarOpen={onClick} active={active} />
        </div>
        {/* main content */}
        <div className="relative overflow-y-scroll overflow-x-hidden grow ">
          <Navbar sidebarOpen={onClick} />
          <Routes>
            <Route path="/overview" element={<Overview />} />
            <Route path="/customer" element={<Customer />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/adminstrators" element={<Adminstrators />} />
            <Route path="/message" element={<Message />} />
            <Route path="/settings/*" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default HomeCmp;
