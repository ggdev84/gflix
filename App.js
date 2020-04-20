import React, { useState } from 'react';
import './App.css';
import Menu from "./menu"
import VideoEtComs from "./videoetcoms"
import Search from "./search"
import SousMenu from "./sousmenu"
import Debuter from "./debuter"
import Propositions from "./propositions"

var listeAnimaux = [
    {
        "id":"5e9239614e2ba737fafafaea",
        "title":"L'attaque atypique mais efficace de l'aigle.",
        "imgsrc":"https://img.bfmtv.com/c/1000/600/72a/18c33c25cb5bf223853eb8a2abdd5.jpeg",
        "vidsrc":"https://www.youtube.com/embed/0xoqLAxW7mc"
    },
    {
        "id":"5e9239614e2ba737fafafaeb",
        "title":"Le tigre du Bengale, un chasseur hors-pair.",
        "imgsrc":"https://upload.wikimedia.org/wikipedia/commons/e/e3/Panthera_tigris6.jpg",
        "vidsrc":"https://www.youtube.com/embed/GfKLJ3i_5p8"
    },
    {
        "id":"5e9239614e2ba737fafafaec",
        "title":"Les koalas d'Australie, une espèce menacée.",
        "imgsrc":"https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Koala_climbing_tree.jpg/290px-Koala_climbing_tree.jpg",
        "vidsrc":"https://www.youtube.com/embed/oI3ADcDH0Uc"
    }
]

var listeNature = [
    {
        "id":"5e9239614e2ba737fafafaed",
        "title":"L'Everest, un lieu aussi dangereux que fréquenté.",
        "imgsrc":"https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/K2-big.jpg/800px-K2-big.jpg",
        "vidsrc":"https://www.youtube.com/embed/qvYZfsZ8ynE"
    },
    {
        "id":"5e9239614e2ba737fafafaee",
        "title":"Etretat et ses falaises vus par un drône.",
        "imgsrc":"https://i.pinimg.com/originals/d1/cf/9e/d1cf9e7a254ac996719a09c4caa1a35a.png",
        "vidsrc":"https://www.youtube.com/embed/lJqRSFybWQk"
    },
    {
        "id":"5e9239614e2ba737fafafaef",
        "title":"Hanakapiai, la plage la plus dangereuse d'Hawaii.",
        "imgsrc":"https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Hanakapiai_Beach%2C_Na_Pali_Coast%2C_Kauai%2C_Hawaii.jpg/1200px-Hanakapiai_Beach%2C_Na_Pali_Coast%2C_Kauai%2C_Hawaii.jpg",
        "vidsrc":"https://www.youtube.com/embed/Yu3lPSBpOHs"
    }
]

var listeVilles = [
    {
        "id":"5e9239614e2ba737fafafaf0",
        "title":"Varosha, une ancienne ville touristique à l'abandon.",
        "imgsrc":"https://www.ststworld.com/wp-content/uploads/2019/06/Varosha.jpg",
        "vidsrc":"https://www.youtube.com/embed/2lfEY1Vgze4"
    },
    {
        "id":"5e9239614e2ba737fafafaf1",
        "title":"Paris et ses monuments.",
        "imgsrc":"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Paris_-_Eiffelturm_und_Marsfeld2.jpg/1200px-Paris_-_Eiffelturm_und_Marsfeld2.jpg",
        "vidsrc":"https://www.youtube.com/embed/s14fnjPvNCc"
    },
    {
        "id":"5e9239614e2ba737fafafaf2",
        "title":"Salt Lake City, capitale de l'Utah.",
        "imgsrc":"https://www.visitutah.com/media/15896027/web2000_saltlakecity_skyline_spring_jay_dash_photography_img_3274_full_large.jpg?quality=30",
        "vidsrc":"https://www.youtube.com/embed/VmzAawvFAKU"
    }
]

var listeTechnologie = [
    {
        "id":"5e9239614e2ba737fafafaf3",
        "title":"Les montres connectées, un vrai petit bijou de technologie.",
        "imgsrc":"https://images.vinted.net/thumbs/f800/06bef_RZNrLbn7wvVHuWPvUHgkomSx.jpeg?1575467001-c520fd967969a4409d3caa62752a208eb30fe8bf",
        "vidsrc":"https://www.youtube.com/embed/ZlhF7LnupiU"
    },
    {
        "id":"5e9239614e2ba737fafafaf4",
        "title":"Visite d'une mine de bitcoins en Islande.",
        "imgsrc":"https://spectrum.ieee.org/image/Mjk2MDU2OQ.jpeg",
        "vidsrc":"https://www.youtube.com/embed/MwWIXzTOoZY"
    },
    {
        "id":"5e9239614e2ba737fafafaf5",
        "title":"Le Dassault Rafale, un avion de chasse dernier cri.",
        "imgsrc":"https://upload.wikimedia.org/wikipedia/commons/6/64/Rafale_-_RIAT_2009_%283751416421%29.jpg",
        "vidsrc":"https://www.youtube.com/embed/Gg4rIxW0mrQ"
    }
    
]


function App() {

    /*Les états suivants définissent le site en général. Lecteur permet de passer de la page d'accueil à la page avec la vidéo.
    Vidsrc permet de régler la vidéo source de la vidéo. Id et Title sont des propriétés des vidéos affichées.*/
    var [lecteur,setlecteur] = useState(false)
    var [vidsrc, setvidsrc] = useState("https://www.youtube.com/embed/VmzAawvFAKU")
    var [id, setid] = useState("")
    var [title,setitle] = useState("")
    
    // Afficher la vidéo et les commentaires
    if(lecteur){
        return(
            <div>
                <Menu/>
                <Search setvidsrc={setvidsrc} setid={setid} setitle={setitle} />

                <VideoEtComs vidsrc={vidsrc} id={id} title={title} />
            </div>
        )
    }
    // Afficher la page d'accueil.
    else{
        return(
            <div>
                <Menu/>
                <div className="banniere" >
                    <SousMenu/>
                    <h2>Regardez, observez, admirez.</h2>
                    <Debuter/>
                    <a className="scrolldown" href="#animaux">V</a>
                </div>
                <Propositions titre="Animaux" liste={listeAnimaux} divtitle="animaux" setvidsrc={setvidsrc} setlecteur={setlecteur} setid={setid} setitle={setitle} />
                <Propositions titre="Nature" liste={listeNature} divtitle="nature" setvidsrc={setvidsrc} setlecteur={setlecteur} setid={setid} setitle={setitle} />
                <Propositions titre="Villes" liste={listeVilles} divtitle="villes" setvidsrc={setvidsrc} setlecteur={setlecteur} setid={setid} setitle={setitle} />
                <Propositions titre="Technologie" liste={listeTechnologie} divtitle="technologie" setvidsrc={setvidsrc} setlecteur={setlecteur} setid={setid} setitle={setitle} />
            </div>
        )
    }
}

export default App;
