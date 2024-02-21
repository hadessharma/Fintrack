import { Button } from "@material-tailwind/react";
import { useState } from "react";
import ExpModal from "../components/modal/expForm";

export default function Home() {
  const [isExpFormVisible, setIsExpFormVisible] = useState(false);

  // const showForm = () => {
  //   setisExpFormVisible(true);
  // }
  const openModalexpForm = () => {
    setIsExpFormVisible(!isExpFormVisible)
  }
  return (
    <div className="flex justify-center">
      <ExpModal opneModal={openModalexpForm} isOpen={isExpFormVisible}></ExpModal>
      <Button className="mt-10 justify-self-end py-3 px-10" variant="gradient" onClick={openModalexpForm}>Add</Button>
    </div>
  );
}
