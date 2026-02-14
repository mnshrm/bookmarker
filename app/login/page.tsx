"use client";
import { createClient } from "@/utils/supabase/client";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const error =
    searchParams.has("error") && searchParams.get("error") === "auth-error";
  const supabase = createClient();

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 p-8 space-y-8">
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Bookmarker
          </h1>
          <p className="text-slate-600">
            Securely store your bookmarks in the cloud.
          </p>
        </div>

        {/* Action Section */}
        <div className="space-y-4">
          <button
            onClick={handleLogin}
            className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Sign in with Google
          </button>

          <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
              Secure OAuth 2.0 Authentication
            </span>
          </div>
        </div>

        {error && (
          <span className="text-red-600 text-xs text-center block">
            {"Authentication failed. Please try again."}
          </span>
        )}
        <div className="pt-6 border-t border-slate-100">
          <div className="flex items-center justify-center gap-3 text-xs font-medium text-slate-500">
            <span>Built with Next.js</span>
            <span>•</span>
            <span>Powered by Supabase</span>
          </div>
        </div>
      </div>
    </main>
  );
}
