import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./pages/About";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { AuthProvider } from "./context/AuthContext";
import { LLMProvider } from "./context/SharedContext";
import { PrivateRoutes } from "./components/PrivateRoutes";

import LandingPage from "./components/LandingPage";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./components/Loading";
import { GuestRoute } from "./components/GuestRoute";

function App() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/auth/me', {withCredentials:true})
        setUser(res.data.user)
      } catch {
        setUser(null)
      }
      finally{
        setLoading(false)
      }
    }
    checkAuth()
  }, [])

  if(loading){
    return <Loading />
  }

  return(
    <AuthProvider>
      <LLMProvider>
          <BrowserRouter>
            <Navbar />


            <Routes>
              <Route path="/" element={<LandingPage />}/>
              
              <Route element={<GuestRoute User={user} />}>
                <Route path="/login" element={<Login setuser={setUser}/>} />
                <Route path="/signup" element={<Signup />} />
              </Route>

              <Route element = {<PrivateRoutes isAuthenticated={!!user}/>}>
                 <Route path="/home" element= {<Home />}/>
              </Route>
              
              <Route path="/about" element = {<About />}/>
              
            </Routes>
          </BrowserRouter>
    </LLMProvider>
    </AuthProvider>
  ) 
}

export default App;
