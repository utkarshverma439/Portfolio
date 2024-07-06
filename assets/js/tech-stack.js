async function fetchTechStackData() {
    const response = await fetch("tech-stack.json");
    const data = await response.json();
    return data;
}

function displayTechStack(tabs) {
    const techStackContainer = document.querySelector(".tech-stack .tech-stacks");
    let tabsHTML = '';
    let contentHTML = '';

    tabs.forEach((tab, index) => {
        const isActive = index === 0 ? 'active' : '';
        tabsHTML += `<button class="tab-button-tech ${isActive}" data-tab="${tab.id}">${tab.label}</button>`;

        let skillsHTML = '';
        tab.skills.forEach(skill => {
            skillsHTML += `
                <div class="skill-item">
                    <img src="${skill.image}" alt="${skill.name}">
                    <p>${skill.name}</p>
                </div>`;
        });

        contentHTML += `
            <div class="tab-content ${isActive}" id="${tab.id}">
                ${skillsHTML}
            </div>`;
    });

    techStackContainer.innerHTML = `
        <div class="tabs">
            ${tabsHTML}
        </div>
        ${contentHTML}
    `;

    // Add event listeners for tab buttons
    document.querySelectorAll('.tab-button-tech').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.tab-button-tech').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

            button.classList.add('active');
            document.getElementById(button.getAttribute('data-tab')).classList.add('active');
        });
    });

    // Initialize ScrollReveal and add animations
    if (typeof ScrollReveal !== 'undefined') {
        const srtop = ScrollReveal();
        srtop.reveal('.tech-stack .tabs', { interval: 200 });
        srtop.reveal('.tech-stack .tabs .skill-item', { delay: 400 });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    fetchTechStackData().then(data => {
        displayTechStack(data.tabs);
    });
});
