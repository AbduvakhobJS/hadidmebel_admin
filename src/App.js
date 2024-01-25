import Navbar from "./components/Navbar/navbar";
import Footer from "./components/Footer/footer";
import Main from "./components/Main/main";
import Sidebar from "./components/SIdebar/sidebar";
import Login from "./components/Auth/login";
import React, {useState} from "react";  
import {Route, Routes} from "react-router-dom";




function App() {
    const [isLoggedIn, setLoggedIn] = useState(localStorage.getItem("token"))
  return (
      <>
          {isLoggedIn ? (
                  <div>
                      <Navbar setLoggedIn={setLoggedIn}/>
                      <div className={"d-flex"}>
                          <Sidebar/>
                          <Main/>
                      </div>
                      <Footer/>
                  </div>
              ) : (
                  <Routes>
                      <Route path={"/login"} element={<Login setLoggedIn={setLoggedIn}/>}></Route>
                      <Route path={"*"} element={<Login setLoggedIn={setLoggedIn}/>}></Route>
                  </Routes>
              )
          }
      </>

  )
}

export default App;
