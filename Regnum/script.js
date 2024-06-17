document.addEventListener('DOMContentLoaded', function() {
    var video = document.getElementById('vid');
    video.playbackRate = 0.5; // Slow motion effect
});


//backend
document.getElementById('waitlistForm').addEventListener('submit', function(event) {
    console.log("Form submitted");
    event.preventDefault(); 
    const email = document.getElementById('email').value;
    document.getElementById('email').value = "";

    fetch("https://regnum-backend-bice.vercel.app/join-waitlist", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert('Email submitted successfully!');
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error in submitting mail!');
    });
});