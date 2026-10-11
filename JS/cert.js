class ImageSlider {
    constructor(selector) {
        this.slider = document.querySelector(selector);
        this.track = this.slider.querySelector('.slider-wrapper');
        this.slides = Array.from(this.track.children);
        this.dotsContainer = this.slider.querySelector('.slider-dots');
        this.dots = [];
        this.currentIndex = 0;
        this.autoSlideInterval = null;
        this.init();
    }

    init() {
        this.createDots();
        this.bindEvents();
        this.updateSlidePosition();
        this.startAutoSlide();
    }

       updateSlidePosition() {
        // Measures the exact real-time pixel dimension bounds of the frame window window
        const slideWidth = this.slider.offsetWidth;
        const offset = -this.currentIndex * slideWidth;
        
        // Shifts the view using hard pixel values to eliminate white margins entirely
        this.track.style.transform = `translateX(${offset}px)`;
        this.updateDots();
    }


    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        this.updateSlidePosition();
    }

    prevSlide() {
        this.currentIndex = this.currentIndex > 0
            ? this.currentIndex - 1
            : this.slides.length - 1;
        this.updateSlidePosition();
    }

    startAutoSlide() {
        this.stopAutoSlide();
        // Self-calling loop function execution every 5000ms (5 seconds)
        this.autoSlideInterval = setInterval(() => this.nextSlide(), 5000);
    }

    stopAutoSlide() {
        clearInterval(this.autoSlideInterval);
        this.autoSlideInterval = null;
    }

    bindEvents() {
        // Pause auto-sliding on hover, resume on mouse leave
        this.slider.addEventListener('mouseenter', () => this.stopAutoSlide());
        this.slider.addEventListener('mouseleave', () => this.startAutoSlide());

        // Connect manual next/previous navigation arrow actions
        const nextBtn = this.slider.querySelector('.next');
        const prevBtn = this.slider.querySelector('.prev');

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                this.nextSlide();
                this.startAutoSlide(); // Reset auto-slide countdown timer
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                this.prevSlide();
                this.startAutoSlide(); // Reset auto-slide countdown timer
            });
        }
    }

    createDots() {
        this.dotsContainer.innerHTML = '';
        this.dots = [];

        // Dynamically creates navigation dot indicators based on total slide count
        this.slides.forEach((slide, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.addEventListener('click', () => {
                this.currentIndex = index;
                this.updateSlidePosition();
                this.startAutoSlide(); // Reset auto-slide countdown timer
            });
            this.dotsContainer.appendChild(dot);
            this.dots.push(dot);
        });
    }

    updateDots() {
        // Cycles through and highlights the currently viewing active indicator dot
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ImageSlider('#portfolioSlider');
});
