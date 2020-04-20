import React, { useState, useEffect} from "react"

// Composant qui regroupe la recherche de vidéos et l'affichage des vidéos correspondant à la recherche.
function Search(props){

    // Gérer le design au démarrage du mobile. Les suggestions de vidéos ne s'affichent pas par défaut sur mobile au départ.
    var stylesearch

    if(window.innerWidth<701){
        stylesearch="none"
    }
    else{
        stylesearch="block"
    }

    var suggestionsHandle=()=>{
        if(mobilestyle==="none"){
            setmobilestyle("block")
        }
        else{
            setmobilestyle("none")
        }
    }

    // Initialisation des states.

    var [search, setsearch] = useState("")
    var [vids,setvids] = useState([])

    /* Le state tmp est juste incrementé, c'est une simple stratégie pour que le changement du state tmp
    remette à zéro la liste entière de suggestions de vidéos une fois que la recherche est effacée.*/
    var [tmp,setmp] = useState(0)

    // Un simple state qui gère l'affichage des vidéos recherchées sur mobile.
    var [mobilestyle, setmobilestyle] = useState(stylesearch)

    // Fonction qui utilise la fonction fetch pour aller chercher les vidéos dont les titres correspondent à la recherche.
    var handleClick = ()=>{
        if(search !== "" && search !== " "){
            fetch("/searchbyword/"+search)
            .then(data=>data.text())
            .then(data=>JSON.parse(data))
            .then(data=>data.searchvideos)
            .then(data=>{setvids(data);if (window.innerWidth<701){setmobilestyle("block")}})
        }
        else{
            setmp(tmp+1)
        }

    }

    // Fonction qui permet juste de prendre en charge la touche Enter.
    var handleEnter = (e)=>{
        if(e.keyCode === 13){
            e.preventDefault()
            handleClick()
        }
    }

    // Fonction au démarrage qui permet de chercher les vidéos disponibles.
    useEffect(()=>{
        fetch("/getallvideos")
        .then(data=>data.text())
        .then(data=>JSON.parse(data))
        .then(data=>data.allvideos)
        .then(data=>{
            setvids(data)
        })

    },[tmp])

    // S'il y a des vidéos à charger, suite à une recherche par exemple, on les charge un par un.
    if(vids !== []){
        var vids2 = vids.map(i=>{
            return(
                <div key={vids.indexOf(i)} className="vidiv" style={{display:mobilestyle}} onClick={()=>{props.setvidsrc(i.vidsrc);props.setid(i._id.toString());props.setitle(i.title);if(window.innerWidth<701){setmobilestyle("none")}}}>
                    <img src={i.imgsrc} alt="" /><h5>{i.title}</h5>
                </div>
            )
        })
    }



    // Le composant lui même.
    return(
        <div className="searchdiv">
            <input type="text" value={search} onChange={(e)=>{setsearch(e.target.value)}} placeholder="Rechercher" onKeyUp={(e)=>{handleEnter(e)}} /><button onClick={handleClick} >></button>
            <button onClick={suggestionsHandle} className="suggestions">Suggestions +</button>
            {vids2}
        
        </div>
    )
}

export default Search