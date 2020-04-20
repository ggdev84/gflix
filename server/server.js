/*Le serveur du site Gflix.
Le serveur utilise MongoDB en guise de base de données. */

var mongoclient = require("mongodb").MongoClient
var express = require("express")
var app = express()

app.listen(8080)

// Fonction qui permet de chercher les commentaires d'une vidéo.
var getcomments = (id)=>{
    return new Promise((resolve,reject)=>{
        mongoclient.connect("mongodb://localhost",{useUnifiedTopology:true},(err,db)=>{
            if(err){
                reject(new Error("Erreur avec le client mongo."))
            }
            else{
                var db2 = db.db("site")
                db2.collection("comments").find({"videoid":id}).toArray((err,results)=>{
                    if(err){reject(new Error("Erreur avec le client Mongo."))}
                    else{
                        resolve(results.reverse())
                    }
                })
            }
        })
    })
}

// Fonction pour avoir toutes les vidéos.
var getallvideos = ()=>{
    return new Promise((resolve,reject)=>{
        mongoclient.connect("mongodb://localhost",{useUnifiedTopology:true},(err,db)=>{
            if(err){
                reject(new Error("Erreur avec le client mongo."))
            }
            else{
                var db2 = db.db("site")
                db2.collection("videos").find().toArray((err,results)=>{
                    if(err){reject(new Error("Erreur avec le client Mongo."))}
                    else{
                        resolve(results)
                    }
                })
            }
        })
    })
}

// Fonction qui permet d'ajouter un commentaire.
var addcomment = (commentaire)=>{
    return new Promise((resolve,reject)=>{
        mongoclient.connect("mongodb://localhost",{useUnifiedTopology:true},(err,db)=>{
            if(err){
                reject(new Error("Erreur avec le client Mongo."))
            }
            else{
                var db2 = db.db("site")
                db2.collection("comments").insertOne(commentaire,(err,results)=>{
                    if(err){reject(new Error("Erreur avec le client Mongo."))}
                    else{
                        resolve("Commentaire ajouté !")
                    }
                })
            }
        })
    })
}

// Fonction qui permet de faire une recherche par mot ou lettres.
var searchbyword = (mot)=>{
    return new Promise((resolve,reject)=>{
        mongoclient.connect("mongodb://localhost",{useUnifiedTopology:true},(err,db)=>{
            if(err){
                reject(new Error("Erreur avec le client Mongo."))
            }
            else{
                var db2 = db.db("site")
                var regex = new RegExp(".*"+mot+".*","i")
                db2.collection("videos").find({title:regex}).toArray((err,results)=>{
                    if(err){reject(new Error("Erreur avec le client Mongo."))}
                    else{
                        resolve(results)
                    }
                })
            }
        })
    })
}

// A partir d'ici, c'est la gestion des requêtes.


// Recherche par mots ou lettres. Prend une chaîne de caractères en paramètre.
app.get("/searchbyword/:word",(req,res)=>{
    res.setHeader("Content-Type","text/plain")
    searchbyword(req.params.word)
    .then(data => res.status(200).send(JSON.stringify({"searchvideos":data})))
    .catch(err=>{console.log(err);res.status(200).send("Erreur")})
})

// Avoir les commentaires d'une vidéo. Prend un id (sous forme de chaîne de caractères) en paramètre.
app.get("/getcomments/:id",(req,res)=>{
    res.setHeader("Content-Type","text/plain")
    getcomments(req.params.id)
    .then((data)=>{
        let datatosend = JSON.stringify({"comments":data})
        res.status(200).send(datatosend)
    })
    .catch(err=>{console.log(err);res.status(200).send("Erreur")})
})

// Ajouter un commentaire. Prend un id, un pseudo, un commentaire et une date en paramètres.
app.post("/addcomment/:videoid/:pseudo/:commentaire/:date",(req,res)=>{

    // Le format choisi est le JSON car c'est le format utilisé par MongoDB par défaut.
    let commentobj={
        "videoid":req.params.videoid,
        "pseudo":decodeURI(req.params.pseudo),
        "commentaire":decodeURI(req.params.commentaire),
        "date":decodeURIComponent(req.params.date)
    }

    res.setHeader("Content-Type","text/plain")
    addcomment(commentobj)
    .then(data=>res.status(200).send(data))
    .catch(err=>{console.log(err);res.status(200).send("Erreur")})
})

// Avoir toutes les vidéos. Ne prend pas de paramètres car on recherche toutes les vidéos.
app.get("/getallvideos",(req,res)=>{
    res.setHeader("Content-Type","text/plain")
    getallvideos()
    .then((data)=>{
        let datatosend = JSON.stringify({"allvideos":data})
        res.status(200).send(datatosend)
    })
    .catch(err=>{console.log(err);res.status(200).send("Erreur")})
})

