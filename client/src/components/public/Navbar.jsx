import React, { useEffect, useState } from "react";
import {
    Navbar,
    Typography,
    Button,
    MenuHandler,
    MenuList,
    MenuItem,
    Menu,
} from "@material-tailwind/react";
import { HomeIcon, ShoppingBagIcon, UserIcon, UserPlusIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import "../../styles/public/Navbar.css"

export function StickyNavbar() {
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <Navbar id="Nav" className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>

            <div className="navbar-container">
                <div className="navbar-left">
                    <a href="#" className="nav-item">
                        <HomeIcon className="icon" /> Home
                    </a>
                    <Menu open={isMenuOpen} handler={setIsMenuOpen}>
                        <MenuHandler>
                            <Button className="nav-item dropdown-btn">
                                Products
                                <ChevronDownIcon
                                    className={`icon dropdown-icon ${isMenuOpen ? "open" : ""}`}
                                />
                            </Button>
                        </MenuHandler>
                        <MenuList className="dropdown-menu">
                            <MenuItem>Ofertas</MenuItem>
                            <MenuItem>Catalogo</MenuItem>
                        </MenuList>
                    </Menu>
                    <a href="#" className="nav-item">
                        <ShoppingBagIcon className="icon" /> Cart
                    </a>
                </div>
                <Typography as="a" href="#" className="logo">
                    CRUMBLY
                </Typography>
                <div className="navbar-right">
                    <Button className="btn-login">
                        Log In <UserIcon className="icon-button" />
                    </Button>
                    <Button className="btn-signup">
                        Sign Up <UserPlusIcon className="icon-button" />
                    </Button>
                </div>
            </div>
        </Navbar>
    )
}

export default StickyNavbar
