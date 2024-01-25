import React from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { remove } from "react-cookies";


function Navbar({setLoggedIn}) {
    const navigate = useNavigate()
    const handleLogout = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API_ADMIN}/admin/logout`)
            if(data.success === true){
                setLoggedIn(false)
                remove("user")
                localStorage.clear("token")
                navigate("/login")
            }
            else{
                console.error('Logout failed');
            }
        }
        catch (error) {
            console.error('Error during logout:', error.message)
        }
    }
    return (
        <div>
            <nav className=" navbar shadow-sm text-bg-dark d-flex">
                <div className="container-fluid">
                    <img src='/photo_2023-11-15_21-23-16.jpg' style={{width: "45px"}}/>
                    <form className="d-flex" role="search">
                        <button onClick={() => handleLogout()} className="btn btn-success rounded-0" type="button">Chiqish<i className={"ms-2 bi bi-arrow-bar-right"}></i></button>
                    </form>
                </div>

            </nav>
        </div>
    );
}

export default Navbar;