import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { setSessionCookie } from "./session";

function Forgetpassword() {
  const [email, setEmail] = useState("");
  let handleSubmit = async (e) => {
    e.preventDefault();

    console.log(email);
    setEmail("");

    axios({
      method: "post",
      url: "https://sso.nsano.com:82/api/v1/users/realms/6318d262bab661e53bd14883/request_reset_token",
      data: JSON.stringify({
        user_id: email,
        password_reset_link:"http://localhost:3000/reset-password"
      }),
      headers: {
        "Content-Type": "application/json",
        "X-App-Token": "28f4bf7f-97ee-4664-9be0-6ffd81fb76be",
      },
    })
    .then((response) => {
      if (response.data.code === "00") {
        setSessionCookie(response);
        toast.success("A confirmation link has been sent to your email address");
      } else {
        toast.error("Invalid Username");
      }
    })
    .catch((err) => {
      console.log("AXIOS ERROR: ", err);
      toast.error("Invalid Username");
    });
  };

  return (
    <div>
      <section class="bg-white dark:bg-gray-900">
        <div class="container flex flex-col items-center justify-center min-h-screen px-6 mx-auto">
          <h1 class="text-3xl font-semibold tracking-wide text-center text-gray-800 capitalize md:text-5xl dark:text-white">
            Forget Password
          </h1>

          <div class="w-full max-w-md mx-auto mt-6">
            <form onSubmit={handleSubmit}>
              <div>
                <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>

              <button class="w-full px-6 py-3 mt-4 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                Submit
              </button>

              <div class="mt-6 text-center">
                <Link
                  to="/"
                  class="text-sm text-blue-500 hover:underline dark:text-blue-400"
                >
                  Back to login
                </Link>
              </div>

              <p class="mt-6 text-gray-500 dark:text-gray-400">
                A link to reset your password will be sent to the email
                associated with this username
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Forgetpassword;
