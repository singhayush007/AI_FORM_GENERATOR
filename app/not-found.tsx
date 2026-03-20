import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileQuestion, Home, ArrowLeft } from "lucide-react";

const PageNotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 dark:from-neutral-950 dark:to-neutral-900 px-4">
      <div className="text-center max-w-md w-full">
        {/* Icon */}
        <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-blue-100 dark:bg-blue-950 mx-auto mb-6">
          <FileQuestion className="w-10 h-10 text-blue-600 dark:text-blue-400" />
        </div>

        {/* Number */}
        <h1 className="text-8xl font-black text-blue-600/20 dark:text-blue-400/20 select-none leading-none mb-2">
          404
        </h1>

        {/* Message */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Page not found
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/">
            <Button className="w-full sm:w-auto gap-2 bg-blue-600 hover:bg-blue-700 text-white cursor-pointer">
              <Home className="w-4 h-4" />
              Go Home
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline" className="w-full sm:w-auto gap-2 cursor-pointer">
              <ArrowLeft className="w-4 h-4" />
              Dashboard
            </Button>
          </Link>
        </div>

        <p className="text-xs text-gray-400 dark:text-gray-600 mt-8">
          Powered by <span className="font-semibold text-blue-500">Formify.ai</span>
        </p>
      </div>
    </div>
  );
};

export default PageNotFound;
