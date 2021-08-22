import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="block bg-white py-8">
      <div className="max-w-screen-xl mx-auto px-4 xl:px-0">
        <div className="flex items-center justify-between">
          <Link href="/">
            <a>
              <div className="flex items-center space-x-2">
                <img className="h-10" src="/images/logo.svg" alt="Logo" />
                <h1 className="text-lg font-normal text-primary">Eco.life</h1>
              </div>
            </a>
          </Link>
          <ul>
            <li>
              <Link href="/how-it-works">
                <a className="text-primary text-md font-semibold">
                  How it works
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
