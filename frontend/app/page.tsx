
import Topbar from "../components/topbar";
import HomePage from "../components/home";
import "./globals.css";

export default function Home() {
  
  return (
    <div className="flex  h-screen w-full flex-col ">
      <Topbar />
      <div className="flex-grow py-20">
        <HomePage />
      </div>
    </div>
  );
}
