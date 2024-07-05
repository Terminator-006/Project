document.addEventListener('DOMContentLoaded', function() {
    const female = document.getElementById('female');
    const slider1 = document.getElementById('slide1');
    const male = document.getElementById('male');
    const slider2 = document.getElementById('slide2');

    let isDragging = false;
    let activeSlider = null;

    // Prevent default drag behavior for images
    const images = document.querySelectorAll('img');
    images.forEach(image => {
        image.addEventListener('dragstart', function(event) {
            event.preventDefault();
        });
    });

    function startDrag(slider) {
        isDragging = true;
        activeSlider = slider;
    }

    function moveDrag(event) {
        if (isDragging && activeSlider) {
            const sliderRect = activeSlider.getBoundingClientRect();
            const moveX = (event.touches ? event.touches[0].clientX : event.clientX) - sliderRect.left;

            if (moveX > sliderRect.width / 2) {
                if (activeSlider === slider1) {
                    slider1.style.display = 'none';
                    slider2.style.display = 'flex';
                    female.style.display = 'none';
                    male.style.display = 'flex';
                    slider2.style.padding = '16px 16px 24px 0';
                } else if (activeSlider === slider2) {
                    slider2.style.display = 'none';
                    slider1.style.display = 'flex';
                    male.style.display = 'none';
                    female.style.display = 'flex';
                    slider1.style.padding = '16px';
                }
                isDragging = false;
                activeSlider = null;
            }
        }
    }

    function endDrag() {
        isDragging = false;
        activeSlider = null;
    }

    function handleDrag(slider) {
        slider.addEventListener('mousedown', function() {
            startDrag(slider);
        });

        slider.addEventListener('touchstart', function() {
            startDrag(slider);
        });
    }

    document.addEventListener('mousemove', function(event) {
        moveDrag(event);
    });

    document.addEventListener('touchmove', function(event) {
        moveDrag(event);
    });

    document.addEventListener('mouseup', function() {
        endDrag();
    });

    document.addEventListener('touchend', function() {
        endDrag();
    });

    handleDrag(slider1);
    handleDrag(slider2);
});
