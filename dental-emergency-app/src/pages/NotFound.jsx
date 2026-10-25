import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <div className="max-w-xl rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-lg">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">Page not found</p>
        <h1 className="mt-3 text-4xl font-black text-slate-900">This emergency guide is unavailable</h1>
        <p className="mt-4 text-slate-600">
          The page you requested does not exist. Please return to the emergency list and choose a relevant case.
        </p>
        <button
          type="button"
          onClick={() => navigate("/")}
          className="mt-8 rounded-full bg-sky-600 px-6 py-3 font-semibold text-white transition hover:bg-sky-700"
        >
          Back home
        </button>
      </div>
    </div>
  );
}

export default NotFound;
