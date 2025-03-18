import { Link } from "react-router-dom";

const NavBar = () => {

    return (
        <nav className='nav'>
            <ul className='nav-list'>
                <li><Link to='/'>개발</Link></li>
                <li><Link to='/about'>소개</Link></li>
                <li><Link to='/guestbook'>방명록</Link></li>
            </ul>
        </nav>
    );
};

export default NavBar;