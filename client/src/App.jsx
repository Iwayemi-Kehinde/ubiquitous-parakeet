import { Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar'
import Home from "./pages/Home";
import About from "./pages/About";
import Deals from "./pages/Deals";
import Shop from "./pages/Shop";

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route element={<Home />} to={"/"}/>
        <Route element={<About />} to={"/about"}/>
        <Route element={<Deals />} to={"/deals"}/>
        <Route element={<Shop />} to={"/shop"}/>
      </Routes>
    </>
  )
}

export default App
