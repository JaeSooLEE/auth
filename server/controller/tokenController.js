import fs from 'fs'
import express from 'express'
import Router from 'express'
export const authRouter = Router()
var tokens = [];
authRouter.use(express.json());
import readline from "readline"
import { TokenService} from "../service/tokenService.js"
import {FileUtil as futil} from '../utils/fileHandler.js'



//creation et ajout d'un token

authRouter.post('/addToken', (req, res) => {
    const d = new Date();
    const tok = TokenService.token();
    var newTok = tok + ';' + d.getTime() + '\n';
    console.log(newTok)
    futil.appendFile("tokens.txt", newTok)

    res.send(tok);

})


//verification de la validite d'un token

authRouter.post('/checkToken', (req, res) => {
    console.log(req.body);
    var resp = false;
    futil.readLine('tokens.txt', function (text) {
        
        var arr = text.split(";")
        var tm = parseInt(arr[1]);
        const dt = new Date();
        if( arr[0] === req.body.token && dt.getTime() - tm < 1000 * 60 * 20){
            resp = true;
        } 
    }, function() {
        res.send(resp);
    })
})


//nettoyage du fichier tokens

authRouter.delete('/cleanTokens', (req, res) => {
    TokenService.cleanTokenFile();
    res.send();
})

