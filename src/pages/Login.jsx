import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import {toast}  from "react-toastify";
import { ShopContext } from "../context/ShopContext.jsx";

const Login = ({}) => {
  const [currentState, setCurrentState] = useState("Sign Up");
  const [name, setName] = useState(""); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")

  const {token, setToken,navigate, backendUrl} = useContext(ShopContext);

    let url = ""
  if(currentState === "Sign Up"){
   url = "/api/user/register"
  } else {
    url = "/api/user/login"
  }

  const handleLoginSignUp = async (e) => {
  e.preventDefault();

  try {
    const payload =
      currentState === "Sign Up"
        ? { name, email, password }
        : { email, password };

    const response = await axios.post(
      `${backendUrl}${url}`,
      payload
    );
    console.log(response.data);

    if (response.data.success) {
      setToken(response.data.token)
      localStorage.setItem('token', response.data.token)
      toast.success(response.data.message);
      setName("");
      setEmail("");
      setPassword("");
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
  }
};

useEffect(()=> {
  if(token) {
    
 navigate("/")
  }
},[token])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLoginSignUp} className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-6">
        
        {/* Heading */}
        <h2 className="text-2xl font-bold text-center text-gray-800">
          {currentState === "Login" ? "Login" : "Create Account"}
        </h2>

        {/* Inputs */}
        <div className="flex flex-col gap-4">
          {currentState === "Sign Up" && (
            <input

              type="text"
              onChange={(e)=> setName(e.target.value)}
              value={name}
              placeholder="Full Name"
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          )}

          <input
            type="email"
            onChange={(e)=> setEmail(e.target.value)}
              value={email}
            placeholder="Email Address"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            required
          />

          <input
            type="password"
            onChange={(e)=> setPassword(e.target.value)}
              value={password}
            placeholder="Password"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
        </div>

        {/* Toggle text */}
        <p className="text-sm text-center text-gray-600">
          {currentState === "Sign Up" ? (
            <>
              Already have an account?{" "}
              <span
                className="text-black font-medium cursor-pointer hover:underline"
                onClick={() => setCurrentState("Login")}
              >
                Login
              </span>
            </>
          ) : (
            <>
              Don’t have an account?{" "}
              <span
                className="text-black font-medium cursor-pointer hover:underline"
                onClick={() => setCurrentState("Sign Up")}
              >
                Sign Up
              </span>
            </>
          )}
        </p>

        {/* Button */}
        <button
          type="submit"
          className="bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-800 transition"
        >
          {currentState === "Login" ? "Login" : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default Login;
