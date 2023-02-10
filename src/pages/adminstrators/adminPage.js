import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { setSessionCookie } from "../onboarding/session";
import Table, {
  AvatarCell,
  Modal,
  SelectColumnFilter,
  StatusPill,
} from "./adminTable"; // new

function AdminPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: response } = await axios.get(
          "https://sso.nsano.com:82/api/v1/users/realms/6318d262bab661e53bd14883/users",
          {
            headers: {
              "Content-Type": "application/json",
              "X-App-Token": "28f4bf7f-97ee-4664-9be0-6ffd81fb76be"
            },
          }
        );
        console.log(response);
        setData(response);
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: "First Name",
        accessor: "first_name",
      },

      {
        Header: "Other Name",
        accessor: "other_names",
      },
      {
        Header: "E-mail",
        accessor: "email",
      },

      {
        Header: "Role",
        accessor: "username",
        // Filter: SelectColumnFilter, 
        // filter: "includes",
      },
      {
        Header: "Date",
        accessor: "created_at",
      },
      // {
      //   Header: "Status",
      //   accessor: "status",
      //   Cell: StatusPill,
      // },

      // {
      //   Header: "Details",
      //   accessor: "details",
      // },
    ],
    []
  );

  const [showModal, setShowModal] = React.useState(false);

  const [firstname, setFirstname] = useState("");
  const [othername, setOthername] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("6319cb015d9544f3cdbc9695");

  let handleSubmit = async (e) => {
    e.preventDefault();
    console.log(firstname, othername, email, username, role);
    setFirstname("");
    setOthername("");
    setEmail("");
    setUsername("");

    axios({
      method: "post",
      url: "https://sso.nsano.com:82/api/v1/users/realms/6318d262bab661e53bd14883/create",
      data: JSON.stringify({
        first_name: firstname,
        other_names: othername,
        email: email,
        username: username,
        group_id: role,
        password_redirect_url: "http://localhost/registration/completed",
        verify_email_url: "http://localhost/verify/email",
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
          toast.success("Admin Added Successfully");
        } else {
          toast.error("Admin Denied");
        }
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
        toast.error("Login Failed");
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 dark:text-white dark:bg-slate-900">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="">
          <>
            <div className="flex items-center justify-end ">
              <button
                className="px-6 py-3 text-purple-100 bg-[#2563EB] rounded-md"
                type="button"
                onClick={() => setShowModal(true)}
              >
                Add Admin
              </button>
            </div>
            {showModal ? (
              <>
                <div className="fixed inset-0 z-10 overflow-y-auto">
                  <div
                    className="fixed inset-0 w-full h-full bg-black opacity-40"
                    onClick={() => setShowModal(false)}
                  ></div>
                  <div className="flex items-center min-h-screen px-4 py-8 ">
                    <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg dark:bg-gray-900">
                      <div className="my-3 items-center justify-center sm:flex">
                        <div className="mt-2  sm:ml-4 sm:text-left">
                          <h2 className="text-3xl font-medium text-gray-800 dark:text-white">
                            Add Admin
                          </h2>
                          <form onSubmit={handleSubmit}>
                            <div class="grid md:grid-cols-2 md:gap-6">
                              <div class="relative z-0 mb-6 w-full group">
                                <input
                                  type="text"
                                  name="floating_first_name"
                                  id="floating_first_name"
                                  class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                  placeholder=" "
                                  value={firstname}
                                  onChange={(e) => setFirstname(e.target.value)}
                                  required
                                />
                                <label
                                  for="floating_first_name"
                                  class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                  First name
                                </label>
                              </div>
                              <div class="relative z-0 mb-6 w-full group">
                                <input
                                  type="text"
                                  name="floating_last_name"
                                  id="floating_last_name"
                                  class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                  placeholder=" "
                                  value={othername}
                                  onChange={(e) => setOthername(e.target.value)}
                                  required
                                />
                                <label
                                  for="floating_last_name"
                                  class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                  Other name
                                </label>
                              </div>
                            </div>
                            <div class="relative z-0 mb-6 w-full group">
                              <input
                                type="email"
                                name="floating_email"
                                id="floating_email"
                                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                              />
                              <label
                                for="floating_email"
                                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                              >
                                Email address
                              </label>
                            </div>
                            <div class="relative z-0 mb-6 w-full group">
                              <input
                                type="text"
                                name="floating_username"
                                id="floating_username"
                                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                              />
                              <label
                                for="floating_username"
                                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                              >
                                Username
                              </label>
                            </div>
                            <div class="relative z-0 mb-6 w-full group">
                              <select
                                type="text"
                                name="role"
                                id="floating_role"
                                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                required
                              >
                                <option value="6319cb015d9544f3cdbc9695">
                                  Admin
                                </option>
                                <option value="6319cb255d9544f3cdbc9696">
                                  User
                                </option>
                              </select>
                              <label
                                for="floating_repeat_role"
                                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                              >
                                Role
                              </label>
                            </div>
                            <div className="items-center gap-2 mt-3 sm:flex">
                              <button
                                className="w-full mt-2 p-2.5 flex-1 text-white bg-[#2563EB] rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2"
                                // onClick={() => setShowModal(false)}
                              >
                                Add
                              </button>
                              <button
                                className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2 dark:text-white"
                                onClick={() => setShowModal(false)}
                              >
                                Cancel
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : null}
          </>
        </div>
        {loading && <div>Loading</div>}
        {!loading && (
         <div className="mt-6">
          <Table columns={columns} data={data.data} />
        </div> )}
      </main>
    </div>
  );
}

export default AdminPage;
