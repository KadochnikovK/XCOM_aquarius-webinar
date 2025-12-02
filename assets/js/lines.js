class LineConnector {
    constructor() {
        this.svg = null;
        this.resizeTimeout = null;
        this.animationFrameId = null;
        this.init();
    }

    init() {
        // Создаем SVG
        this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.svg.setAttribute('class', 'connector-lines');

        // Вставляем в секцию schedule
        const scheduleSection = document.querySelector('.schedule');
        if (scheduleSection) {
            scheduleSection.appendChild(this.svg);
        }

        // Первая отрисовка
        this.drawLines();

        // Настройка событий
        this.setupListeners();
    }

    drawLines() {
        // Отменяем предыдущий кадр анимации
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }

        // Очищаем SVG
        this.svg.innerHTML = '';

        // Находим все точки
        const dots = document.querySelectorAll('.schedule__dot');
        if (dots.length < 2) return;

        // Собираем позиции точек в порядке их следования
        const points = [];
        dots.forEach(dot => {
            const rect = dot.getBoundingClientRect();
            const container = this.svg.parentElement.getBoundingClientRect();

            points.push({
                x: rect.left + rect.width / 2 - container.left,
                y: rect.top + rect.height / 2 - container.top
            });
        });

        // Рисуем линии между точками
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
        // Ресайз с задержкой
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

    // Ручная перерисовка
    redraw() {
        this.drawLines();
    }
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        window.lineConnector = new LineConnector();
    }, 100);
});