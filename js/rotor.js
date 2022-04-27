
class Rotor {
    constructor(axis, angle) {
    	this.xy = axis.z;
    	this.yz = axis.x
    	this.zx = axis.y;
        this.c = Math.cos(angle / 2);
        this.s = Math.sin(angle / 2);
    }

    rotate(vector) {
        const i = this.zx * vector.x - this.yz * vector.y;
        const j = this.xy * vector.y - this.zx * vector.z;
        const k = this.yz * vector.z - this.xy * vector.x;
        const l = this.yz * vector.x + this.zx * vector.y + this.xy * vector.z;
        const c2 = this.c * this.c;
        const s2 = this.s * this.s;
        const _2sc = 2 * this.s * this.c;

        const vx = c2 * vector.x + 
            s2 * (this.yz * l + this.xy * k - this.zx * i) - 
            _2sc * j;
        const vy = c2 * vector.y +
            s2 * (this.zx * l + this.yz * i - this.xy * j) -
            _2sc * k;
        const vz = c2 * vector.z +
            s2 * (this.xy * l + this.zx * j - this.yz * k) -
            _2sc * i;

        vector.x = vx;
        vector.y = vy;
        vector.z = vz;
    }
}

export { Rotor };