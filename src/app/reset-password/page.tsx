"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if the user arrived via a password reset token
    supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        // User is now temporarily authenticated to update their password
      }
    });
  }, []);

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;

      alert("Password updated successfully! Redirecting to admin login...");
      router.push("/admin");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      alert(`Error resetting password: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-neutral-950 flex items-center justify-center p-6 text-white">
      <form
        onSubmit={handlePasswordUpdate}
        className="bg-neutral-900 border border-neutral-800 p-8 rounded-2xl w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold text-[#D4AF37]">Set New Password</h1>
        <p className="text-sm text-neutral-400">
          Enter your new admin password below.
        </p>

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-neutral-800 p-3 rounded border border-neutral-700 text-white focus:outline-none focus:border-[#D4AF37]"
          required
          minLength={6}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-[#D4AF37] text-black font-bold rounded-lg hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </main>
  );
}
