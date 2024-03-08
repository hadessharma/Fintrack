import {
  Input,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { auth } from "../../auth/firebase";
import { useState } from "react";
import axios from "axios";

export default function ExpModal({ isOpen, opneModal }) {
  const [desc, setDesc] = useState("");
  const [amount, setAmaount] = useState("");
  const [userEmail, setUserEmail] = useState();
  const [userName, setUserName] = useState();

  const handleSubmit = async () => {
    opneModal();

    setUserEmail(auth.currentUser.email);
    setUserName("testuser");
    // console.log(userName, userEmail, desc, amount);
    await axios.post(`http://localhost:8000/api/post`, {
      username: userName,
      email: userEmail,
      desc: desc,
      amount: amount,
    });
    console.log(auth.currentUser.email);
    setDesc("");
    setAmaount("");
  };

  return (
    <Dialog open={isOpen} handler={opneModal}>
      <DialogHeader>Add Expense</DialogHeader>
      <DialogBody>
        <form className="mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            <Input
              label="Desctiption"
              value={desc}
              placeholder="What was the expense made on?"
              variant="outlined"
              onChange={(e) => setDesc(e.target.value)}
            />
            <Input
              value={amount}
              label="Amount (Rs.)"
              placeholder="Amount spent in Rs"
              variant="outlined"
              onChange={(e) => setAmaount(e.target.value)}
            />
          </div>
        </form>
      </DialogBody>
      <DialogFooter>
        <div className="flex justify-center"></div>
        <Button
          className="justify-self"
          variant="gradient"
          onClick={handleSubmit}
        >
          <span>Add</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
