import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Signup = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const sendRequest = async () =>  {
    axios.post("http://localhost:3000/api/auth/createuser", {
      username,
      email,
      password,
    }).then((res) =>  {
      console.log(res.statusText)
    }).catch((err) =>{
      console.log(err)
    })
  }

  const onHandleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    validate();
    sendRequest();
    
  };

  const validate = () => {
    if(username === "" || email === "" || password === ""){
      alert('All fields are  required');

    }
  }


  return (
    <div
      className="flex pt-14 items-center justify-center z-10 h-screen overflow-y-hidden bg-cover bg-center"
      style={{ backgroundImage: "url('/Logo.png')" }}
    >
      <div className="w-full max-w-md p-8 rounded-2xl shadow-lg bg-black/15 backdrop-blur-sm">
        <h2 className="text-2xl font-semibold text-white mb-6 text-center">
          Sign Up
        </h2>

        <form className="flex flex-col space-y-5">

          <div className="flex flex-col text-left">
            <label htmlFor="email" className="mb-1 text-sm font-medium text-gray-200">
              Email
            </label>

            <input type="email" id="email" value={email} onChange={
              (e) => setEmail(e.target.value)
            } className="w-full px-3 py-2 border rounded-lg bg-white/90 focus:outline-none focus:ring-2" required/>
          </div>


          <div className="flex flex-col text-left">
            <label
              htmlFor="username"
              className="mb-1 text-sm font-medium text-gray-200"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg bg-white/90 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col text-left">
            <label
              htmlFor="password"
              className="mb-1 text-sm font-medium text-gray-200"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-3 py-2 border rounded-lg bg-white/90 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            onClick={onHandleSubmit}
            className="w-full py-2 mt-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Sign In
          </button>
          <p className="text-white font-serif">
            Are You existing User, You can Sign In{" "}
            <span className="text-blue-500 cursor-pointer text-lg" onClick={() => navigate('/')}>Here</span>{" "}
          </p>
        </form>
      </div>
    </div>
  );
};
