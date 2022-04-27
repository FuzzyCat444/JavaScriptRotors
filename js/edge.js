import { Geometry } from "/js/geometry.js";
import { Point } from "/js/point.js";

class Edge extends Geometry {
    constructor(p0, p1) {
        super();
        
        this.p0 = p0;
        this.p1 = p1;
        
        this.size = 2;
        this.color = "#000000";
        this.pointSize = 7;
        this.pointColor = "#000000";
    }
    
    clone() {
        const e = new Edge(this.p0.clone(), this.p1.clone());
        e.size = this.size;
        e.color = this.color;
        return e;
    }
    
    translate(vector) {
        super.translate(vector);
        this.p0.translate(vector);
        this.p1.translate(vector);
    }
    
    reflect(vector) {
        super.reflect(vector);
        this.p0.reflect(vector);
        this.p1.reflect(vector);
    }
    
    rotate(rotor) {
        super.rotate(rotor);
        this.p0.rotate(rotor);
        this.p1.rotate(rotor);
    }
    
    set pointSize(size) {
        this.p0.size = size;
        this.p1.size = size;
    }
    
    set pointColor(color) {
        this.p0.color = color;
        this.p1.color = color;
    }
    
    render(ctx, view) {
        const p0_ = this.p0.perspective(view);
        const p1_ = this.p1.perspective(view);
        
        ctx.beginPath();
        ctx.moveTo(p0_.x, p0_.y);
        ctx.lineTo(p1_.x, p1_.y);
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.size;
        ctx.stroke();
        
        this.p0.render(ctx, view);
        this.p1.render(ctx, view);
    }
}

export { Edge };