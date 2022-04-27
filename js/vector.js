import { View } from "/js/view.js";

class Vector {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        if (x === undefined || y === undefined || z === undefined) {
            this.x = 0;
            this.y = 0;
            this.z = 0;
        }
    }

    translate(other) {
        other.x += this.x;
        other.y += this.y;
        other.z += this.z;
    }

    reflect(other) {
        const dot = -2 * other.inner(this);
        other.x += dot * this.x;
        other.y += dot * this.y;
        other.z += dot * this.z;
    }
    
    perspective(view) {
        const p = 1 / (view.perspectiveDivide * -this.z);
        const aspect = view.width / view.height;
        const x_ = (this.x * p + aspect) * view.height / 2;
        const y_ = (-this.y * p + 1) * view.height / 2;
        
        return new Vector(x_, y_, this.z);
    }

    // Returns the inner (dot) product of this vector and another vector
    inner(other) {
        return this.x * other.x + this.y * other.y + this.z * other.z;
    }

    /* Takes the outer (wedge) product of this vector with another vector,
       then returns the orthogonal complement. This is equivalent to the
       cross product */
    outerComplement(other) {
        return new Vector(this.y * other.z - this.z * other.y,
                          this.z * other.x - this.x * other.z,
                          this.x * other.y - this.y * other.x);
    }

    normalize() {
        const invLen = 1 / Math.sqrt(this.inner(this));
        this.x *= invLen;
        this.y *= invLen;
        this.z *= invLen;
    }
}

export { Vector };