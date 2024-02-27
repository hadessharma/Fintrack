import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { auth, db , logout} from "../../auth/firebase";
import { signInWithGoogle } from "../../auth/google";
import { useAuthState } from "react-firebase-hooks/auth";
import { Button, Dialog, Input } from "@material-tailwind/react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      //trigger a loading screen or component
      return;
    }
    if (user) {
      console.log(user);
      return;
    }
  }, [user, loading]);

  return (
    <>
      <div className="Login flex">
        <div className="Login__container">
          {/* <Input
            className="login__textBox"
            value={email}
            placeholder="email address"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            className="login__textBox"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          /> */}
          {!user ? (
            <Button
              className="login__btn login__google"
              onClick={signInWithGoogle}
            >
              Log In
            </Button>
          ) : (
            <Button className="login__btn login__google" onClick={logout}>
              <span>Log Out</span>
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
