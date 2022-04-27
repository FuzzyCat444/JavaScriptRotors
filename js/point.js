import { Geometry } from "/js/geometry.js";
import { Vector } from "/js/vector.js";

class Point extends Geometry {
    constructor(x, y, z) {
        super();
        
        this.vector = new Vector(x, y, z);
        
        this.color = "#000000";
        this.size = 7;
    }
    
    clone() {
        const p = new Point(this.vector.x, this.vector.y, this.vector.z);
        p.color = this.color;
        p.size = this.size;
        return p;
    }
    
    translate(vector) {
        super.translate(vector);
        vector.translate(this.vector);
    }
    
    reflect(vector) {
        super.reflect(vector);
        vector.reflect(this.vector);
    }
    
    rotate(rotor) {
        super.rotate(rotor);
        rotor.rotate(this.vector);
    }
    
    render(ctx, view) {
        const projected = this.vector.perspective(view);
        
        ctx.beginPath();
        ctx.arc(projected.x, projected.y, this.size / 2, 0, Math.PI * 2, true);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}

export { Point };