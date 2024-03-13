import React, { useEffect, useState } from "react";
import { getExpenses } from "../functions/get";
import { Button, Typography, Card } from "@material-tailwind/react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../auth/firebase";
import axios from "axios";

export default function Dashboard() {
  const [user, setUser] = useState(false);
  const [userEmail, setUserEmail] = useState();
  const [userData, setUserData] = useState();
  const [tableRow, setTableRow] = useState([]);
  const [userName, setUserName] = useState("");
  const TABLE_HEAD = ["Description", "Date", "Amount (Rs.)"];
  let TABLE_ROWS = [];

  // const onAuth = onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     setUser(true);
  //     setUserEmail(user.email);
  //   } else {
  //     setUser(false);
  //     setTableRow([]);
  //   }
  // });

  useEffect(() => {
    // const delay = 3000;
    // const delayId = setTimeout(() => {
    //   onAuth();
    // }, delay);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(true);
        setUserEmail(user.email);
      } else {
        setUser(false);
        setTableRow([]);
      }
    });
  }, []);
  const loadDashboard = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/get`, {
        params: { email: userEmail },
      });
      if (res.data.data) {
        setUserData(res.data.data.expenses);
        TABLE_ROWS = [];
        for (const value of Object.values(userData)) {
          TABLE_ROWS.push(value);
        }
        setTableRow(TABLE_ROWS);
      } else setUserData(null);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      setUserName(auth?.currentUser?.displayName);
      loadDashboard();
    } else setUserName(null);
  }, [user, loadDashboard]);

  const hadnleSubmit = async () => {
    loadDashboard();
  };

  return (
    <>
      <div>
        {user ? (
          <>
            <div className="py-4 flex relative ">
              <div className="flex">
                <Card className="h-full w-full overflow-scroll">
                  <table className="w-full min-w-max table-auto text-left p-4">
                    <thead>
                      <tr>
                        {TABLE_HEAD.map((head) => (
                          <th
                            key={head}
                            className="border-b border-blue-gray-100 bg-blue-gray-50 px-10 py-5 "
                          >
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal leading-none opacity-70"
                              align="center"
                            >
                              {head}
                            </Typography>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {tableRow.map(({ desc, amount, date }, index) => {
                        const isLast = index === TABLE_ROWS.length - 1;
                        const classes = isLast
                          ? "p-4"
                          : "p-4 border-b border-blue-gray-50 px-10 py-5";
                        return (
                          <tr key={desc}>
                            <td className={classes}>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {desc}
                              </Typography>
                            </td>
                            <td
                              key={date}
                              className={`${classes} bg-blue-gray-50/50`}
                            >
                              <Typography variant="small" align="">
                                {date}
                              </Typography>
                            </td>
                            <td key={amount} className={classes}>
                              <Typography variant="small" align="right">
                                {amount}
                              </Typography>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </Card>
              </div>
              <div className="flex flex-column absolute right-0 py-2">
                <Button onClick={hadnleSubmit} className="h-10 py-1 px-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                    />
                  </svg>
                </Button>
              </div>
            </div>
            <div className="flex flex-column">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
              >
                Total expense:
              </Typography>
            </div>
            {/* <div>
              {userData ? (
                <Typography>Data : {Object.keys(userData)}</Typography>
              ) : (
                <Typography>Data : Null</Typography>
              )}
            </div> */}
          </>
        ) : (
          console.log("NO dashboard!")
        )}
      </div>
    </>
  );
}
