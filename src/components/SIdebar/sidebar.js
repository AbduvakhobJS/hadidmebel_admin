import React from 'react';
import {Link, NavLink} from "react-router-dom";

function Sidebar() {
    return (
        <div>
            <div className={"sticky-top container-disable shadow-sm "} style={{width: "310px", height: "600px", }}>
                <div className={"container mt-5"}>
                    <ul className="nav flex-column text-center">
                        <li className="nav-item">
                            <Link to="/" className="nav-link text-light"  style={{fontSize: "18px"}}><i className="bi bi-house-door me-2"></i>Dashboard</Link>
                        </li>
                        <li className="nav-item mt-3">
                            <NavLink className="nav-link text-light" aria-current="page"  style={{fontSize: "18px"}} to="/promotion"><i className="bi bi-journal-text me-2"></i>Aksiyadagi mahsulotlar</NavLink>
                        </li>
                        <li className="nav-item mt-3">
                            <NavLink className="nav-link text-light" aria-current="page"  style={{fontSize: "18px"}} to="/promotion_date"><i className="bi bi-journal-text me-2"></i>Aksiya muddati</NavLink>
                        </li>
                        <li className="nav-item mt-3">
                            <NavLink className="nav-link text-light" aria-current="page"  style={{fontSize: "18px"}} to="/catalog"><i className="bi bi-grid me-2 "></i>Kataloglar</NavLink>
                        </li>
                        <li className="nav-item mt-3">
                            <NavLink className="nav-link text-light" aria-current="page"  style={{fontSize: "18px"}} to="/material"><i className="bi bi-brush me-2"></i>Materiallar</NavLink>
                        </li>
                        <li className="nav-item mt-3">
                            <NavLink className="nav-link text-light" aria-current="page"  style={{fontSize: "18px"}} to="/product"><i className="bi bi-bag me-2"></i>Mahsulotlar</NavLink>
                        </li>
                        <li className="nav-item mt-3">
                            <NavLink className="nav-link text-light" aria-current="page"  style={{fontSize: "18px"}} to="/zayavki"><i className="bi bi-list me-2"></i>So'ro'vlar</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;




