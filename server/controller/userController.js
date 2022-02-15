import express from 'express'
import Router from 'express'
export const usrRouter = Router()
usrRouter.use(express.json());
import fs from 'fs'
import {FileUtil as futil} from '../utils/fileHandler.js'
import { TokenService} from "../service/tokenService.js"
import { UserService } from "../service/userService.js"
import nodemailer from 'nodemailer'
import * as bcrypt from 'bcrypt';
//const nodemailer = require('nodemailer');
//import SmtpTransport from 'nodemailer-smtp-transport'


//verification de la validite de la paire utilisateur/mdp
const ROOT_URL = 'http://localhost:4200'
const saltRounds = 10;


usrRouter.post('/checkLogin', (req, res) => {
    //console.log(req.body);
    const uname = req.body.username
    const up = req.body.password
    //var resp = false;

    
    
    fs.readFile("users.json", (err, fileData) => {
        if (err) {
            res.send(false)
            return
        }
        try {
            const object = JSON.parse(fileData)
            let selectedUser = futil.jsonArrayContains(object.userlogs, "id", uname)
            if(selectedUser.fails > 2) {
                res.send("blocked")
                    
                setTimeout(() => {
                    selectedUser.fails = 0;
                    const reset = JSON.stringify(object, null, "\t")
                    fs.writeFile('users.json', reset, (err) => {
                        if (err) {
                            throw err;
                        }
                    
                    })
                    }, 300000)
                
                return
            }
            if(selectedUser == null){
                res.send(false)
                return
            }
            
            bcrypt.compare(up, selectedUser.password, function(err, result) {
                
                
                if(result == true){
                    res.send(true)
                    return
                }
                res.send(false)
                selectedUser.fails += 1
                const increment = JSON.stringify(object, null, "\t")
                fs.writeFile('users.json', increment, (err) => {
                    if (err) {
                        throw err;
                    }
                
                })
                
                setTimeout(() => {
                        selectedUser.fails = 0;
                        const reset = JSON.stringify(object, null, "\t")
                        fs.writeFile('users.json', reset, (err) => {
                            if (err) {
                                throw err;
                            }
                        
                        })
                    
                    }, 300000);
                    
                    
                
                return
            });
        } catch(err) {
            res.send(false)
        }
    })
})

usrRouter.post('/sendmail', (req, res) =>{
    
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
        user: 'ljs2112@gmail.com',
        pass: 'phtrnnybgucctknv'
        }
    });
    const ntoken = TokenService.token()
    const d = new Date().getTime()
    const rawdata = fs.readFileSync('users.json');
    const object = JSON.parse(rawdata);
    const data = UserService.cleanTokens(object);
    data.passwdTokens.push({"token": ntoken, "user": req.body.mail, "date": d})
    const newdata = JSON.stringify(data, null, "\t")//.replace(/,/gm, ',\n');
    fs.writeFile('users.json', newdata, (err) => {
        if (err) {
            throw err;
        }
        console.log("JSON data is saved.");
    })
    const mailOptions = {
        from: 'ljs2112@gmail.com',
        to: req.body.mail,
        subject: 'Sending Email using Node.js',
        text: ROOT_URL + "/register/" + ntoken
      };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          res.send("false")
        } else {
          console.log('Email sent: ' + info.response);
          res.send("true")
        }
      })


      
      
})

usrRouter.post('/addUser', (req, res) => {
    //console.log(req.body);
    const uname = req.body.username
    const up = req.body.password
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(up, salt, function(err, hash) {
            // Store hash in your password DB.
            
        
    const tok = req.body.tok
    //var resp = false;
    
    fs.readFile("users.json", (err, fileData) => {
        if (err) {
            res.send(false)
            return
        }
        try {
            const object = JSON.parse(fileData)
            let selectedUser = futil.jsonArrayContains(object.userlogs, "id", uname)
            if(selectedUser != null){
            //if(object.userlogs.hasOwnProperty(uname)){
                console.log(selectedUser)
                if(tok == "0"){
                    res.send("there is already an account associated to this mail address.")
                    return
                }else{
                    for (const elem of object.passwdTokens){
                        if(elem.token == tok){
                            if(elem.user != uname){
                                res.send("Invalid mail address")
                                return
                            }
                            
                            selectedUser.password = hash
                            
                            break
                        }
                    }
                }
                
            }else{
                if(tok != "0"){
                    console.log("token " + tok + "   " + uname)

                    res.send("Unkown mail address")
                    return
                }else{
                    object.userlogs.push({"id": uname, "password": hash, "fails": 0})
                }
            }
            const newdata = JSON.stringify(object, null ,"\t")//.replace(/,/gm, ',\n');
            fs.writeFile('users.json', newdata, (err) => {
                if (err) {
                    throw err;
                }
                console.log("New user added.");
            })
            res.send("")
            return

        } catch(err) {
            res.send(err.name)
        }
    })
    });
    });
})
