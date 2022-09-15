import React, { useState, useEffect } from "react";
import axios from "axios";
import Table, { SelectColumnFilter, StatusPill } from "../customer/cusPage"; // new

function TransPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: response } = await axios.get(
          "https://93b16ced-3206-4b7e-b353-592c04cacc00.mock.pstmn.io/api/v1/transactions",
          {
            headers: {
              "Content-Type": "application/json",
              "X-Channel": "portal",
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
        Header: "Transaction ID",
        accessor: "id",
      },
      {
        Header: "Customer Name",
        accessor: "customer_name",
      },
      {
        Header: "Phone Number",
        accessor: "phone",
      },
      {
        Header: "Amount",
        accessor: "amount",
      },
      {
        Header: " Network",
        accessor: "mno",
      },
      {
        Header: "Date Created",
        accessor: "created_at",
      },

      {
        Header: "Date Modified",
        accessor: "modified_at",
      },
      // {
      //   Header: "Status",
      //   accessor: "status",
      //   Cell: StatusPill,
      // },

      // {
      //   Header: "Role",
      //   accessor: "role",
      //   Filter: SelectColumnFilter, // new
      //   filter: "includes",
      // },
      // {
      //   Header: "Details",
      //   accessor: "details",
      //   Modal: Modal,
      // },
    ],
    []
  );
  // const data = React.useMemo(() => getData(), []);

  return (
    <div>
      {loading && <div>Loading</div>}
      {!loading && (
        <div className="min-h-screen bg-gray-100 text-gray-900 dark:text-white dark:bg-slate-900">
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
            <div className=""></div>
            <div className="mt-6">
              <Table columns={columns} data={data.data} />
            </div>
          </main>
        </div>
      )}
    </div>
  );
}

export default TransPage;
