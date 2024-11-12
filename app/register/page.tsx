"use client";

import { FormEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { register } from "@/lib/actions/register";

export default function Register() {
  const [error, setError] = useState<string>();
  const router = useRouter();
  const ref = useRef<HTMLFormElement>(null);

  const handleSubmit = async (formData: FormData) => {
    const r = await register({
      email: formData.get("email"),
      password: formData.get("password"),
      name: formData.get("name"),
    });
    ref.current?.reset();
    if (r?.error) {
      setError(r.error);
      return;
    } else {
      return router.push("/login");
    }
  };

  return (
    <section className="w-full h-screen flex items-center justify-center bg-gray-900">
      <form
        ref={ref}
        action={handleSubmit}
        className="p-6 w-full max-w-[400px] flex flex-col justify-between items-center gap-2 
    border border-solid border-gray-700 bg-gray-800 text-white rounded shadow-md transition-colors duration-200"
      >
        {error && <div className="text-red-500">{error}</div>}
        <h1 className="mb-5 w-full text-2xl font-bold text-white">Register</h1>
        <label className="w-full text-sm text-gray-300">Full Name</label>
        <input
          type="text"
          placeholder="Full Name"
          className="w-full h-8 border border-solid border-gray-600 bg-gray-700 rounded p-2 text-white placeholder-gray-400 focus:border-gray-500 focus:outline-none"
          name="name"
        />
        <label className="w-full text-sm text-gray-300">Email</label>
        <input
          type="email"
          placeholder="Email"
          className="w-full h-8 border border-solid border-gray-600 bg-gray-700 rounded p-2 text-white placeholder-gray-400 focus:border-gray-500 focus:outline-none"
          name="email"
        />
        <label className="w-full text-sm text-gray-300">Password</label>
        <div className="flex w-full">
          <input
            type="password"
            placeholder="Password"
            className="w-full h-8 border border-solid border-gray-600 bg-gray-700 rounded p-2 text-white placeholder-gray-400 focus:border-gray-500 focus:outline-none"
            name="password"
          />
        </div>
        <button className="w-full border border-solid border-gray-600 bg-gray-700 rounded py-2 mt-2 text-white hover:bg-gray-600 hover:border-gray-500 transition-colors duration-200">
          Sign up
        </button>

        <Link
          href="/login"
          className="text-sm text-gray-400 transition duration-150 ease hover:text-gray-200"
        >
          Already have an account?
        </Link>
      </form>
    </section>
  );
}
