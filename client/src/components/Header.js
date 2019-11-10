import React from 'react';
import '../assests/custom-css.css';

function Header() {
    return (
        <nav>
            <div className="nav-wrapper red lighten-1">
                <a href="/" id="logo" className="brand-logo">
                    <i class="material-icons">cake</i>
                    Aniversariantes
                </a>
            </div>
        </nav>
    );
}

export default Header;