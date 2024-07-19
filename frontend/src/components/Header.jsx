import { Link } from "react-router-dom";

function Header() {
    return (
        <header className="main__header" id="main-header">
            <nav className="main__nav" id="main-nav">
                <ul className="nav__links">
                    <li className="link">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="link">
                        <Link to="/messages">Messages</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;
