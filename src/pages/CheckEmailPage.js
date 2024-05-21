import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { FaUserCircle } from "react-icons/fa";

const CheckEmailPage = () => {
  const [data, setData] = useState({
    email: "",
  });

  const navigate = useNavigate();
  const handleonChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/email`;
    try {
      const response = await axios.post(URL, data);
      toast.success(response?.data?.message);
      if (response.data.success) {
        setData({
          email: "",
        });
        console.log("HI",response?.data);
        navigate("/password", {
          state:response?.data?.data
        });
      }
      console.log(response);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error);
    }
  };

  return (
    <div className="mt-5">
      <div className="bg-white w-full max-w-md mx-2 rounded overflow-hidden p-4 mx-auto">
        <h3>Welcome to Chat app!</h3>
        <div className="flex justify-center item-center">
          <FaUserCircle className="text-6xl text-gray-800" />
        </div>
        <form className="grid gap-4 mt-5" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label>Email: </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="bg-slate-100 px-2 py-1 focus:outline-primary"
              value={data.email}
              onChange={handleonChange}
              required
            />
          </div>

          <button className="bg-primary text-lg px-4 py-1 hover:bg-secondary rounded mt-2 font-bold text-white leading-relaxed tracking-wide">
            Lets go
          </button>
        </form>
        <p className="my-3 text-center">
          New to Chat App?{" "}
          <Link to={"/register"} className="hover:text-primary font-semibold">
            Signup
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default CheckEmailPage;
