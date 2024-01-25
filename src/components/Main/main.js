import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Dashboard from "../Pages/dashboard";
import PromotionProducts from "../Pages/promotionProducts";
import Catalogs from "../Pages/catalogs";
import Products from "../Pages/products";
import Material from "../Pages/material";
import Zayavka from "../Pages/zayavka";
import Promotion_date from "../Pages/promotion_date";
import Login from "../Auth/login";

function Main() {

    return (
        <div className={"w-100"}>
            <div className={"container  w-100"}>
                    <Routes>
                        <Route path={"/"} element={<Dashboard/>}></Route>
                        <Route path={"/promotion"} element={<PromotionProducts/>}></Route>
                        <Route path={"/promotion_date"} element={<Promotion_date/>}></Route>
                        <Route path={"/catalog"} element={<Catalogs/>}></Route>
                        <Route path={"/product"} element={<Products/>}></Route>
                        <Route path={"/material"} element={<Material/>}></Route>
                        <Route path={"/zayavki"} element={<Zayavka/>}></Route>
                    </Routes>
            </div>
        </div>
    );
}

export default Main;