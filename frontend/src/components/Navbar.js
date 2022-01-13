import React, {useState, useContext} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from '../auth';

function Navbar(){
    const {user, logout} = useContext(AuthContext);
    const [activeItem, setActiveItem] = useState('home');
    const pathname = window.location.pathname;
    const path = pathname === '/' ? 'home' : pathname.substr(1);
    const handleItemClick = (e, {name}) => setActiveItem(name);

    const navBar = user ? (
            <nav class="flex items-center justify-between flex-wrap bg-orange-500 p-6">
                <div class="flex items-center flex-shrink-0 text-white mr-6">
                    <Link to="/" name = "home" active={activeItem === 'home'} onClick={handleItemClick}
                        class="font-semibold text-xl tracking-tight">
                            Climate Blog
                    </Link>
                </div>
                <div class="block lg:hidden">
                    <button class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
                    <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
                    </button>
                </div>
                <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                    <div class="text-sm lg:flex-grow">
                    <Link to="/" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                        Home
                    </Link>
                    <Link to="/user-issues" name = "issues" active={activeItem === 'issues'} onClick={handleItemClick}
                        class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                            My Posts
                    </Link>
                    <Link to="/addissue" name = "addIssue" active={activeItem === 'addIssue'} onClick={handleItemClick}
                        class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                            Add New Issue
                    </Link>
                    </div>
                </div>
                <div>
                    <Link to="/login" name = "logout" onClick={logout}
                        class="inline-block text-sm px-4 mx-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">
                            Logout
                    </Link>
                </div>
            </nav>
    ):(
        <nav class="flex items-center justify-between flex-wrap bg-orange-500 p-6">
        <div class="flex items-center flex-shrink-0 text-white mr-6">
            <Link to="/" name = "home" active={activeItem === 'home'} onClick={handleItemClick}
                class="font-semibold text-xl tracking-tight">
                    Climate Blog
            </Link>
        </div>
        <div class="block lg:hidden">
            <button class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
            <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
            </button>
        </div>
        <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
            <div class="text-sm lg:flex-grow">
            <Link to="/" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                Home
            </Link>
            </div>
        </div>
        <div>
            <Link to="/login" name = "login" active={activeItem === 'login'} onClick={handleItemClick}
                class="inline-block text-sm px-4 mx-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">
                    Login
            </Link>
        </div>
        <div>
            <Link to="/register" name = "register" active={activeItem === 'register'} onClick={handleItemClick}
                class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">
                    Register
            </Link>
        </div>
    </nav>
    );
    
    return navBar;
    
}

export default Navbar;