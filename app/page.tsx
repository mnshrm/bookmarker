export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 p-8 space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
            Bookmarker
          </h1>
          <p className="text-lg text-slate-600">
            Save and organize your favorite links securely in the cloud
          </p>
        </div>

        <div className="space-y-3">
          <a
            href="/login"
            className="block w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 text-center shadow-md hover:shadow-lg"
          >
            Get Started
          </a>
          <p className="text-center text-sm text-slate-500">
            Sign in with your Google account to continue
          </p>
        </div>
      </div>
    </main>
  );
}
