import React from "react";
import ReactLoading from "react-loading";
import './Login.css';
 
export default function Loading() {
    return (
        <div>
                <ReactLoading
                type="spinningBubbles"
                color="black"
                height={100}
                width={50}
            />
        </div>
    );
}