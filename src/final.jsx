import React from "react";
import L1 from "./scan.png";
import './final.css'
const Final =()=>{
    return(
        <div>
            <h1>YOUR TICKET IS CONFIRMED .THANK YOU FOR VISITING <i>CineFlix...</i></h1>
            <img src={L1} ClassName="qr" alt="Qr-Code"/>
        </div>
    )
}
export default Final;
