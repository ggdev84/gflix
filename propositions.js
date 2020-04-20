import React from "react"

// Propositions est un composant rechargé pour chaque liste et type de vidéos : Animaux, Nature, Villes, Technologie.
function Propositions(props){

    // Pour chaque vidéo, on crée un élement de liste de type ul.
    var items = props.liste.map(i=>{
        return(
            <li key={props.liste.indexOf(i)} onClick={()=>{props.setitle(i.title);props.setvidsrc(i.vidsrc); props.setlecteur(true);props.setid(i.id)}}><img src={i.imgsrc} alt=""/><h3>{i.title}</h3></li>
        )
    })
    
    // Le composant lui-même dont les vidéos sont mis dans une liste non-ordonnée (ul)
    return(
        <div className="propositions" id={props.divtitle}>
            <h2>{props.titre}</h2>
            <ul className="propositionitems">
                {items}
            </ul> 
        </div>
    )
}

export default Propositions