import React, { useState, useEffect } from "react";
import {
    HomeIcon,
    ShoppingBagIcon,
    UserIcon,
    UserPlusIcon,
    ChevronDownIcon,
    Bars3Icon,
    XMarkIcon,
} from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";
import "../../styles/public/Navbar.css";

function StickyNavbar() {
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setIsMobileMenuOpen(false);
                setIsMobileDropdownOpen(false);
            } else {
                setIsMenuOpen(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
            <div className="navbar-container">
                {/* --- LEFT MENU (Desktop) --- */}
                <div className="navbar-left hidden md:flex">
                    <a href="#" className="nav-item">
                        <HomeIcon className="icon" /> Home
                    </a>

                    <div className="relative">
                        <p
                            className="nav-item dropdown-btn cursor-pointer"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            Products
                            <ChevronDownIcon
                                className={`icon dropdown-icon ${isMenuOpen ? "open" : ""}`}
                            />
                        </p>

                        <AnimatePresence>
                            {isMenuOpen && (
                                <motion.div
                                    initial={{ scaleY: 0, opacity: 0 }}
                                    animate={{ scaleY: 1, opacity: 1 }}
                                    exit={{ scaleY: 0, opacity: 0 }}
                                    transition={{ duration: 0.25, ease: "easeOut" }}
                                    className="absolute top-full left-0 mt-2 bg-white rounded-md shadow-md origin-top overflow-hidden z-50"
                                >
                                    <p className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
                                        Ofertas
                                    </p>
                                    <p className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
                                        Catálogo
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <a href="#" className="nav-item">
                        <ShoppingBagIcon className="icon" /> Cart
                    </a>
                </div>

                {/* --- LOGO --- */}
                <h1 className="logo">CRUMBLY</h1>

                {/* --- RIGHT MENU (Desktop) --- */}
                <div className="navbar-right hidden md:flex">
                    <button className="btn-login">
                        Log In <UserIcon className="icon-button" />
                    </button>
                    <button className="btn-signup">
                        Sign Up <UserPlusIcon className="icon-button" />
                    </button>
                </div>

                {/* --- BURGER BUTTON (Mobile) --- */}
                <div className="md:hidden flex items-center">
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        {isMobileMenuOpen ? (
                            <XMarkIcon className="w-7 h-7 text-[#331F10]" />
                        ) : (
                            <Bars3Icon className="w-7 h-7 text-[#331F10]" />
                        )}
                    </button>
                </div>
            </div>

            {/* --- MOBILE MENU --- */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="mobile-menu"
                    >
                        <a href="#" className="mobile-item">
                            <HomeIcon className="icon" /> Home
                        </a>

                        <button
                            className="mobile-item flex items-center justify-center gap-2 w-full"
                            onClick={() =>
                                setIsMobileDropdownOpen(!isMobileDropdownOpen)
                            }
                        >
                            <span>Products</span>
                            <ChevronDownIcon
                                className={`icon transition-transform duration-300 ${isMobileDropdownOpen ? "rotate-180" : ""
                                    }`}
                            />
                        </button>

                        <AnimatePresence>
                            {isMobileDropdownOpen && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.25 }}
                                    className="ml-6 mt-2 flex flex-col space-y-2"
                                >
                                    <a href="#" className="mobile-item">
                                        Ofertas
                                    </a>
                                    <a href="#" className="mobile-item">
                                        Catálogo
                                    </a>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <a href="#" className="mobile-item">
                            <ShoppingBagIcon className="icon" /> Cart
                        </a>

                        <hr className="my-2 border-[#A2704D]" />

                        <div id="btn-mobile" className="w-full flex flex-col gap-2">
                            <button className="btn-login w-full">
                                Log In <UserIcon className="icon-button" />
                            </button>
                            <button className="btn-signup w-full">
                                Sign Up <UserPlusIcon className="icon-button" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

export default StickyNavbar;
