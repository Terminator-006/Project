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

    function handleDrag(slider, hide1, show1, hide2, show2) {
        slider.addEventListener('mousedown', function() {
            isDragging = true;
            activeSlider = slider;
        });
    }

    document.addEventListener('mousemove', function(event) {
        if (isDragging && activeSlider) {
            const sliderRect = activeSlider.getBoundingClientRect();
            const moveX = event.clientX - sliderRect.left;

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
    });

    document.addEventListener('mouseup', function() {
        isDragging = false;
        activeSlider = null;
    });

    handleDrag(slider1, slider1, slider2, female, male);
    handleDrag(slider2, slider2, slider1, male, female);
});
