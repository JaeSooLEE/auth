import readline from "readline"
import fs from 'fs'
{import {FileUtil as futil} from '../utils/fileHandler.js'}

export class TokenService {


    // supprime les tokens périmés du fichier tokens.txt

    static cleanTokenFile(){
        var tokens = [];
        var resp = false;

        futil.readLine("tokens.txt", function (text) {
            
                var arr = text.split(";")
                var tm = parseInt(arr[1]);
                const dt = new Date();
                if( dt.getTime() - tm < 1000 * 60 * 20){
                    tokens.push(text);
                    console.log(dt.getTime() - tm)
                } 
            }, function() {

                futil.writeFile("tokens.txt", "")
                for(const el of tokens){
                    var elmt = el + "\n"
                    futil.appendFile("tokens.txt", elmt)
                }
        } )


    }

    // Génération aléatoire d'un token
    
    static token(){
        var rand = function() {
            return Math.random().toString(36).substr(2); 
        };
        return rand() + rand() + rand() + rand();
    }

}