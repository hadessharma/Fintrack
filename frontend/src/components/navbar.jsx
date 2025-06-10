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
  const user = useSelector((state) => state.user.id);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  console.log(user);
  const handleSignIn = async () => {
    setLoading(true);
    setError(null);

    try {
      const curr_user = await singInWithGoogle();
      const idToken = await curr_user.getIdToken();

      dispatch(
        login({
          id: curr_user.uid,
          name: curr_user.displayName || "",
          email: curr_user.email || "",
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
    <nav className="flex justify-between w-full p-4 bg-blue-500">
      <div className="p-2 font-bold text-2xl text-white">FinTrack</div>
      <div className="">
        {!user && (
          <button
            className="p-2 mx-2 border rounded-xl bg-blue-100 cursor-pointer"
            onClick={handleSignIn}
          >
            SignIn
          </button>
        )}
        {user && (
          <button
            className="p-2 mx-2 border rounded-xl bg-blue-100 cursor-pointer"
            onClick={handleSignOut}
          >
            SignOut
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
