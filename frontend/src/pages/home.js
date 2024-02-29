import { Button } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import ExpModal from "../components/modal/expForm";
import { getExpenses } from "../functions/get";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../auth/firebase";
import dashboard from "../components/dashboard";
import Dashboard from "../components/dashboard";
export default function Home() {
  const [isExpFormVisible, setIsExpFormVisible] = useState(false);
  const [user, setUser] = useState(false);

  // const showForm = () => {
  //   setisExpFormVisible(true);
  // }
  const openModalexpForm = () => {
    setIsExpFormVisible(!isExpFormVisible);
  };

  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       // setUser(true);
  //     } else {
  //       // setUser(false);
  //     }
  //   });
  // }, []);

  return (
    <>
      <div className="flex justify-center">
        <ExpModal
          opneModal={openModalexpForm}
          isOpen={isExpFormVisible}
        ></ExpModal>
        <Dashboard />
        <Button
          className="mt-10 justify-self-end py-3 px-10"
          variant="gradient"
          onClick={openModalexpForm}
        >
          Add
        </Button>
      </div>
    </>
  );
}
