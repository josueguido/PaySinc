import { Moon, Sun } from "lucide-react";
import { useState } from "react";

export default function Header() {
    const [darkMode, setDarkMode] = useState(false);

    return (
        <header
            className={`fixed top-0 w-full z-50 px-6 ${
                darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
            }`}
        >
            <div className="flex items-center justify-between max-w-[1600px] mx-auto py-3">
                <h1 className="text-lg font-bold tracking-wide">PaySinc</h1>

                <section className="hidden md:flex space-x-6">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className="p-2 rounded-full transition-all"
                        >
                            {darkMode ? <Sun size={24} /> : <Moon size={24} />}
                        </button>
                    </div>
                </section>
            </div>
        </header>
    );
}

//   <header className="bg-white shadow px-6 py-4 flex items-center justify-between">
//                 <span className="text-lg font-semibold">PaySinc</span>
//                 <div className="flex items-center space-x-4">
//                     <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
//                         <Settings size={20} />
//                     </button>
//                     <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
//                         <User size={20} />
//                     </button>
//                 </div>
//             </header>