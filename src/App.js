import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/onboarding/login";
import HomeCmp from "./pages/homeCmp";
import { BrowserRouter as Router } from "react-router-dom";
import Forgetpassword from "./pages/onboarding/forgetpassword";
import { Toaster } from "react-hot-toast";
import ResetPassword from "./pages/onboarding/resetPassword";

function App() {
  return (
    <div>
      <Toaster />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/forgot-password" element={<Forgetpassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/dashboard/*" element={<HomeCmp />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
