import { useDispatch, useSelector } from "react-redux";
import { logout, login } from "../redux/user/userSlice";

import { Link } from "react-router-dom";
import { singInWithGoogle } from "../auth/firebase";
import { auth } from "../auth/firebase";
import { signOut } from "firebase/auth";
import { useState } from "react";

const Navbar = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSignIn = async () => {
    setLoading(true);
    setError(null);

    try {
      const user = await singInWithGoogle();
      const idToken = await user.getIdToken();

      dispatch(
        login({
          id: user.uid,
          name: user.displayName || "",
          email: user.email || "",
          token: idToken,
        })
      );
    } catch (error) {
      setError(error || "Sign-in failed!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      dispatch(logout());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="flex justify-start w-full p-4 bg-blue-500">
      <div className="p-2 font-bold">FinTrack</div>
      <div className="">
        <button className="p-2 mx-2 border rounded-xl bg-blue-100 cursor-pointer">
          SignIn
        </button>
        <button className="p-2 mx-2 border rounded-xl bg-blue-100 cursor-pointer">
          SignOut
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
