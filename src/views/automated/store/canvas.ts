
import { Line } from './draw';
import { Node } from './node'

export class Canvas {

    width = 0;
    height = 0;
    canvas = null as any;
    context = null as any;

    constructor(value: { canvas: any, context: any }) {
        this.canvas = value.canvas;
        this.context = value.context;
        if (this.canvas) {
            this.width = this.canvas.width;
            this.height = this.canvas.height;
        }
    }

    clearRect() {
        return this.context && this.context.clearRect(0, 0, this.width, this.height);
    }

    canvasRepaint(n: Node, seek?: { x: number, y: number }) {
        if (this.canvas && this.context) {
            this.clearRect();
            n.children.forEach((c: Node) => {
                this.repaint(c, seek || { x: 0, y: 0 });
            })
        }
    }

    repaint(n: Node, seek: { x: number, y: number }) {
        const fx = n.pos.x;
        const fy = n.pos.y;
        n.children.forEach((c: Node) => {
            const line = new Line({
                ctx: this.context,
                sx: fx + 25 + seek.x,
                sy: fy + 25 + seek.y,
                ex: c.pos.x + 25 + seek.x,
                ey: c.pos.y + 25 + seek.y,
            });
            let radius = 25;
            const an = Math.atan2(line.sy - line.ey, line.sx - line.ex) * Math.PI / 180;
            if (line.sy > line.ey) { radius = -radius }
            line.ex += Math.sin(an) * radius;
            line.ey -= Math.cos(an) * radius;
            line.renderAngle();
            this.repaint(c, seek);
        })
    }
}