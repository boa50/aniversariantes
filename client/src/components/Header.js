import React from 'react';
import '../assests/custom-css.scss';

const Header = (props) => {
    const isBigScreen = props.mediaQueries.isBigScreen;

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