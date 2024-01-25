import React, {useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {CookiesProvider, useCookies} from "react-cookie";

const Login = ({setLoggedIn}) => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [cookies, setCookie] = useCookies(["user"])

    const navigate = useNavigate()
    const handleLogin = async (user) => {
        if(login === "" || password === ""){
            alert("Login yoki parol kiritilmagan")
        }
        else{
            try {
                const response = await axios.post(`${process.env.REACT_APP_API_ADMIN}/admin/login`, { login, password });

                if (response.status === 200) {
                    setLoggedIn(true)
                    setCookie("user", response.data.token, {path: "/"})
                    localStorage.setItem("token", response.data.token)
                    navigate("/")
                } else {
                    alert('Login failed');
                }
            } catch (error) {
                console.error('Error during login:', error.message);
            }
        }
    };

    return (
        <div>
            <div>
                <div className={"container mt-5"}>
                    <div className={"d-flex justify-content-center"}>
                        <form className={"w-25 shadow p-4 needs-validation"} noValidate>
                            <div className={"container"}>
                                <img src='/photo_2023-11-15_21-23-16.jpg' className={"w-25"} style={{marginLeft: "90px"}}/>
                                <h5 className={"text-center mt-3"}>Hush kelibsiz Admin</h5>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Login</label>
                                <input type="text" onChange={e => setLogin(e.target.value)} className="form-control text-bg-dark" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Parol</label>
                                <input type="password" onChange={e => setPassword(e.target.value)} className="form-control text-bg-dark" id="exampleInputPassword1"/>
                            </div>
                            <button onClick={() => handleLogin()} type="button" className="btn w-50 rounded-0 btn-success" style={{marginLeft: "70px"}}>Kirish</button>
                        </form>
                    </div>

                </div>
            </div>
        </div>

    );
};

export default Login;
