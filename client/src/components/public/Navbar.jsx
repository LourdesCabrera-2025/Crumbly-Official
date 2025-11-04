import React, { useEffect, useState } from "react";
import {
    Navbar,
    Typography,
    Button,
    MenuHandler,
    MenuList,
    MenuItem,
    Menu,
    IconButton,
} from "@material-tailwind/react";
import {
    HomeIcon,
    ShoppingBagIcon,
    UserIcon,
    UserPlusIcon,
    ChevronDownIcon,
    XMarkIcon,
    Bars3Icon,
} from "@heroicons/react/24/solid";
import "../../styles/public/Navbar.css";

export function StickyNavbar() {
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setMobileOpen(false);
            }
            if (window.innerWidth <= 768) {
                setIsMenuOpen(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return (
        <>
            <Navbar id="Nav" className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
                <div className="navbar-container">

                    <div className="navbar-left hidden md:flex">
                        <a href="#" className="nav-item">
                            <HomeIcon className="icon" /> Home
                        </a>
                        <Menu open={isMenuOpen} handler={setIsMenuOpen}>
                            <MenuHandler>
                                <p className="nav-item dropdown-btn cursor-pointer">
                                    Products
                                    <ChevronDownIcon
                                        className={`icon dropdown-icon ${isMenuOpen ? "open" : ""}`}
                                    />
                                </p>
                            </MenuHandler>
                            <MenuList className="dropdown-menu dropdown-animated">
                                <MenuItem>Ofertas</MenuItem>
                                <MenuItem>Catálogo</MenuItem>
                            </MenuList>
                        </Menu>
                        <a href="#" className="nav-item">
                            <ShoppingBagIcon className="icon" /> Cart
                        </a>
                    </div>

                    <Typography as="a" href="#" className="logo">
                        CRUMBLY
                    </Typography>

                    <div className="navbar-right hidden md:flex">
                        <Button className="btn-login">
                            Log In <UserIcon className="icon-button" />
                        </Button>
                        <Button className="btn-signup">
                            Sign Up <UserPlusIcon className="icon-button" />
                        </Button>
                    </div>

                    <div className="md:hidden">
                        <IconButton
                            variant="text"
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="focus:outline-none"
                        >
                            {mobileOpen ? (
                                <XMarkIcon className="w-7 h-7 text-[#331F10]" />
                            ) : (
                                <Bars3Icon className="w-7 h-7 text-[#331F10]" />
                            )}
                        </IconButton>
                    </div>
                </div>

            </Navbar>
            {/* --- MENU MOBILE --- */}
            <div
                className={`mobile-menu md:hidden fixed left-0 w-full bg-white shadow-md transition-all duration-300 ease-out ${mobileOpen
                        ? "top-[90px] opacity-100 visible"
                        : "top-[60px] opacity-0 invisible pointer-events-none"
                    }`}
                style={{ zIndex: 9998 }}
            >
                <div
                    className={`overflow-hidden transition-[max-height] duration-300 ease-out ${mobileOpen ? "max-h-[520px]" : "max-h-0"
                        }`}
                >
                    <div className="flex flex-col items-start px-6 py-4 space-y-3 rounded-b-lg">
                        <a href="#" className="mobile-item">
                            <HomeIcon className="icon" /> Home
                        </a>

                        <button
                            className="mobile-item flex items-center justify-between w-full"
                            onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                            aria-expanded={mobileDropdownOpen}
                        >
                            <span>Products</span>
                            <ChevronDownIcon
                                className={`icon transition-transform duration-300 ${mobileDropdownOpen ? "rotate-180" : ""
                                    }`}
                            />
                        </button>

                        <div
                            className={`w-full overflow-hidden transition-[max-height] duration-300 ease-out ${mobileDropdownOpen ? "max-h-40" : "max-h-0"
                                }`}
                        >
                            <div className="flex flex-col ml-4 mt-2 space-y-2">
                                <a href="#" className="mobile-item">Ofertas</a>
                                <a href="#" className="mobile-item">Catálogo</a>
                            </div>
                        </div>

                        <a href="#" className="mobile-item">
                            <ShoppingBagIcon className="icon" /> Cart
                        </a>

                        <hr className="my-2 border-[#A2704D]" />

                        <Button className="btn-login w-full mb-2" id="btn-mobile">
                            Log In <UserIcon className="icon-button" />
                        </Button>
                        <Button className="btn-signup w-full" id="btn-mobile">
                            Sign Up <UserPlusIcon className="icon-button" />
                        </Button>
                    </div>
                </div>
            </div>


        </>
    );
}

export default StickyNavbar