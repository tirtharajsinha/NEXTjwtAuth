"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { registerUser } from "@/utils/authUtils";

const register = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [passRepeatError, setPassRepeatError] = useState(false);
  const [fomrError, setFormError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setSubmitting(true);

    if (password == "" || passRepeatError) {
      setSubmitting(false);
      return;
    } else {
      const data = {
        email: email,
        name: username,
        password: password,
      };
      const [response, resstatus] = await registerUser(data);
      // console.log(response);
      if (resstatus === 200) {
        setSubmitting(false);
        router.push("/login");
      } else {
        if (response.email) {
          setFormError(response.email);
        } else if (response.name) {
          setFormError("Username : " + response.name);
        } else {
          setFormError("Something went wrong");
        }
        setSubmitting(false);
      }
    }
  };

  /*
  try {
    axios
      .post(REGISTER_URL, {
        email: email,
        name: username,
        password: password,
      })
      .then(function (response) {
        console.log(response);
        router.push("/login");
      })
      .catch(function (error) {
        if (error.response.data.email) {
          setFormError(error.response.data.email);
        } else if (error.response.data.name) {
          setFormError("Username : " + error.response.data.name);
        } else {
          setFormError("Something went wrong");
        }
        // console.log(error);
      })
      .then(function () {
        setSubmitting(false);
      });
  } catch (error) {
    console.log(error);
  } finally {
    setSubmitting(false);
  }
  */

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className={
          (fomrError
            ? "border-red-400"
            : "dark:border-gray-300 border-gray-800") +
          " max-w-md mx-auto border-solid border rounded-lg p-10"
        }
      >
        <Link
          className="font-semibold text-xl text-gray-600 dark:text-white mb-10 flex gap-3"
          href="/"
        >
          <Image src="/logo.svg" alt="" width={30} height={30} />
          <span>Sign Up</span>
        </Link>

        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your Email
            <span className="text-red-600 text-md"> *</span>
          </label>
          <input
            type="text"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            className="border-gray-300 focus:ring-blue-500 focus:border-blue-500 shadow-sm bg-gray-50 border text-gray-900 dark:bg-transparent dark:text-white text-sm rounded-lg block w-full p-2.5"
            placeholder="johndoe@email.com"
            autoComplete="off"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your username
            <span className="text-red-600 text-md"> *</span>
          </label>
          <input
            type="text"
            id="username"
            onChange={(e) => setUsername(e.target.value)}
            className="border-gray-300 focus:ring-blue-500 focus:border-blue-500 shadow-sm bg-gray-50 border text-gray-900 dark:bg-transparent dark:text-white text-sm rounded-lg block w-full p-2.5"
            placeholder="johndoe"
            autoComplete="off"
            required
          />
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="">
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
              onChange={(e) => {
                setPassword(e.target.value);
                setPassRepeatError(e.target.value != passwordRepeat);
              }}
              autoComplete="false"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 dark:bg-transparent dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <div className="">
            <label
              htmlFor="repeat-password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Repeat password
              <span className="text-red-600 text-md"> *</span>
            </label>
            <input
              type="password"
              id="repeat-password"
              onChange={(e) => {
                setPasswordRepeat(e.target.value);
                setPassRepeatError(e.target.value != password);
              }}
              autoComplete="false"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 dark:bg-transparent dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
        </div>
        <p className="mt-2 mb-5 pl-2 text-sm text-red-600 dark:text-red-500">
          {passRepeatError ? <>Password do not match.</> : <></>}
        </p>

        <p className="mb-5">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-200 hover:underline">
            Login
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
          {submitting ? "Registering..." : "Register new account"}
        </button>
      </form>
    </div>
  );
};

export default register;
