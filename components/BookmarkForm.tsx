"use client";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

const validateUrl = (input: string) => {
  try {
    const parsed = new URL(input);
    return ["http:", "https:"].includes(parsed.protocol);
  } catch {
    return false;
  }
};

export default function BookmarkForm() {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // Added error state
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateUrl(url)) {
      setError("Please enter a valid web address.");
      return;
    }

    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error("You must be logged in.");

      const { error: insertError } = await supabase.from("bookmarks").insert([
        {
          title,
          url,
          user_id: user.id,
        },
      ]);

      if (insertError) throw insertError;

      setTitle("");
      setUrl("");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else if (typeof err === "string") {
        setError(err);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md border border-slate-200 space-y-4 hover:shadow-lg transition-shadow"
    >
      <div className="space-y-2 mb-4">
        <label className="block text-sm font-semibold text-slate-700">
          Add a New Bookmark
        </label>
        <p className="text-xs text-slate-500">
          Save your favorite links and organize them
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-600">
            Title
          </label>
          <input
            type="text"
            placeholder="e.g. Documents"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder-slate-400 text-slate-900"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-600">
            URL
          </label>
          <input
            type="text"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              if (error) setError(null);
            }}
            required
            className={`w-full px-4 py-2.5 rounded-lg border bg-slate-50 focus:bg-white focus:ring-2 outline-none transition-all placeholder-slate-400 text-slate-900 ${
              error
                ? "border-red-500 focus:ring-red-500"
                : "border-slate-300 focus:ring-blue-500"
            }`}
          />
        </div>
      </div>

      {error && (
        <div className="p-3 rounded-md bg-red-50 border border-red-200 flex items-center gap-2">
          <svg
            className="w-4 h-4 text-red-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-sm text-red-700 font-medium">{error}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-semibold py-2.5 rounded-lg transition-all duration-200 disabled:cursor-not-allowed shadow-md hover:shadow-lg active:scale-95"
      >
        {loading ? (
          <span className="inline-flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            Adding...
          </span>
        ) : (
          "+ Add Bookmark"
        )}
      </button>
    </form>
  );
}
