import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { PageSeo } from "@/components/PageSeo";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#faf7f0] dark:bg-[#121316] text-stone-900 dark:text-stone-100 font-sans p-4">
      <PageSeo
        title="404 - Page Not Found | Pranav Shende"
        description="The requested page could not be found on Pranav Shende's portfolio."
        noindex={true}
      />
      <div className="text-center p-8 rounded-3xl border-2 border-stone-900 dark:border-stone-700 bg-white dark:bg-stone-800 shadow-[4px_4px_0px_#1c1917] max-w-md w-full">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-red-50 dark:bg-red-950/40 border-2 border-[#8b2323] flex items-center justify-center text-3xl font-mono font-bold text-[#8b2323] shadow-[2px_2px_0px_#8b2323]">
          404
        </div>
        <h1 className="mb-2 text-2xl font-bold font-serif">Page Not Found</h1>
        <p className="mb-6 text-sm text-stone-600 dark:text-stone-400">
          The page you are looking for doesn't exist, was renamed, or has moved to a new destination.
        </p>
        <a
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#8b2323] text-white text-xs font-bold border-2 border-stone-900 shadow-[2px_2px_0px_#1c1917] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
        >
          Return to Portfolio Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
