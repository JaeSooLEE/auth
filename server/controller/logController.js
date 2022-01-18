
import * as express from "express"
import Router from "express"
import fs from 'fs'
export const logRouter = Router()
logRouter.use(express.json());
import {FileUtil as futil} from '../utils/fileHandler.js'



// Ajout d'un erreur dans le log

logRouter.post('/addErrors', (req, res) => {

    var jsonData = JSON.stringify(req.body);
    console.log(req.body)
    console.log(new Error(req.body.error))
    const re = /{/
    const re2 = /}/
    //const r = /n    /gm
    var ns = jsonData.replace(re, '')
    var newstr2 = ns.replace(re2, '\n\n')
    var newstr = newstr2.replace(/n    /gm, '\n')
    
    futil.appendFile("errorLog.txt", newstr)
    res.send();
})




// Récupération des erreurs archivées dans le log

logRouter.get('/getErrors', (req, res) => {
    
    fs.readFile('errorLog.txt', 'utf8' , (err, data) => {
        if (err) {
          console.error(err)
          return
        }
        console.log(data)
        res.send(data)
      })

})


// Clear le log

logRouter.delete('/clearErrors', (req, res) => {

    futil.writeFile("errorLog.txt", "")
    res.send()
})

