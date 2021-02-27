import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {

    // dark mode toggle function
    const darkThemeHandler = () => {
        document.body.classList.toggle('dark-theme-settings');
    }

    return (
        <header>
            <div className="brand">
                <Link to="/">
                    Movie Inventory
                </Link>
            </div>
            <div className="dark-theme">
                <div className="dark-theme-container" onClick={darkThemeHandler} >
                    <div className="dark-theme-icons">
                        <div className="light-icon">
                            <i className="lni lni-sun"></i>
                        </div>
                        <div className="dark-icon">
                            <i className="lni lni-night"></i>
                        </div>
                    </div>
                    <div className="dark-theme-swtich"></div>
                </div>
            </div>
        </header>
    )
}
