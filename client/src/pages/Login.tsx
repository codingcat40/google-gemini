import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate()


  const sendRequest = async () =>  {
    await axios.post("http://localhost:3000/api/auth/login", {username,password}, {withCredentials: true})
    console.log('Logged In Successfully')
    navigate('/home')
  }

  const validate = () => {
    if(username === "" || password === ""){
      alert('Empty Fields not allowed.')
      // I will use a library instead alerts
    }
  }

  const onHandleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    validate()
    sendRequest()
  };

  return (
    <div
  className="flex pt-14 items-center justify-center z-10 h-screen overflow-y-hidden bg-cover bg-center"
  style={{ backgroundImage: "url('/Logo.png')" }}
>
  <div className="w-full max-w-md p-8 rounded-2xl shadow-lg bg-black/15 backdrop-blur-sm">
    <h2 className="text-2xl font-semibold text-white mb-6 text-center">
      Login
    </h2>

    <form className="flex flex-col space-y-5">
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
      <p className="text-white font-serif">Are You a New User, You can Sign Up <span onClick={() => navigate('/signup')} className="text-blue-500 cursor-pointer text-lg">Here</span> </p>

    </form>

  </div>
</div>

  );
};
