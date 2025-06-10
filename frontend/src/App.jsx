import { Route, Routes } from "react-router-dom";

import Navbar from "./components/navbar";
import Home from "./pages/home";

function App() {
  return (
    <div>
      <Navbar />
      <Home />
    </div>
  );
}

export default App;
