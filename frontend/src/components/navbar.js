import { Navbar, Typography, Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import Login from "./modal/login";
import { useState } from "react";

export default function MainNavbar() {
  const [loginOpen, setLoginOpen] = useState(false);
  const toggleLogin = () => setLoginOpen(!loginOpen);
  const navList = (
    <ul className="mt-2 mb-2 flex flex-col lg:mb-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link to="/">
          <p className="flex item-center font-bold">FINTRACK</p>
        </Link>
      </Typography>
    </ul>
  );

  return (
    <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
      <div className="flex items-center justify-between text-blue-gray-900">
        <div className="mr-4 hidden lg:block">{navList}</div>
        <div>
          {/* <Button
            className="float-right"
            variant="gradient"
            onClick={toggleLogin}
          >
            Log In
          </Button> */}
          {/* {loginOpen ? <Login/> : null} */}
          <Login />
        </div>
      </div>
    </Navbar>
  );
}
