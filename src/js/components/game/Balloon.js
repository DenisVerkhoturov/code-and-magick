'use strict';

export default class Balloon
{
    /**
     * @param {string} text
     * @param {CanvasRenderingContext2D} context
     * @param {object} [options]
     * @param {number} options.[x]
     * @param {number} options.[y]
     * @param {number} options.[width]
     * @param {number} options.[height]
     * @param {number} options.[padding]
     * @param {number} options.[lineHeight]
     */
    constructor(text, context, options) {
        this.lines = [];
        this.context = context;
        this.points = [];

        const { height, width, x, y, lineHeight, padding } = options;
        console.log(height, width, x, y, lineHeight, padding);

        console.log(this);

        if (typeof this.width === 'undefined')
            this.width = this.context.canvas.clientWidth - this.padding * 2;

        this.lines = text.split(' ').reduce((lines, word) => {
            const line = lines.pop(),
                measurerLine = typeof line === 'undefined' ? word : line + ' ' + word;

            if (this.context.measureText(measurerLine).width > this.width)
                lines.push(line, word);
            else
                lines.push(measurerLine);

            return lines;
        }, []);

        if (typeof this.height === 'undefined')
            this.height = this.lines.length * this.lineHeight;

        if (typeof this.x === 'undefined')
            this.x = (this.context.canvas.clientWidth - this.width) / 2;

        if (typeof this.y === 'undefined')
            this.y = (this.context.canvas.clientHeight - this.height) / 2;

        this.points.push({ x: this.x, y: this.y });
        this.points.push({ x: this.x + this.width, y: this.y });
        this.points.push({ x: this.x + this.width, y: this.y + this.height });
        this.points.push({ x: this.x, y: this.y + this.height });

        this.points = this.points.map((point) => {
            point.x = point.x + Math.random() * this.padding - this.padding;
            point.y = point.y + Math.random() * this.padding - this.padding;
            console.log(point);
            return point;
        });

        console.log(this);
    }

    draw() {
        const oldFillStyle = this.context.fillStyle,
            oldStrokeStyle = this.context.strokeStyle;

        this.context.strokeStyle = '#000';
        this.context.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.context.beginPath();
        this.points.forEach((point) => this.context.lineTo(point.x, point.y));
        this.context.closePath();
        this.context.stroke();
        this.context.fill();

        this.context.fillStyle = '#FFF';
        this.context.beginPath();
        this.points.forEach((point) => this.context.lineTo(point.x, point.y));
        this.context.closePath();
        this.context.stroke();
        this.context.fill();

        this.context.fillStyle = '#000';
        this.lines.forEach((line, index) => this.context.fillText(line,
            this.x + ((this.width - this.context.measureText(line).width) / 2),
            this.y + (index * this.lineHeight) + (this.lineHeight / 2)
        ));

        this.move();

        this.context.fillStyle = oldFillStyle;
        this.context.strokeStyle = oldStrokeStyle;
    }
}
