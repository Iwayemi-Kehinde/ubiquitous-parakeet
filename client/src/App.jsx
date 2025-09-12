import React from "react"
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from './components/Navbar'
import Home from "./pages/Home";
import About from "./pages/About";
import Deals from "./pages/Deals";
import Shop from "./pages/Shop";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/about"} element={<About />} />
        <Route path={"/deals"} element={<Deals />} />
        <Route path={"/shop"} element={<Shop />} />
        <Route path={"/sign-up"} element={<Signup />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/profile"} element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
      </Routes>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  )
}

export default App
