const INCERTITUDE = 0.1

export class Edge{

 

    constructor(dep, arr){
        this.dep = dep;
        this.arr = arr;
    }

    /**
     * compare l'instance courant de Edge à o
     * @param {*} o objet de comparaison 
     * @returns true si égal, false sinon
     */
    equals(o){
        if( o == null) return false
        if(!o instanceof Edge) return false
        if(this.dep == o.dep && this.arr == o.arr) return true
        return false
    }


    /**
     * teste si p appartient à l'instance courant de Edge
     * @param {*} p sommet à tester
     * @returns true si p appartenance, false sinon
     */
    containsPoint(p){
        if(p.distanceVertices(this.dep) + p.distanceVertices(this.arr) - this.dep.distanceVertices(this.arr) <= INCERTITUDE ) return true
        return false
    }
}