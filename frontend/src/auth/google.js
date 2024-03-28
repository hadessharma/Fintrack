import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";

import { auth, db } from "./firebase";

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    // .then((result) => {
    //   // const user = result.user;
    //   return result.user;
    // })
    // .catch((err) => {
    //   console.log("Caught popup error.");
    // });
    const user = res.user;
    return user;

    // const user = res;
    // const q = query(collection(db, "users"), where("uid", "==", user.uid));
    // const docs = await getDocs(q);

    // if (docs.docs.length == 0) {
    //   await addDoc(collection(db, "users"), {
    //     uid: user.uid,
    //     name: user.displayName,
    //     authProvider: "google",
    //     email: user.email,
    //   });
    // }
  } catch (err) {
    console.log(err);
    // alert(err.message);
  }
};

export { signInWithGoogle };
