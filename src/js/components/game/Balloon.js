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
        const {
            padding = null,
            lineHeight = 16,
            height = null,
            width = null,
            x = null,
            y = null
        } = options;

        this.lines = [];
        this.context = context;
        this.points = [];
        this.lineHeight = lineHeight;
        this.padding = padding ? padding : 0;
        this.width = width ? width : context.canvas.clientWidth - this.padding * 2;

        this.lines = text.split(' ').reduce((lines, word) => {
            const line = lines.pop(),
                measuringLine = line ? word : line + ' ' + word;

            if (context.measureText(measuringLine).width > this.width)
                lines.push(line, word);
            else
                lines.push(measuringLine);

            return lines;
        }, this.lines);

        this.height = height ? height : this.lines.length * this.lineHeight - this.padding * 2;
        this.x = x ? x : (context.canvas.clientWidth - width) / 2;
        this.y = y ? y : (context.canvas.clientHeight - height) / 2;

        this.points.push({ x: x, y: this.y });
        this.points.push({ x: x + this.width, y: this.y });
        this.points.push({ x: x + this.width, y: this.y + this.height });
        this.points.push({ x: x, y: this.y + this.height });

        this.points = this.points.map((point) => {
            point.x = point.x + Math.random() * this.padding - this.padding;
            point.y = point.y + Math.random() * this.padding - this.padding;
            return point;
        });
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
