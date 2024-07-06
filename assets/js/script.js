$(document).ready(function () {
    // Set default mode to 'day-mode' or 'night-mode'
    const defaultMode = 'day-mode'; // Change to 'night-mode' for night mode by default
    const body = document.body;
    const modeToggleImg = document.getElementById('mode-toggle-img');

    body.classList.add(defaultMode);
    if (defaultMode === 'day-mode') {
        modeToggleImg.src = 'assets/images/sun.png';
    } else {
        modeToggleImg.src = 'assets/images/moon.png';
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

        // scroll spy
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    // smooth scrolling
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top,
        }, 500, 'linear')
    });

    // emailjs to mail contact form data
    $("#contact-form").submit(function (event) {
        emailjs.init("user_TTDmetQLYgWCLzHTDgqxm");

        emailjs.sendForm('contact_service', 'template_contact', '#contact-form')
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                document.getElementById("contact-form").reset();
                alert("Form Submitted Successfully");
            }, function (error) {
                console.log('FAILED...', error);
                alert("Form Submission Failed! Try Again");
            });
        event.preventDefault();
    });

});

document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === "visible") {
        document.title = "Portfolio | Utkarsh Verma";
        $("#favicon").attr("href", "assets/images/favicon.png");
    }
    else {
        document.title = "Come Back To Portfolio";
        $("#favicon").attr("href", "assets/images/favhand.png");
    }
});

var typed = new Typed(".typing-text", {
    strings: ["artificial intelligence", "Machine Learning", "Data Science", "backend development"],
    loop: true,
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 500,
});

VanillaTilt.init(document.querySelectorAll(".tilt"), {
    max: 15,
});

async function fetchData() {
    let response = await fetch("./projects/projects.json")
    const data = await response.json();
    return data;
}

function showProjects(projects) {
    let projectsContainer = document.querySelector("#projects .box-container");
    let projectHTML = "";
    projects.slice(0, 10).filter(project => project.category != "android").forEach(project => {
        projectHTML += `
        <div class="box tilt">
        <img  draggable="false" src="${project.image}" alt="${project.name}">
      <div class="content">
        <div class="tag">
        <h3>${project.name}</h3>
        </div>
        <div class="desc">
          <p>${project.desc}</p>
          <div class="btns">
            <a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>
            <a href="${project.links.code}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>
          </div>
        </div>
      </div>
    </div>`
    });
    projectsContainer.innerHTML = projectHTML;

    VanillaTilt.init(document.querySelectorAll(".tilt"), {
        max: 15,
    });

    const srtop = ScrollReveal({
        origin: 'top',
        distance: '80px',
        duration: 1000,
        reset: true
    });

    srtop.reveal('.project .box', { interval: 200 });
}

fetchData("projects").then(data => {
    showProjects(data);
});

VanillaTilt.init(document.querySelectorAll(".tilt"), {
    max: 15,
});

async function fetchExperienceData() {
    const response = await fetch("experience.json");
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
        srtop.reveal('.experience .timeline', { delay: 400 });
        srtop.reveal('.experience .timeline .container', { interval: 400 });
    });
});

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
}

const srtop = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 1000,
    reset: true
});

srtop.reveal('.home .content h3', { delay: 200 });
srtop.reveal('.home .content p', { delay: 200 });
srtop.reveal('.home .content .btn', { delay: 200 });

srtop.reveal('.home .image', { delay: 400 });
srtop.reveal('.home .linkedin', { interval: 600 });
srtop.reveal('.home .github', { interval: 800 });
srtop.reveal('.home .instagram', { interval: 600 });

srtop.reveal('.about .content h3', { delay: 200 });
srtop.reveal('.about .content .tag', { delay: 200 });
srtop.reveal('.about .content p', { delay: 200 });
srtop.reveal('.about .content .box-container', { delay: 200 });
srtop.reveal('.about .content .resumebtn', { delay: 200 });

srtop.reveal('.tech-stack .container', { interval: 200 });
srtop.reveal('.tech-stack .container .skill-item', { delay: 400 });

srtop.reveal('.education .box', { interval: 200 });

srtop.reveal('.project .box', { interval: 200 });

srtop.reveal('.contact .container', { delay: 400 });
srtop.reveal('.contact .container .form-group', { delay: 400 });

document.getElementById('mode-toggle').addEventListener('click', () => {
    const body = document.body;
    const isDayMode = body.classList.contains('day-mode');
    const modeToggleImg = document.getElementById('mode-toggle-img');
    
    if (isDayMode) {
        body.classList.remove('day-mode');
        body.classList.add('night-mode');
        modeToggleImg.src = 'assets/images/moon.png';
    } else {
        body.classList.remove('night-mode');
        body.classList.add('day-mode');
        modeToggleImg.src = 'assets/images/sun.png'; 
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab-button-tech');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(content => content.classList.remove('active'));

            tab.classList.add('active');
            document.getElementById(tab.dataset.tab).classList.add('active');
        });
    });
});
