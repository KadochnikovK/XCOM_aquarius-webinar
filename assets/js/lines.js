class LineConnector {
    constructor() {
        this.svg = null;
        this.resizeTimeout = null;
        this.animationFrameId = null;
        this.init();
    }

    init() {
 
        this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.svg.setAttribute('class', 'connector-lines');

     
        const scheduleSection = document.querySelector('.schedule');
        if (scheduleSection) {
            scheduleSection.appendChild(this.svg);
        }

   
        this.drawLines();
        this.setupListeners();
    }

    drawLines() {
     
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }

        this.svg.innerHTML = '';

    
        const dots = document.querySelectorAll('.schedule__dot');
        if (dots.length < 2) return;

        const points = [];
        dots.forEach(dot => {
            const rect = dot.getBoundingClientRect();
            const container = this.svg.parentElement.getBoundingClientRect();

            points.push({
                x: rect.left + rect.width / 2 - container.left,
                y: rect.top + rect.height / 2 - container.top
            });
        });

        for (let i = 0; i < points.length - 1; i++) {
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', points[i].x);
            line.setAttribute('y1', points[i].y);
            line.setAttribute('x2', points[i + 1].x);
            line.setAttribute('y2', points[i + 1].y);
            line.setAttribute('class', 'connector-line');
            this.svg.appendChild(line);
        }
    }

    setupListeners() {

        window.addEventListener('resize', () => {
            // clearTimeout(this.resizeTimeout);
            // this.resizeTimeout = setTimeout(() => {
            this.animationFrameId = requestAnimationFrame(() => this.drawLines());
            // }, 400);
        });

        // Перерисовка при скролле
        window.addEventListener('scroll', () => {
            this.animationFrameId = requestAnimationFrame(() => this.drawLines());
        });
    }

    redraw() {
        this.drawLines();
    }
}


document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        window.lineConnector = new LineConnector();
    }, 100);
});