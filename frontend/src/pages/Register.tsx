import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {

    try {

      const res = await fetch("http://localhost:5000/auth/register",{
        method:"POST",
        headers:{ "Content-Type":"application/json"},
        body:JSON.stringify({name,email,password})
      });

      const data = await res.json();

      if(res.ok){
        alert("Account created successfully!");
        navigate("/login");
      }else{
        alert(data.message || "Registration failed");
      }

    }catch(err){
      console.error(err);
      alert("Error registering");
    }

  };

  return (

  <div className="flex items-center justify-center min-h-screen bg-gray-100">

    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">

      <h2 className="text-2xl font-bold text-center mb-6">
        Create an account
      </h2>

      <div className="flex flex-col gap-4">

        <input
        placeholder="Full Name"
        onChange={(e)=>setName(e.target.value)}
        className="border rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
        type="email"
        placeholder="Email"
        onChange={(e)=>setEmail(e.target.value)}
        className="border rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
        type="password"
        placeholder="Password"
        onChange={(e)=>setPassword(e.target.value)}
        className="border rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
        onClick={handleRegister}
        className="bg-green-600 hover:bg-green-700 text-white p-3 rounded font-semibold transition"
        >
        Register
        </button>

        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-medium">
            Login
          </Link>
        </p>

      </div>

    </div>

  </div>

  );

}