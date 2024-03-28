import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { auth, db, logout } from "../../auth/firebase";
import { signInWithGoogle } from "../../auth/google";
import { useAuthState } from "react-firebase-hooks/auth";
import { Button, Dialog, Input } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { logIn, logOut } from "../../store/functions/userReducer";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const userLoggedIn = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    if (loading) {
      //trigger a loading screen or component
      return;
    }
    if (user) {
      return;
    }
  }, [user, loading]);

  const handleLogin = async () => {
    const userData = await signInWithGoogle();
    // console.log(userData);
    dispatch(
      logIn({ username: userData.displayName, useremail: userData.email })
    );
  };

  const handleLogout = () => {
    logout();
    dispatch(logOut());
  };

  return (
    <>
      <div className="Login flex">
        <div className="Login__container">
          {!user ? (
            <Button className="login__btn login__google" onClick={handleLogin}>
              Log In
            </Button>
          ) : (
            <Button className="login__btn login__google" onClick={handleLogout}>
              <span>Log Out</span>
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
