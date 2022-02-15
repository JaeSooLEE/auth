export class Vertex{
    constructor(x, y, z){
        this.x = x;
        this.y = y;
        this.z = z;
    }


    /**
     * Compare l'instance courante de Vertex à o
     * @param {*} o objet à comparer
     * @returns true si égalité, false sinon
     */
    equals(o){
        if( o == null){
            return false
        } 
        if(!o instanceof Vertex){
            return false
        } 
        if(this.x == o.x && this.y == o.y && this.z == o.z) return true
        return false
    }


    /**
     * calcule la distance entre un sommet v et l'instance courante de Vertex
     * @param {*} v Vertex dont on veut la distance à notre instance
     * @returns distance entre v et this
     */
    distanceVertices(v){
        let a = this.x - v.x
        let b = this.y - v.y
        let c = this.z - v.z
        return Math.sqrt(a*a + b*b + c*c)
    }


}