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
  const [tableRow, setTableRow] = useState();
  const TABLE_HEAD = ["Description", "Amount (Rs.)"];
  const TABLE_ROWS = [];

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(true);
        setUserEmail(user.email);
      } else {
        setUser(false);
      }
    });
  }, []);

  // const email = "dr4477@srmist.edu.in";
  const loadDashboard = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/get`, {
        params: { email: userEmail },
      });
      if (res.data.data) {
        // let userData = res.data.data.expenses;
        // userData = Object.keys(userData);
        setUserData(res.data.data.expenses);
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
      loadDashboard();
    }
  }, [user]);

  const hadnleSubmit = async () => {
    loadDashboard();
  };

  return (
    <>
      <div className="flex">
        {user ? (
          <>
            <div>
              <Card>
                <table>
                  <thead>
                    <tr>
                      {TABLE_HEAD.map((head) => (
                        <th key={head}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {head}
                          </Typography>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {tableRow.map(({ desc, amount }, index) => {
                      const isLast = index === TABLE_ROWS.length - 1;
                      const classes = isLast ? "p-4" : "p-4 border-b";
                      return (
                        <tr key={desc}>
                          <td className={classes}>
                            <Typography>{desc}</Typography>
                          </td>
                          <td key={amount} className={classes}>
                            <Typography>{amount}</Typography>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </Card>
            </div>
            <div className="flex flex-column">
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
