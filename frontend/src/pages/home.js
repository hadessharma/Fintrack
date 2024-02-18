import { Button } from "@material-tailwind/react";
import ExpForm from "../components/modal/expForm";
import { useState } from "react";
import ExpModal from "../components/modal/expForm";

export default function Home() {
  const [isExpFormVisible, setisExpFormVisible] = useState(false);

  // const showForm = () => {
  //   setisExpFormVisible(true);
  // }
  const openModalexpForm = () => {
    setisExpFormVisible(!isExpFormVisible)
  }
  return (
    <div className="flex justify-center">
      <ExpModal opneModal={openModalexpForm} isOpen={isExpFormVisible}></ExpModal>
      <Button className="mt-10 justify-self-end py-3 px-10" variant="gradient" onClick={openModalexpForm}>Add</Button>
    </div>
  );
}
