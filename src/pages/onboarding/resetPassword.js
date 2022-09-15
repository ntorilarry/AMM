import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { setSessionCookie } from "./session";
import { Link } from "react-router-dom";

function ResetPassword() {
  let history = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  searchParams.get("token");
  const token = searchParams.get("token");
  console.log(token);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  let handleSubmit = async (e) => {
    e.preventDefault();
    console.log(password, confirmPassword);
    setPassword("");
    setConfirmPassword("");

    axios({
      method: "post",
      url: "https://sso.nsano.com:82/api/v1/users/realms/6318d262bab661e53bd14883/set_password/GU3DCY3DHFRWGOBSHEYTINLEGFRDQOBTMFSTOYJVGYYDEZTEGE3A====",
      data: JSON.stringify({
        password: password,
        confirm_password: confirmPassword,
      }),
      headers: {
        "Content-Type": "application/json",
        "X-App-Token": "28f4bf7f-97ee-4664-9be0-6ffd81fb76be",
      },
      validateStatus: () => true,
    })
      .then((response) => {
        if (response.data.code === "00") {
          setSessionCookie(response);
          toast.success("Password Changed");
          history("/");
        } else {
          toast.error("Invalid Password");
        }
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
        toast.error("password error");
      });
  };

  return (
    <div>
      <section class="bg-white dark:bg-gray-900">
        <div class="container flex flex-col items-center justify-center min-h-screen px-6 mx-auto">
          <h1 class="text-3xl font-semibold tracking-wide text-center text-gray-800 capitalize md:text-5xl dark:text-white">
            Reset Password
          </h1>

          <div class="w-full max-w-md mx-auto mt-6">
            <form onSubmit={handleSubmit}>
              <div>
                <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>

              <div>
                <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                  Confirm password
                </label>
                <input
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>

              <button class="w-full px-6 py-3 mt-4 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ResetPassword;
