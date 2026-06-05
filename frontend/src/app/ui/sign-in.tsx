"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-100 px-4">
      <div className="w-full max-w-sm bg-white border border-stone-200 rounded-2xl p-10">

        {/* Logo mark */}
        <div className="w-8 h-8 rounded-lg bg-neutral-900 flex items-center justify-center mb-8">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 2L14 5.5V10.5L8 14L2 10.5V5.5L8 2Z" fill="white" opacity="0.9" />
          </svg>
        </div>

        <h1 className="text-3xl font-serif text-neutral-900 mb-1">Selamat datang</h1>
        <p className="text-sm text-neutral-400 font-light mb-8">Silakan masuk untuk melanjutkan</p>

        {/* Email */}
        <div className="mb-5">
          <label htmlFor="email" className="block text-xs font-medium text-neutral-400 uppercase tracking-widest mb-1.5">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            className="w-full px-3 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-lg text-neutral-900 placeholder:text-neutral-300 focus:outline-none focus:border-neutral-400 focus:ring-2 focus:ring-neutral-100 transition"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-xs font-medium text-neutral-400 uppercase tracking-widest mb-1.5">
            Password
          </label>
          <div className="relative flex items-center">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="w-full px-3 py-2.5 pr-10 text-sm bg-stone-50 border border-stone-200 rounded-lg text-neutral-900 placeholder:text-neutral-300 focus:outline-none focus:border-neutral-400 focus:ring-2 focus:ring-neutral-100 transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 text-neutral-400 hover:text-neutral-600 transition"
              aria-label="Toggle password visibility"
            >
              {showPassword ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              )}
            </button>
          </div>
        </div>

        {/* Forgot password */}
        <div className="flex justify-end mb-6">
          <a href="#" className="text-xs text-neutral-400 hover:text-neutral-600 transition">
            Forgot password?
          </a>
        </div>

        {/* Submit */}
        <button
          type="button"
          onClick={() => router.push("/dashboard")}
          className="w-full py-2.5 text-sm font-medium text-white bg-neutral-900 rounded-lg hover:bg-neutral-700 active:scale-[0.99] transition"
        >
          Sign in
        </button>

        {/* Sign up link */}
        <p className="text-center text-xs text-neutral-400 mt-6">
          Don't have an account?{" "}
          <a href="#" className="text-neutral-900 font-medium border-b border-neutral-300 hover:border-neutral-600 transition">
            Create one
          </a>
        </p>
      </div>
    </div>
  );
}