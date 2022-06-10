import React from 'react';
import { Link } from 'react-router-dom';

function Header({isAuthenticated, setIsAuthenticated}) {
	return (
		<header>
			<nav className="navbar navbar-expand-md navbar-dark bg-dark sticky-top">
                <div className="navbar-brand container">
                    ToDoList App
                </div>
                <ul className="navbar-nav justify-content-end container">
                    <li className="nav-link px-4"><Link to='/'>Home</Link></li>
                    {isAuthenticated && <li className="nav-link px-4"><Link to='/todoList'>Todo</Link></li>}
                    {isAuthenticated && <li className="nav-link px-4"><Link to='/logout'>로그아웃</Link></li>}
                    {!isAuthenticated && <li className="nav-link px-4"><Link to='/signin'>로그인</Link></li>}
                    {!isAuthenticated && <li className="nav-link px-4"><Link to='/signup'>회원가입</Link></li>}
                </ul>
            </nav>
		</header>
	)
}

export default Header;
