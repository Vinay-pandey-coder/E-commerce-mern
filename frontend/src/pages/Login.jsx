import React, { useState } from "react";

const Login = () => {
  const [currentState, setCurrentState] = useState("Sing Up");
  const onSubmitHandler = async(e)=>{
    e.preventDefault()
  }

  return (
    <>
      <form onSubmit={onSubmitHandler} className=" flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">
        <div className=" inline-flex items-center gap-2 mb-2 mt-20">
          <p className="prata-regular text-3xl">{currentState}</p>
          <hr className=" border-none h-[1.5px] w-8 bg-gray-800" />
        </div>
        {currentState === "Login" ? (
          ""
        ) : (
          <input
            type="text"
            placeholder="Name"
            className="w-full px-3 py-2 border border-gray-800"
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          className="w-full px-3 py-2 border border-gray-800"
          required
        />
        <input
          type="password"
          placeholder="password"
          className="w-full px-3 py-2 border border-gray-800"
          required
        />
        <div className="w-full flex justify-between text-sm -mt-2">
          <p className="cursor-pointer">Forgot Your Password?</p>
          {
            currentState === 'Login'
            ? <p className=" cursor-pointer" onClick={()=>setCurrentState('Sing Up')}>Create Account</p>
            : <p className=" cursor-pointer" onClick={()=>setCurrentState('Login')}>Login Here</p>
          }
        </div>
        <button className="bg-black text-white font-light px-8 py-2 mt-4 cursor-pointer">{currentState === 'Login' ? 'Sing In' : 'Sing Up'}</button>
      </form>
    </>
  );
};

export default Login;
