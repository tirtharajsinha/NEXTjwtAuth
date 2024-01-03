"use client";
import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";

const dashboard = () => {
  const authuser = useSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (authuser.isLoaded) {
      if (!authuser.isAuthenticated) {
        router.push("/login");
      }
    }
  }, [authuser]);

  return (
    <div className="mt-32 w-full">
      {authuser.isLoaded && authuser.isAuthenticated ? (
        <>
          <h1 className="text-3xl text-center">Dashboard</h1>

          <div className="w-full mt-20 m-auto max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col items-center py-10">
              <Image
                className="mb-3 rounded-full shadow-lg"
                src="/user.jpeg"
                width={100}
                height={100}
                alt=""
              />
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                {authuser.user.name}
              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {authuser.user.email}
              </span>
              <div className="flex mt-4 md:mt-6">
                <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800">
                  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Do Something
                  </span>
                </button>
                <button
                  type="button"
                  className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default dashboard;
