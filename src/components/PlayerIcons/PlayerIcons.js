import React from 'react';
import "./PlayerIcon.css";

export function Playericon(props){
    return(
        <div>
            <image src = {props.playerImage}/>
        </div>
    )
}