import { useNavigate } from "react-router";
import { Button } from "../components/ui/Button";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-black to-sky-800 text-white p-6">
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <div className="p-4 rounded-full bg-white bg-opacity-10 animate-pulse">
            <AlertTriangle className="h-16 w-16 text-yellow-400" />
          </div>
        </div>
        <h1 className="text-6xl font-bold tracking-tight">404</h1>
        <p className="text-xl text-gray-200">
          Oops! The page you’re looking for doesn’t exist.
        </p>
        <p className="text-sm text-gray-400">
          It might have been moved or deleted. Or maybe the URL’s drunk. 🍻
        </p>
        <Button
          onClick={() => navigate("/")}
          className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-6 py-3 rounded-xl transition"
        >
          Go Back Home
        </Button>
      </div>
    </div>
  );
}
