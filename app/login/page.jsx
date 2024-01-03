"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, logoutUser } from "@/redux/features/auth-slice";
import { authenticateUser, getUser } from "@/utils/authUtils";

const login = () => {
  const authuser = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [fomrError, setFormError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setSubmitting(true);
    const data = {
      email: email,
      password: password,
    };
    const [response, resstatus] = await authenticateUser(data);

    if (resstatus === 200) {
      setSubmitting(false);

      const [user, resstatus] = await getUser();
      // console.log(user, resstatus);

      if (resstatus === 200) {
        dispatch(loginUser(user));
        router.push("/dashboard");
      } else {
        dispatch(logoutUser());
      }
    } else {
      setSubmitting(false);
      setFormError(response.detail);
      dispatch(logoutUser());
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className={
          (fomrError
            ? "border-red-400"
            : "dark:border-gray-300 border-gray-800") +
          " w-full max-w-[500px] mx-5 border-solid border rounded-lg p-10"
        }
      >
        <Link
          className="font-semibold text-xl text-gray-600 dark:text-white mb-10 flex gap-3"
          href="/"
        >
          <Image src="/logo.svg" alt="" width={30} height={30} />
          {authuser.isAuthenticated ? (
            <span>You are already logged in</span>
          ) : (
            <span>Sign In</span>
          )}
        </Link>

        <p></p>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your Email
            <span className="text-red-600 text-md"> *</span>
          </label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            className="border-gray-300 focus:ring-blue-500 focus:border-blue-500 shadow-sm bg-gray-50 border text-gray-900 dark:bg-transparent dark:text-white text-sm rounded-lg block w-full p-2.5"
            placeholder="johndoe@example.com"
            autoComplete="off"
            required
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
            <span className="text-red-600 text-md"> *</span>
          </label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="false"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 dark:bg-transparent dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>

        <p className="mb-5">
          Need an account?{" "}
          <Link href="/register" className="text-blue-200 hover:underline">
            Register
          </Link>
        </p>
        <p className="pl-2 my-3 text-base text-red-600 dark:text-red-500">
          {fomrError ? (
            <>
              <i className="fa-light fa-triangle-exclamation mr-2"></i>{" "}
              {fomrError}
            </>
          ) : (
            ""
          )}
        </p>
        <button
          type="submit"
          className="text-gray-800 font-semibold bg-blue-200 hover:bg-blue-400 focus:ring-4 focus:outline-none focus:ring-blue-300 disabled:opacity-50 rounded-lg text-sm px-5 py-2.5 text-center w-full"
          disabled={submitting}
        >
          {submitting ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default login;
