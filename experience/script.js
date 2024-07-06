$(document).ready(function () {
    // Set default mode to 'day-mode' or 'night-mode'
    const defaultMode = 'day-mode'; // Change to 'night-mode' for night mode by default
    const body = document.body;
    const modeToggleImg = document.getElementById('mode-toggle-img');

    body.classList.add(defaultMode);
    if (defaultMode === 'day-mode') {
        modeToggleImg.src = '/assets/images/sun.png';
    } else {
        modeToggleImg.src = '/assets/images/moon.png';
    }

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }
    });
});

/* ===== SCROLL REVEAL ANIMATION ===== */
const srtop = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 1000,
    reset: true
});

document.getElementById('mode-toggle').addEventListener('click', () => {
    const body = document.body;
    const isDayMode = body.classList.contains('day-mode');
    const modeToggleImg = document.getElementById('mode-toggle-img');

    if (isDayMode) {
        body.classList.remove('day-mode');
        body.classList.add('night-mode');
        modeToggleImg.src = '/assets/images/moon.png';
    } else {
        body.classList.remove('night-mode');
        body.classList.add('day-mode');
        modeToggleImg.src = '/assets/images/sun.png';
    }
});

// Disable developer mode
document.onkeydown = function (e) {
    if (e.keyCode == 123) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        return false;
    }
};

document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === "visible") {
        document.title = "Experience | Portfolio Utkarsh Verma";
        $("#favicon").attr("href", "/assets/images/favicon.png");
    } else {
        document.title = "Come Back To Portfolio";
        $("#favicon").attr("href", "/assets/images/favhand.png");
    }
});

// Fetch and display experience data
async function fetchExperienceData() {
    const response = await fetch("/experience.json");
    const data = await response.json();
    return data;
}

function displayExperience(experiences) {
    const timeline = document.querySelector(".timeline");
    let experienceHTML = "";
    experiences.forEach(exp => {
        experienceHTML += `
        <div class="container ${exp.side}">
          <div class="content">
            <div class="tag">
              <h2>${exp.company}</h2>
            </div>
            <div class="desc">
                <h3>${exp.position}</h3>
                <p>${exp.duration}</p>
            </div>
          </div>
        </div>`;
    });
    timeline.innerHTML = experienceHTML;
}

document.addEventListener("DOMContentLoaded", () => {
    fetchExperienceData().then(data => {
        displayExperience(data);
        // Add ScrollReveal animations
        srtop.reveal('.experience .timeline', { delay: 400 });
        srtop.reveal('.experience .timeline .container', { interval: 400 });
    });
});
