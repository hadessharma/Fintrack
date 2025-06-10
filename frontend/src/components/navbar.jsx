import { useDispatch, useSelector } from "react-redux";
import { logout, login } from "../redux/user/userSlice";

import { Link } from "react-router-dom";
import { singInWithGoogle } from "../auth/firebase";
import { auth } from "../auth/firebase";
import { signOut } from "firebase/auth";
import { login, logout } from "../redux/store";
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
};
