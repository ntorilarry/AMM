import React, { useState } from "react";
import "../onboarding/onboarding.css";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { setSessionCookie } from "./session";
import { useNavigate } from "react-router-dom";

function Login() {
  let history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
    setEmail("");
    setPassword("");

    axios({
      method: "post",
      url: "https://sso.nsano.com:82/api/v1/users/realms/6318d262bab661e53bd14883/signin",
      data: JSON.stringify({
        user_id: email,
        password: password,
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
          toast.success("Login Successful");
          history("/dashboard/overview");
        } else {
          toast.error("Invalid Username or Password");
        }
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
        toast.error("Login Failed");
      });
  };

  return (
    <div>
      <div class="bg-white dark:bg-gray-900">
        <div class="flex justify-center h-screen">
          <div class="hidden bg-cover lg:block lg:w-2/3 bg">
            <div class="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
              <div>
                <h2 class="text-4xl font-semibold text-white">
                  Advocacy for Medical Malpractice
                </h2>

                <p class="max-w-xl mt-3 text-gray-300">
                  This application is designed for the Coalition of Patients
                  Against Medical Malpractice and Systemic Failures in Ghana and
                  provides an avenue for their customers to register and make
                  donations.
                </p>
              </div>
            </div>
          </div>
          <div class="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
            <div class="flex-1">
              <div class="text-center">
                <h2 class="text-4xl font-bold text-center text-gray-700 dark:text-white">
                  Login
                </h2>

                <p class="mt-3 text-gray-500 dark:text-gray-300">
                  Sign in to access your account
                </p>
              </div>

              <div class="mt-8">
                <form onSubmit={handleSubmit}>
                  <div>
                    <label
                      for="email"
                      class="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                    >
                      Username
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>

                  <div class="mt-6">
                    <div class="flex justify-between mb-2">
                      <label
                        for="password"
                        class="text-sm text-gray-600 dark:text-gray-200"
                      >
                        Password
                      </label>
                    </div>

                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Your Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>

                  <div class="mt-6">
                    <button class="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                      Sign in
                    </button>
                  </div>
                </form>

                <p class="mt-6 text-sm text-center text-gray-400">
                  <Link
                    to="/forgot-password"
                    class="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
