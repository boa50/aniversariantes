import React from 'react';
import '../assests/custom-css.css';
import { useMediaQuery } from 'react-responsive';

function Header() {
    const isBigScreen = useMediaQuery({
        query: '(min-device-width: 550px)'
    });

    return (
        <div className={isBigScreen ? "" : "navbar-fixed"}>
            <nav>
                <div className="nav-wrapper red lighten-1">
                    <a href="/" id="logo" className="brand-logo">
                        <i className="material-icons">cake</i>
                        Aniversariantes
                    </a>
                </div>
            </nav>
        </div>
    );
}

export default Header;