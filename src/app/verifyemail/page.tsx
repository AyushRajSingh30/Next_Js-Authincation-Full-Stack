"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      const res = await axios.post("/api/user/verifyemail", { token });
      setVerified(true);
      setError(false)
    } catch (err: any) {
      setError(true);
      console.log(err.response.data);
    }
  };

  useEffect(() => {
    setError(false);
    //this is core javascript method to extract value from url

    //window.location is url search parameter in url and split url after = because we no how we set url in mailer after spliting after = all value become array
    
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");

    //extract token from url by using next js we also do by using react js
    /* const router=useRouter();
    const {query}= router;
    const urlTokenTwo =query.token */
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      setError(false);
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Verify Email</h1>
      <h2 className="p-2 bg-orange-500 text-black">
        {token ? `${token}` : "no token"}
      </h2>

      {verified && (
        <div>
          <h2 className="text-2xl">Email Verified</h2>
          <Link href="/login">Login</Link>
        </div>
      )}
      {error && (
        <div>
          <h2 className="text-2xl bg-red-500 text-black">Error</h2>
        </div>
      )}
    </div>
  );
}
