import React, {useContext} from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import { NavBar, Button, NavLinkStyle } from "../styles";
import { UserContext } from '../context/User';
import pic from '../images/logo.png'

const NavigationBar = () =>  {

    const { currentUser, setCurrentUser } = useContext(UserContext)
    const navigate = useNavigate()

    const handleLogout = () =>{
        fetch("/logout", { method: "DELETE" }).then((r) => {
            if (r.ok) {
              setCurrentUser(null)
              navigate(`/`);
            } else {
                console.log("Unable to log out")
            }
          });
    }; 

    return (
        <NavBar>
            <NavLinkStyle>
                <NavLink
                    to="/"
                    exact="true"
                    style={{position:"absolute", left:"0px", top:"0px"}}
                    >
                    <img src={pic} alt="logo" style={{height:"8em"}}></img>
                </NavLink>
            </NavLinkStyle>
            <NavLinkStyle>
                <NavLink
                    to="/wineries"
                    style={{color: '#ffffff'}}
                    >
                    Wineries
                </NavLink>
            </NavLinkStyle>
            <NavLinkStyle>
                <NavLink
                    to='/users'
                    style={{color: '#ffffff'}}
                    >
                    Users
                </NavLink>
            </NavLinkStyle>
            <NavLinkStyle>
                <NavLink 
                     to='/maps'
                     style={{color: '#ffffff'}}
                    >
                     Maps
                </NavLink>
            </NavLinkStyle>

            <p style={{color: '#ffffff'}}>{currentUser? `Cheers, ${currentUser.username}!` : ""}</p>
            <div>{currentUser?  (
                    <Button variant="outline" onClick={handleLogout}>Logout</Button>) : (
                    <NavLink to="/Login"><Button>Log In</Button></NavLink>)}
            </div> 
        </NavBar>
       
     )
}

export default NavigationBar