import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import ErrorPage from "./pages/errorPage";
import MainNavbar from "./components/navbar";

function App() {
  return (
    <>
      <MainNavbar />
      <Routes>
        <Route path="*" element={<ErrorPage />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
