

class CanvasState {
    ctx = null;


}

export class Line {
    sx = 0;
    sy = 0;
    ex = 0;
    ey = 0;
    headlen = 12;
    theta = 20;
    width = 2;
    color = "rgba(230, 230, 230)";
    ctx: any = null;

    constructor(value: { ctx: any, sx: number, sy: number, ex: number, ey: number }) {
        this.ctx = value.ctx;
        this.sx = value.sx;
        this.sy = value.sy;
        this.ex = value.ex;
        this.ey = value.ey;
    }

    renderAngle() {
        const angle =
            (Math.atan2(this.ey - this.sy, this.ex - this.sx) * 180) / Math.PI,
            angle1 = ((angle + this.theta) * Math.PI) / 180,
            angle2 = ((angle - this.theta) * Math.PI) / 180,
            topX = this.headlen * Math.cos(angle1),
            topY = this.headlen * Math.sin(angle1),
            botX = this.headlen * Math.cos(angle2),
            botY = this.headlen * Math.sin(angle2);

        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.moveTo(this.sx, this.sy);
        this.ctx.lineTo(this.ex, this.ey);
        let arrowX = this.ex - topX;
        let arrowY = this.ey - topY;
        this.ctx.moveTo(arrowX, arrowY);
        this.ctx.lineTo(this.ex, this.ey);
        arrowX = this.ex - botX;
        arrowY = this.ey - botY;
        this.ctx.lineTo(arrowX, arrowY);
        this.ctx.strokeStyle = this.color;
        this.ctx.lineWidth = this.width;
        this.ctx.stroke();
        this.ctx.restore();
    }

    render() {
        this.ctx.beginPath();
        this.ctx.moveTo(this.sx, this.sy);
        this.ctx.lineTo(this.ex, this.ey);
        const angle = Math.atan((this.ey - this.sy) / (this.ex - this.ey))
        this.ctx.stroke();
        this.ctx.strokeStyle = this.color;
        this.ctx.lineWidth = this.width;
        this.ctx.closePath();
    }

    update(v: { color: string, width: number }) {
        this.color = v.color;
        this.width = v.width;
    }
}


