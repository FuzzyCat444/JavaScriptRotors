import { Geometry } from "/js/geometry.js";
import { Point } from "/js/point.js";

class Polyhedron extends Geometry {
    // faces: list of { indices, color }
    constructor(points, faces) {
        super();
        
        this.points = points;
        this.faces = faces;
        
        this.pointSize = 7;
        this.edgeSize = 2;
        this.pointColor = "#000000";
        this.edgeColor = "#000000";
    }
    
    clone() {
        const points = [];
        for (let i = 0; i < this.points.length; i++) {
            points.push(this.points[i].clone());
        }
        const faces = [];
        for (let i = 0; i < this.faces.length; i++) {
            const face = this.faces[i];
            faces.push({ indices: face.indices.slice(), color: face.color });
        }
        const p = new Polyhedron(points, faces);
        p.edgeSize = this.edgeSize;
        p.edgeColor = this.edgeColor;
        return p;
    }
    
    translate(vector) {
        super.translate(vector);
        for (let i = 0; i < this.points.length; i++) {
            this.points[i].translate(vector);
        }
    }
    
    reflect(vector) {
        super.reflect(vector);
        for (let i = 0; i < this.points.length; i++) {
            this.points[i].reflect(vector);
        }
    }
    
    rotate(rotor) {
        super.rotate(rotor);
        for (let i = 0; i < this.points.length; i++) {
            this.points[i].rotate(rotor);
        }
    }
    
    set pointSize(size) {
        for (let i = 0; i < this.points.length; i++) {
            this.points[i].size = size;
        }
    }
    
    set pointColor(color) {
        for (let i = 0; i < this.points.length; i++) {
            this.points[i].color = color;
        }
    }
    
    render(ctx, view) {
        for (let i = 0; i < this.faces.length; i++) {
            const face = this.faces[i];
            const color = face.color;
            ctx.beginPath();
            for (let j = 0; j < face.indices.length; j++) {
                const p = this.points[face.indices[j]];
                const p_ = p.vector.perspective(view);
                if (j === 0) {
                    ctx.moveTo(p_.x, p_.y);
                } else {
                    ctx.lineTo(p_.x, p_.y);
                }
            }
            ctx.closePath();
            ctx.fillStyle = color;
            ctx.fill();
            ctx.strokeStyle = this.edgeColor;
            ctx.lineWidth = this.edgeSize;
            ctx.stroke();
            for (let j = 0; j < face.indices.length; j++) {
                const p = this.points[face.indices[j]];
                p.render(ctx, view);
            }
        }
    }
}

export { Polyhedron };