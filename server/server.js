'use strict';
var http = require('http');
var https = require('https');
var fs = require('fs');
require('dotenv').config();

var port = process.env.PORT || 1337;

//const { port, mangourl } = require('./config.js');
var app = require("./app.js");


const httpsOptions = {
    key: fs.readFileSync('./Certificat/key.pem'),
    cert: fs.readFileSync('./Certificat/cert.pem')
}

https.createServer(httpsOptions, app).listen(port, () => {
    console.log("Listening at :" + port + "...");
});

//app

console.log("Executing Server : index.js ...");

/*
 * 
 * Code ETAT http
 * 
 *  200	OK	Requ�te trait�e avec succ�s. La r�ponse d�pendra de la m�thode de requ�te utilis�e.
    201	Created	Requ�te trait�e avec succ�s et cr�ation d�un document.
    202	Accepted	Requ�te trait�e, mais sans garantie de r�sultat.
    203	Non-Authoritative Information	Information retourn�e, mais g�n�r�e par une source non certifi�e.
    204	No Content	Requ�te trait�e avec succ�s mais pas d�information � renvoyer.
 * 
 * 
 *  400	Bad Request	La syntaxe de la requ�te est erron�e.
    401	Unauthorized	Une authentification est n�cessaire pour acc�der � la ressource.
    402	Payment Required	Paiement requis pour acc�der � la ressource.
    403	Forbidden	Le serveur a compris la requ�te, mais refuse de l'ex�cuter. Contrairement � l'erreur 401, s'authentifier ne fera aucune diff�rence. Sur les serveurs o� l'authentification est requise, cela signifie g�n�ralement que l'authentification a �t� accept�e mais que les droits d'acc�s ne permettent pas au client d'acc�der � la ressource.
    404	Not Found	Ressource non trouv�e.
 * 
 * 
 */