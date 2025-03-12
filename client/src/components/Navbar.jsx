import React, {useState} from 'react';
import { IconButton } from "@mui/material";
import { Search, Menu, Person } from "@mui/icons-material";
import variables from "../styles/variables.scss";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setLogout } from "../redux/state";
import "../styles/navbar.scss";

const Navbar = () => {
    const [search, setSearch] = useState('');
    const [dropdownMenu, setDropdownMenu] = useState(false);
    const user = useSelector(state => state.user);

    const navigate = useNavigate();
    const dispatch = useDispatch();
  return (
    <nav className="navbar">
      <a href="/">
        <img src={"/assets/logo.png"} alt="logo"/>
      </a>
      <div className="navbar_search">
        <input
          type="text"
          placeholder="Search ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <IconButton disabled={search === ""}>
          <Search
            sx={{ color: variables.pinkred }}
            onClick={() => {navigate(`/properties/search/${search}`)}}
          />
        </IconButton>
      </div>
      <div className="navbar_right">
        <a href={user ? "/create-listing" : "/login"} className='host'>Become A Host</a>
       </div>
      <button className="navbar_right_account" onClick={() => setDropdownMenu(!dropdownMenu)}>
        <Menu sx={{ color: variables.darkgrey}}/>
        {!user ? 
            <Person sx={{ color: variables.darkgrey }} /> :
            <img
              src={`http://localhost:4000/uploads/${user.profileImagePath.replace(
                "public",
                ""
              )}`}
              alt="profile"
              style={{ objectFit: "cover", borderRadius: "50%" }}
            />
        }
      </button>
      { dropdownMenu && !user && (
         <div className="navbar_right_accountmenu">
            
       </div>
      )}
      { dropdownMenu && (
         <div className="navbar_right_accountmenu">
            {!user ? (
                <>
                    <Link to="/login">Log In</Link>
                    <Link to="/register">Sign Up</Link>
                </>
                ): (
                <>
                    <Link to={`/${user._id}/trips`}>Trip List</Link>
                    <Link to={`/${user._id}/wishList`}>Wish List</Link>
                    <Link to={`/${user._id}/properties`}>Property List</Link>
                    <Link to={`/${user._id}/reservations`}>Reservation List</Link>
                    <Link to="/create-listing">Become A Host</Link>
                    <Link to="/login" onClick={() => {dispatch(setLogout())}}>Log Out</Link>
                </>
                )
            }
       </div>
      )}
    </nav>
  )
}

export default Navbar
