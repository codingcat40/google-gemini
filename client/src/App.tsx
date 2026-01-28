import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./pages/About";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { AuthProvider } from "./context/AuthContext";
import { LLMProvider } from "./context/SharedContext";

function App() {
  return(
    <AuthProvider>
      <LLMProvider>
          <BrowserRouter>
            <Navbar />


            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/home" element= {<Home />}/>
              <Route path="/about" element = {<About />}/>
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </BrowserRouter>
    </LLMProvider>
    </AuthProvider>
  ) 
}

export default App;
