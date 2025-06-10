import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/user/userSlice";
import { singInWithGoogle } from "../auth/firebase";

const Home = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.user.id);

  const handleSignIn = async () => {
    setLoading(true);
    setError(null);

    try {
      const user = await singInWithGoogle();

      const token = await user.getIdToken();

      dispatch(
        login({
          id: user.uid,
          name: user.displayName || "",
          email: user.email || "",
          token,
        })
      );
      console.log("Signed in as:", user);
    } catch (error) {
      console.log(error);
      setError(error.message || "Sign in failed!");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center pt-20">
      {/* TODO: Make the "Lunch Bill" scroll to multiple things like "Cab ride", "Trip cost", etc */}
      <h1 className="p-4">
        Sign In and invite your friends to split the Lunch bill!!
      </h1>

      {!user && (
        <button
          className="p-2 mx-2 border border-2 border-gray-600 rounded-xl bg-blue-500 text-white cursor-pointer"
          onClick={handleSignIn}
        >
          SignIn
        </button>
      )}
    </div>
  );
};

export default Home;
