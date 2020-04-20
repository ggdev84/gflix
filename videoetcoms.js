import React, { useState, useEffect } from "react"

// Ce composant semble fonctionnel, mais les commentaires ne sont pas cherchées à chaque fois.
function VideoEtComs(props){

    // Les states relatifs au pseudo, commentaires.
    var [pseudo, setpseudo] = useState("")
    var [commentaire, setcommentaire] = useState("")
    var [coms,setcoms] = useState([])

    // tmp est un state juste incrementé pour que le composant recharge et ainsi actualiser les commentaires quand on en publie un.
    var [tmp,setmp]=useState(0)

    // Fonction qui permet de créer un objet de commentaire, avec le pseudo, commentaire, et la date au format dd/mm/yy.
    var sendcomment = ()=>{
        let date = new Date()
        let dd = date.getDate()
        let mm = date.getMonth()+1
        var yy = date.getFullYear().toString().substr(-2)
        if(mm <10){
            mm = "0"+mm
        }
        if(dd<10){
            dd = "0"+dd
        }
        date = dd+"/"+mm+"/"+yy

        // Ajouter ensuite le commentaire via une requête.
        let request = `/addcomment/${props.id}/${encodeURI(pseudo)}/${encodeURI(commentaire)}/${encodeURIComponent(date)}`
        fetch(request,{method:"POST"})
        .then(data=>data.text())
        .then(data=>{setcommentaire("");setpseudo("");setmp(tmp+1)})
        .catch(err=>console.log(err))

    }

    // Fonction qui permet de gérer la touche entrée.
    var handleEnter = (e)=>{
        if(e.keyCode === 13){
            e.preventDefault()
            sendcomment()
        }
    }

    // Obtenir les commentaires de la vidéo qu'on charge.
    useEffect(()=>{
        fetch("/getcomments/"+props.id)
        .then(data=>data.text())
        .then(data=>JSON.parse(data))
        .then(data=>data.comments)
        .then(data=>setcoms(data))
    },[props.id,tmp]) // Le faire à chaque changement d'id (c'est-à-dire) de vidéo, et quand tmp est incrementé (voir plus haut).

    // Si il y a des commentaires, on les charge un par un.
    if(coms !== []){
        var coms2 = coms.map(i=>{
            return(
                <div key={coms.indexOf(i)} className="commentaire">
                    <h4>{i.pseudo} : {i.date}</h4>
                    <p>{i.commentaire}</p>
                </div>
            )
        })
    }

    // Le composant VideoEtComs général.
    return(
        <div className="vidcomdiv">
            <iframe title="Video" src={props.vidsrc+"?autoplay=1"} allowFullScreen="allowfullscreen" >
            </iframe> 
            <h2>{props.title}</h2>

            <div className="sendiv">
                <input className="pseudoinput" type="text" placeholder="Pseudo" value={pseudo} onChange={(e)=>{setpseudo(e.target.value)}}></input>
                <input className="cominput" type="text" placeholder="Commentaire" value={commentaire} onChange={(e)=>{setcommentaire(e.target.value)}} onKeyUp={(e)=>{handleEnter(e)}} ></input>
                <button onClick={sendcomment} >></button>
            </div>

            {coms2}
        </div>
    )
}

export default VideoEtComs