import * as express from "express"
import Router from "express"
import fs from 'fs'
import { Graph } from "../model/graph.Model.js";
export const mantesRouter = Router()
mantesRouter.use(express.json());


mantesRouter.post('/getVertices', (req, res) => {
    fs.readFile('Mantes_Export GeoJson.geojson', 'utf8', (err, data) =>{
    // fs.readFile('geojsonTest.geojson', 'utf8', (err, data) =>{        
        if (err){
            console.error(err)
            return
        }
        let a = req.body.departure
        let b = req.body.destination
        const obj = JSON.parse(data);
        const vertices = new Graph(obj)
        console.log(vertices.dedoublementArray)
        const path = vertices.processBestPath(a, b)
        // const path = vertices.processBestPath([0.5, 2, 0], [2.5, 0, 0])
        res.send(path)
    })
})