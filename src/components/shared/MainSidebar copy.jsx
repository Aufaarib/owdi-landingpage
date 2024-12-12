import { useState } from 'react';
import Link from 'next/link';

const MainSidebar = ({ openSidebar, setOpenSidebar }) => {
    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div
                className={`bg-gray-800 text-white w-64 p-5 space-y-6 ${openSidebar ? 'block' : 'hidden'} lg:block`}
            >
                <div className="text-center text-xl font-semibold">
                    <h1>Logo</h1>
                </div>

                <nav>
                    <ul className="space-y-4">
                        <li>
                            <Link href={"/dashboard"} className="block px-4 py-2 rounded hover:bg-gray-700">Dashboard</Link>
                        </li>
                        <li>
                            <Link href={"/profile"} className="block px-4 py-2 rounded hover:bg-gray-700">Profile</Link>
                        </li>
                        <li>
                            <Link href={"/settings"} className="block px-4 py-2 rounded hover:bg-gray-700">Settings</Link>
                        </li>
                        <li>
                            <Link href={"/logout"} className="block px-4 py-2 rounded hover:bg-gray-700">Logout</Link>
                        </li>
                    </ul>
                </nav>

                {/* Close Sidebar Button (Mobile) */}
                <button
                    className="lg:hidden p-2 bg-gray-600 text-white mt-4"
                    onClick={() => setOpenSidebar(false)}
                >
                    Close Sidebar
                </button>
            </div>

            {/* Toggle Button (Mobile) */}
            <button
                className="lg:hidden p-2 bg-gray-600 text-white"
                onClick={() => setOpenSidebar(!openSidebar)}
            >
                Toggle Sidebar
            </button>

            {/* Main Content */}
            <div className="flex-1 p-6">
                <h1 className="text-2xl font-semibold">Welcome to the Dashboard!</h1>
                <p className="mt-4">Here is your main content.</p>
            </div>
        </div>
    );
};

export default MainSidebar;
