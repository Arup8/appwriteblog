import React from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  // Actually for production the navigation bar made by an array
  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="py-3 shadow bg-gray-500">
      <Container>
        <nav className="flex">
          <div className="mr-4">
            <Link to='/'>
              <Logo width="70px" />
            </Link>
          </div>
          <ul className="flex ml-auto">
            {navItems.map((item) => 
            item.active ? (
              <li key={item.name}> {/* Actually every item will repeat so we need to set a key */}
                <button
                onClick={() => navigate(item.slug)}
                className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                >{item.name}</button>
              </li>  
            ) : null
            )}
            {/* to show the logout button only when user is logged in*/}
            {authStatus && (             
              <li>
                <LogoutBtn />
              </li> 
            )} {/* here in that format {authStatus && ()} if authStatus is true then what will be written inside the bracket will show */}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header;
