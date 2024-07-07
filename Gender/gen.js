document.addEventListener('DOMContentLoaded', function() {
    const female = document.getElementById('female');
    const slider1 = document.getElementById('slide1');
    const male = document.getElementById('male');
    const slider2 = document.getElementById('slide2');
    const nextButton = document.getElementById('next-button');

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
        if (activeSlider === slider1) {
            male.style.display = 'flex';
            slider2.style.display = 'flex';
        } else if (activeSlider === slider2) {
            female.style.display = 'flex';
            slider1.style.display = 'flex';
        }
    }

    function moveDrag(event) {
        if (isDragging && activeSlider) {
            const sliderRect = activeSlider.getBoundingClientRect();
            const moveX = (event.touches ? event.touches[0].clientX : event.clientX) - sliderRect.left;

            if (activeSlider === slider1) {
                slider2.style.transform = `translateX(${moveX}px)`;
                male.style.transform = `translateX(${moveX}px)`;
            } else if (activeSlider === slider2) {
                slider1.style.transform = `translateX(${moveX}px)`;
                female.style.transform = `translateX(${moveX}px)`;
            }
        }
    }

    function endDrag() {
        isDragging = false;
        if (activeSlider === slider1) {
            male.style.display = 'none';
            slider2.style.display = 'none';
            slider2.style.transform = 'translateX(0)';
            male.style.transform = 'translateX(0)';
        } else if (activeSlider === slider2) {
            female.style.display = 'none';
            slider1.style.display = 'none';
            slider1.style.transform = 'translateX(0)';
            female.style.transform = 'translateX(0)';
        }

        const sliderRect = activeSlider.getBoundingClientRect();
        const moveX = sliderRect.right - sliderRect.left;

        if (moveX > sliderRect.width / 2) {
            if (activeSlider === slider1) {
                slider1.style.display = 'none';
                slider2.style.display = 'flex';
                female.style.display = 'none';
                male.style.display = 'flex';
            } else if (activeSlider === slider2) {
                slider2.style.display = 'none';
                slider1.style.display = 'flex';
                male.style.display = 'none';
                female.style.display = 'flex';
            }
            nextButton.disabled = false;  // Enable the "Next" button
            nextButton.style.opacity = '1';  // Fully opaque
            nextButton.style.cursor = 'pointer';  // Change cursor to pointer
        }
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
