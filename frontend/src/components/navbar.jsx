import { useDispatch, useSelector } from "react-redux";
import { logout, login } from "../redux/user/userSlice";

import { Link } from "react-router-dom";
import { singInWithGoogle } from "../auth/firebase";
import { auth } from "../auth/firebase";
import { signOut } from "firebase/auth";
import { login, logout } from "../redux/store";
