import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./pages/About";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return(
    <AuthProvider>
    <BrowserRouter>
      <Navbar />


      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element= {<Home />}/>
        <Route path="/about" element = {<About />}/>
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  ) 
}

export default App;
