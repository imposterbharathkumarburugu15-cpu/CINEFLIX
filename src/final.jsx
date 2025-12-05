import React from "react";
import L1 from "./scan.png";
import './final.css';

const Final = () => {
    return (
        <div>
            <h1>
                YOUR TICKET IS CONFIRMED. THANK YOU FOR VISITING <i>CineFlix...</i>
            </h1>
            <div className="scan-container">
                <img src={L1} alt="Qr-Code" />
            </div>
        </div>
    );
};

export default Final;
