import { Edge } from "./edge.Model.js";
import { Vertex } from "./vertex.Model.js";

export class Graph{
    //startPoints = new Map()
    vertices = new Map()
    edges = new Map()
    currentId = 0
    dedoublementArray = new Set()
    constructor(jsonRails){
        this.fromJson(jsonRails);
    }



    /**
     * Construit le graphe correspondant à jsonRails 
     * @param {*} jsonRails fichier json contenant les informations nécessaires pour construire le graphe.
     */
    fromJson(jsonRails){
        // console.log(jsonRails)
        let previousVerId = -1;
        let currentVerId = -1;
        for(let j = 0; j < jsonRails.features.length; j++){
            let voie = jsonRails.features[j]

            for(let i = 0; i < voie.geometry.coordinates[0].length; i++){
                const ver = new Vertex(voie.geometry.coordinates[0][i][0], voie.geometry.coordinates[0][i][1], voie.geometry.coordinates[0][i][2]);
                currentVerId = this.verticesContains(ver)

                if(currentVerId == -1){
                    currentVerId = this.currentId
                    this.vertices.set(this.currentId, ver)
                    this.edges.set(this.currentId, new Set())
                    this.currentId += 1
                }else{
                    this.dedoublementArray.add(this.vertices.get(currentVerId))
                }

                if(i > 0){
                    this.edges.get(currentVerId).add(previousVerId)
                    this.edges.get(previousVerId).add(currentVerId)
                }
                previousVerId = currentVerId
                
            }
        }
    }

    /**
     * Vérifie si un sommet appartient à vertices
     * @param {*} v sommet à tester
     * @returns la clé correspondant au sommet dans le hashmap, -1 s'il n'appartient pas
     */
    verticesContains(v){
        for(const [key, value] of this.vertices.entries()){
            if(value.equals(v)) return key;
        }
        return -1;
    }

    /**
     * @param {*} idV id du sommet dont on veut retrouver les voisins
     * @returns liste des voisins de idV
     */
    getEdges(idV){
        let v = this.vertices.get(idV);
        let vSet = this.edges.get(idV);
        let res = []
        if(vSet != undefined){
            vSet.forEach((i) =>{
                res.push(i)
            })
        }
        return res
    }

    /**
     * @param {*} a sommet a
     * @param {*} b sommet b
     * @returns distance entre a et b
     */
    distanceV(a, b){
        return this.vertices.get(a).distanceVertices(this.vertices.get(b))
    }


    /**
     * Permet d'insérer un sommet dans une liste classée par score
     * @param {*} vertex sommet à insérer
     * @param {*} queue liste classée dans laquelle on veut insérer vertex
     * @param {*} scoreMap hashmap des score associés à chaque sommet
     */
    addToPriorityQueue(vertex, queue, scoreMap){
        let score = scoreMap.get(vertex)
        for(let i = 0; i < queue.length; i++){
            if(scoreMap.get(queue[i]) > score){
                queue.splice(i, 0, vertex)
                return
            }
        }
        queue.push(vertex)
    }

    /**
     * permet de reconstruire le chemin le plus court à partir du hashmap associant chaque sommet à son sommet précédent
     * @param {*} cameFrom hashmap associant chaque sommet à son sommet précédent
     * @param {*} current sommet actuel
     * @returns le chemin le plus court
     */
    reconstructPath(cameFrom, current){
        let totalPath = []
        totalPath.push(current)
        while(cameFrom.has(current)){
            current = cameFrom.get(current)
            totalPath.unshift(current)
        }
        return totalPath
    }


    /**
     * algortihme A* permettant de retrouver le chemin le plus court entre deux sommet dans le graphe
     * @param {*} debut id du sommet de départ
     * @param {*} fin id du sommet d'arrivée
     * @returns chemin le plus court de debut à fin dans le graphe
     */
    aStar(debut, fin){
        let openSet = []
        openSet.push(debut)
        let cameFrom = new Map()
        let gScore = new Map()
        let fScore = new Map()
        for(const v of this.vertices.keys()){
            gScore.set(v, 700000)
            fScore.set(v, 700000)
        }
        gScore.set(debut, 0)
        fScore.set(debut, this.distanceV(debut, fin))

        while(openSet.length > 0){
            let current = openSet[0]
            // console.log(openSet)

            if(current == fin){
                // console.log(cameFrom)
                return this.reconstructPath(cameFrom, current)
            }
            openSet.shift()
            for(const neighbor of this.edges.get(current)){
                let tentative_gScore = gScore.get(current) + this.distanceV(current, neighbor)
                if(tentative_gScore < gScore.get(neighbor)){
                    cameFrom.set(neighbor, current)
                    gScore.set(neighbor, tentative_gScore)
                    fScore.set(neighbor, tentative_gScore + this.distanceV(neighbor, fin))
                    if(!openSet.includes(neighbor)){
                        this.addToPriorityQueue(neighbor, openSet, fScore)
                    }
                }
            }
        }

        return -1

    }

    /**
     * permet de trouver l'arête à laquelle appartient un sommet dans le graphe
     * @param {*} p sommet 
     * @returns arête contenant p dans le graphe
     */
    findEdge(p){
        for(const v of this.vertices.keys()){
            let neighbors = this.getEdges(v)
            // console.log(edges)
            for(let e of neighbors){
                const edge = new Edge(this.vertices.get(v), this.vertices.get(e))
                if(edge.containsPoint(p)) return [v, e]
            }
        }
        return null
    }


    /**
     * calcule le plus court chemin entre les coordonnées start et end s'ils appartiennent tous les deux à une arête du graphe
     * @param {*} start coordonnée de départ
     * @param {*} end coordonnée d'arrivée
     * @returns plus court chemin entre start et end
     */
    processBestPath(start, end){
        const startV = new Vertex(start[0], start[1], start[2])
        const endV = new Vertex(end[0], end[1], end[2])
        const e1 = this.findEdge(startV)
        const e2 = this.findEdge(endV)

        if(e1 == null || e2 == null) throw "point not in graph"

        this.edges.get(e1[0]).add(-1)
        this.edges.get(e1[1]).add(-1)
        this.edges.get(e2[0]).add(-2)
        this.edges.get(e2[1]).add(-2)

        this.vertices.set(-1, startV)
        this.vertices.set(-2, endV)
        this.edges.set(-1, [e1[0], e1[1]])
        this.edges.set(-2, [e2[0], e2[1]])

        // console.log(this.edges)

        let path = this.aStar(-1, -2)
        
        this.vertices.delete(-1)
        this.vertices.delete(-2)
        this.edges.delete(-1)
        this.edges.delete(-2)

        this.edges.get(e1[0]).delete(-1)
        this.edges.get(e1[1]).delete(-1)
        this.edges.get(e2[0]).delete(-2)
        this.edges.get(e2[1]).delete(-2)

        if(path == -1) throw "path not found"

        return path
    }

}