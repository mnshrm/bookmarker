import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import BookmarkList from "@/components/BookmarkList";
import BookmarkForm from "@/components/BookmarkForm";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Initial fetch of bookmarks
  const { data: bookmarks } = await supabase
    .from("bookmarks")
    .select("*")
    .order("inserted_at", { ascending: false });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <header className="flex justify-between items-center bg-white p-6 rounded-lg shadow-md border border-slate-200 hover:shadow-lg transition-shadow">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-slate-900">My Bookmarks</h1>
            <p className="text-sm text-slate-500">
              Organize and access your favorite links
            </p>
          </div>
          <form action="/auth/signout" method="post">
            <button className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
              Sign Out
            </button>
          </form>
        </header>

        <BookmarkForm />

        <BookmarkList initialBookmarks={bookmarks || []} userId={user.id} />
      </div>
    </div>
  );
}
