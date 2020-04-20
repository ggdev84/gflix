import React from "react"

function Menu(){

    // L'aide de Gflix.
    var help = ()=>{
        alert("Bienvenue dans l'aide de GFlix\n\nRecherchez une vidéo et/ou cliquez sur l'une des vidéos pour la regarder.\n\nVous pouvez également la commenter et voir les autres commentaires sans vous inscrire.")
    }

    // Le menu tout en haut, aussi bien sur mobile que PC.
    return(
        <ul className="menu">
            <li><a href="/">GFlix</a></li>
            <li><button onClick={help} >Aide</button></li>
        </ul>
    )
}

export default Menu
