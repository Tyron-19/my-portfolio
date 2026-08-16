// ===============================
// Theme Toggle
// ===============================

const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    const icon = themeToggle.querySelector("i");

    if(document.body.classList.contains("dark")){
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
    }else{
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
    }

});


// ===============================
// Color Palette
// ===============================

const paletteBtn = document.getElementById("palette-btn");
const colorPicker = document.getElementById("color-picker");

paletteBtn.addEventListener("click", () => {
    colorPicker.classList.toggle("active");
});

document.querySelectorAll(".color").forEach(color => {

    color.addEventListener("click", () => {

        const selected = color.dataset.color;

        document.documentElement.style.setProperty("--accent", selected);

        colorPicker.classList.remove("active");

    });

});


// Close palette when clicking outside
document.addEventListener("click", (e) => {

    if(!paletteBtn.contains(e.target) &&
       !colorPicker.contains(e.target)){

        colorPicker.classList.remove("active");

    }

});


// ===============================
// Mobile Menu
// ===============================

const menuToggle = document.getElementById("menu-toggle");
const mobileNav = document.querySelector("header nav");

menuToggle.addEventListener("click", () => {
    mobileNav.classList.toggle("active");
});

document.querySelectorAll(".nav-list a").forEach(link => {

    link.addEventListener("click", () => {
        mobileNav.classList.remove("active");
    });

});

document.addEventListener("click", (e) => {

    if(!mobileNav.contains(e.target) &&
       !menuToggle.contains(e.target)){

        mobileNav.classList.remove("active");

    }

});


// ===============================
// Active Navigation
// ===============================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-list a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const top = section.offsetTop - 120;
        const height = section.offsetHeight;

        if(pageYOffset >= top){
            current = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if(link.getAttribute("href") === "#" + current){
            link.classList.add("active");
        }

    });

});


// ===============================
// Header Background
// ===============================

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if(window.scrollY > 50){

        header.style.padding = "14px 10%";
        header.style.boxShadow = "0 10px 30px rgba(0,0,0,.08)";

    }else{

        header.style.padding = "18px 10%";
        header.style.boxShadow = "none";

    }

});


// ===============================
// Fade Animation
// ===============================

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("fade-up");

        }

    });

},{
    threshold:0.2
});

document.querySelectorAll(
".about-card,.skill-card,.project-card,.certificate-card"
).forEach(item=>observer.observe(item));


// ===============================
// Back To Top
// ===============================
const topButton = document.getElementById("backToTop");

window.addEventListener("scroll",()=>{

    if(window.scrollY>500){

        topButton.classList.add("show");

    }else{

        topButton.classList.remove("show");

    }

});

topButton.addEventListener("click",()=>{

    window.scrollTo({

        top:0,
        behavior:"smooth"

    });

});
// ===============================
// Premium Hero Typing
// ===============================

const typingElement = document.getElementById("typing");

const words = [
    "Web Applications",
    "Responsive Designs",
    "Modern Interfaces",
    "Creative Solutions"
];

let wordIndex = 0;
let letterIndex = 0;
let deleting = false;

function type() {

    const current = words[wordIndex];

    if (!deleting) {

        typingElement.textContent = current.substring(0, letterIndex + 1);
        letterIndex++;

        if (letterIndex === current.length) {

            deleting = true;

            setTimeout(type, 1800);

            return;
        }

    } else {

        letterIndex--;
        typingElement.textContent = current.substring(0, letterIndex);

        if (letterIndex === 0) {

            deleting = false;

            wordIndex = (wordIndex + 1) % words.length;

            setTimeout(type, 500);

            return;
        }

    }

    setTimeout(type, deleting ? 35 : 110);

}

type();


// ===============================
// Video Modal
// ===============================

const videoModal = document.getElementById("videoModal");
const videoModalPlayer = document.getElementById("videoModalPlayer");
const videoModalClose = document.getElementById("videoModalClose");

document.querySelectorAll(".video-trigger").forEach(trigger => {

    trigger.addEventListener("click", (e) => {

        e.preventDefault();

        videoModalPlayer.src = trigger.dataset.video;
        videoModal.classList.add("active");
        videoModalPlayer.play();

    });

});

function closeVideoModal(){

    videoModal.classList.remove("active");
    videoModalPlayer.pause();
    videoModalPlayer.removeAttribute("src");
    videoModalPlayer.load();

}

videoModalClose.addEventListener("click", closeVideoModal);

videoModal.addEventListener("click", (e) => {

    if(e.target === videoModal){
        closeVideoModal();
    }

});

document.addEventListener("keydown", (e) => {

    if(e.key === "Escape" && videoModal.classList.contains("active")){
        closeVideoModal();
    }

});