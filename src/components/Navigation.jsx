import React from "react";
import { useEffect } from "react";
import storeLogo from "../assets/store-logo.png";
import { Link } from 'react-router-dom';

const Navbar = ({ totalItems }) => {
      window.addEventListener('scroll', () => {
        const headerContent = document.getElementById('header-content');
            if (window.scrollY > 10) {
                headerContent.classList.add('scroll');
            } else {
                headerContent.classList.remove('scroll');
            }
        });
        const slideIn = () => {
            const cartModal = document.getElementById("sidecart");
            if(cartModal.classList.contains('slide-in')){
                cartModal.classList.add('slide-out','right-0');
                cartModal.classList.remove('slide-in','right-4');
            } else {                
                cartModal.classList.remove('slide-out', 'right-0');
                cartModal.classList.add('slide-in','right-4');
            }
        }

        return(
            <>
            <header id="site-header" className="shadow fixed top-0 left-0 w-full bg-white z-50 transition-transform duration-300 origin-top">
                <a href="#content" className="skip-link">Skip to Main Content</a>
                <div id="header-content" className="min-h-[55px] max-w-[1280px] mx-auto flex items-center justify-between transition-transform duration-300 transform">
                    <div>
                        <Link to="/">
                            <i className="text-secondary fa-solid fa-shop"><span className="sr-only">Home</span></i>
                        </Link>
                    </div>

                        <div className="relative inline-block flex gap-4">
                        <button className="cursor-pointer" onClick={() => slideIn()}>
                            <i className="text-secondary fas fa-shopping-bag"><span className="sr-only">Shopping Bag</span></i>
                            {totalItems > 0 && (
                            <span id="cart-count"
                                    className="absolute -bottom-1 -right-1 z-1 bg-primary text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                                {totalItems}
                            </span>
                            )}
                        </button>
                    </div>

                </div>
            </header>

            <div className="h-18"></div>
        </>
    )
}

export default Navbar;