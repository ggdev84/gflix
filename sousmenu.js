import React, { useState } from "react"

function SousMenu(){

    let tmpbool
    if(window.innerWidth<701){tmpbool=true}
    else{tmpbool=false}

    // Toute la partie qui suit gère le bouton du sous-menu sous mobile.
    var [ssmenubtn, setssmenubtn]=useState(tmpbool)    
    var style
    var content
    var menuclickHandle = ()=>{

        if(ssmenubtn){
            setssmenubtn(false)
        }
        else{
            setssmenubtn(true)
        }
    }

    if(ssmenubtn===true){
        style={display:"none"}
        content = "="
        
    }
    else{
        style={display:"block"}
        content="x"
    }


    // Le sous menu avec les catégories Animaux, Nature, Villes et Technologie.
    return(
        <div>
            <button onClick={menuclickHandle} className="sousmenubutton" >{content}</button>
            <ul className="sousmenu" style={style} >
                <li><a href="#animaux">Animaux</a></li>
                <li><a href="#nature">Nature</a></li>
                <li><a href="#villes">Villes</a></li>
                <li><a href="#technologie">Technologie</a></li>
            </ul>
        </div>
    )
}

export default SousMenu