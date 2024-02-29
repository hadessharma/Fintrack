import React, { useEffect, useState } from "react";
import { getExpenses } from "../functions/get";
import { Typography } from "@material-tailwind/react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../auth/firebase";
import axios from "axios";

export default function Dashboard() {
  const [user, setUser] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(true);
      } else {
        setUser(false);
      }
    });
  }, []);
  const email = "dr4477@srmist.edu.in";
  const loadDashboard = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/get`, {
        params: { email: "dr4477@srmist.edu.in" },
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  if (user) loadDashboard();
  return (
    <>
      <div className="flex">
        {user ? (
          <Typography variant="h2"> Dashboard</Typography>
        ) : (
          console.log("NO dashboard!")
        )}
      </div>
    </>
  );
}
