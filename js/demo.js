import { Point } from "/js/point.js";
import { Edge } from "/js/edge.js";
import { Polyhedron } from "/js/polyhedron.js";
import { Vector } from "/js/vector.js";
import { Rotor } from "/js/rotor.js";
import { View } from "/js/view.js";

class Demo {
	constructor(div) {
		this.div = div;
        
        this.canvas = document.createElement("canvas");
        this.canvas.style.display = "block";
        div.appendChild(this.canvas);
        this.ctx = this.canvas.getContext("2d");
        
        this.cube = new Polyhedron(
            [
                new Point(-1, -1, -1),
                new Point(1, -1, -1),
                new Point(1, 1, -1),
                new Point(-1, 1, -1),
                new Point(-1, -1, 1),
                new Point(1, -1, 1),
                new Point(1, 1, 1),
                new Point(-1, 1, 1)
            ],
            [
                { indices: [0, 1, 2, 3], color: "rgba(255, 0, 0, 0.5)" }, // back
                { indices: [0, 3, 7, 4], color: "rgba(0, 0, 255, 0.5)" }, // left
                { indices: [1, 2, 6, 5], color: "rgba(0, 0, 255, 0.5)" }, // right
                { indices: [4, 5, 6, 7], color: "rgba(255, 0, 0, 0.5)" }, // front
                { indices: [0, 1, 5, 4], color: "rgba(0, 255, 0, 0.5)" }, // bottom
                { indices: [3, 2, 6, 7], color: "rgba(0, 255, 0, 0.5)" } // top
            ]
        );
        this.angle = 0;
        
        const self = this;
        setInterval(function() {
            self.update();
            self.render();
        }, 16);
	}

	update() {
		this.angle += 0.01;
	}

	render() {
		const divStyle = window.getComputedStyle(this.div);
		const width = parseFloat(divStyle.getPropertyValue('width'));
		const height = parseFloat(divStyle.getPropertyValue('height'));
		this.canvas.width = width;
        this.canvas.height = height;
        
        this.ctx.fillStyle = "#f5f5f5";
        this.ctx.fillRect(0, 0, width, height);
        
        const view = new View(width, height, 1);
        
		const clone = this.cube.clone();
		const axis = new Vector(1, 1, 1);
		axis.normalize();
        clone.rotate(new Rotor(axis, this.angle));
        clone.translate(new Vector(-2, 0, -3.7));
        const clone2 = clone.clone();
        clone2.reflect(new Vector(1, 0, 0));
        clone.render(this.ctx, view);
        clone2.render(this.ctx, view);
	}
}

const contentDiv = document.getElementById("content-div");

const demo = new Demo(contentDiv);

setInterval(function() {
	const aspect = 3 / 2;
	const pad = 0.9;
	const windowWidth = window.innerWidth * pad;
	const windowHeight = window.innerHeight * pad;

	let width, height;

	if (windowWidth > aspect * windowHeight) {
		height = windowHeight;
		width = height * aspect;
	} else {
		width = windowWidth;
		height = width / aspect;
	}

	contentDiv.style.width = width + "px";
	contentDiv.style.height = height + "px";
	contentDiv.style.marginLeft = (window.innerWidth - width) / 2.0 + "px";
	contentDiv.style.marginTop = (window.innerHeight - height) / 2.0 + "px";
}, 16);