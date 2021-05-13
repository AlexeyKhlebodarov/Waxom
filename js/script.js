//BurgerMenu

function burgerMenu(selector) {
    let menu = document.querySelector(selector);
    let button = document.querySelector('.burger-menu__button');
    let links = document.querySelectorAll('.burger-menu__link');

    button.addEventListener('click', (e) => {
        e.preventDefault();
        toggleMenu();
    });

    links.forEach(link => link.addEventListener('click', () => toggleMenu()));

    function toggleMenu() {
        menu.classList.toggle('burger-menu_active');
        if (menu.classList.contains('burger-menu_active')) {
            document.querySelector('body').style.overflow = "hidden";
        } else {
            document.querySelector('body').style.overflow = "visible";
        }
    }
}

burgerMenu('.burger-menu');

//HeaderSlider

let slider = document.querySelector('.slider');
let pointsParent = document.querySelector('.header-dots');
let points = document.querySelectorAll('.header-dots__item');
let sliderLeft = document.querySelector('.header-arrows__left');
let sliderRight = document.querySelector('.header-arrows__right');
let slideIndex = 0;


sliderLeft.addEventListener('click', function scrollLeft() {
    points[slideIndex].classList.remove('header-dots__item_active');
    if (slideIndex == 0) {
        slideIndex = points.length;
    }
    slideIndex--;
    points[slideIndex].classList.add('header-dots__item_active');
    slider.style.background = `url("images/intro${slideIndex}.jpg") center / cover fixed no-repeat`;
    sliderIntervalCleaner();
});

function scrollRight() {
    slideIndex++;
    points[slideIndex - 1].classList.remove('header-dots__item_active');
    if (slideIndex == points.length) {
        slideIndex = 0;
    }
    points[slideIndex].classList.add('header-dots__item_active');
    slider.style.background = `url("images/intro${slideIndex}.jpg") center / cover fixed no-repeat`;
};

sliderRight.addEventListener('click', function () {
    scrollRight();
    sliderIntervalCleaner();
});

let sliderInterval = setInterval(scrollRight, 5000);
function sliderIntervalCleaner() {
    clearInterval(sliderInterval);
    sliderInterval = setInterval(scrollRight, 5000);
}

pointsParent.addEventListener('click', function (e) {
    const node = e.target.parentNode;
    slideIndex = [...node.children].indexOf(e.target);
    points.forEach(point => point.classList.remove('header-dots__item_active'));
    points[slideIndex].classList.add('header-dots__item_active');
    slider.style.background = `url("images/intro${slideIndex}.jpg") center / cover fixed no-repeat`;
    sliderIntervalCleaner();
});


//Tabs

function openTab() {
    let tabcontent = document.querySelectorAll(".project-content__item");
    let tablinks = document.querySelectorAll(".project-filter__item");

    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].addEventListener('click', function () {
            tablinks.forEach(tablink => tablink.classList.remove("project-filter__item_active"));
            tablinks[i].classList.add("project-filter__item_active");
            tabcontent.forEach(item => item.style.display = "none");
            if (i == 0) {
                tabcontent.forEach(tab => tab.style.display = "block");
            } else {
                tabcontent[i].style.display = "block";
            }
        });
    }
}
openTab();


//Video

let video = document.querySelector("#video");
let videoPlay = document.querySelector("#videoPlay");
let videoText = document.querySelector(".video-text");

videoPlay.addEventListener("click", function () {
    videoText.style.display = "none";
    video.setAttribute("controls", "");
    video.play();
});

//PostSlider

let postSlider = document.querySelector('.post-slider');
let postInner = document.querySelector('.post-slider__inner');
let postSlides = document.querySelectorAll('.post-slider__item');
let tablet = window.matchMedia("(max-width: 768px)");
let postCounter = 0;

function postInit() {
    postWidth = postSlider.offsetWidth;
    postInner.style.width = postWidth * postSlides.length + 'px';
    postSlides.forEach(item => {
        if (!tablet.matches) {
            item.style.width = postWidth / 3 + 'px';
        } else if (tablet.matches) {
            item.style.width = postWidth + 'px';
        }
        item.style.height = 'auto';
        item.style.padding = '0 5px';
    });
}

postInit();
window.addEventListener('resize', postInit);

document.querySelector('.post-arrows__left').addEventListener('click', function () {
    postCounter--;
    if (postCounter < 0 && !(tablet.matches)) {
        postCounter = postSlides.length / 3 - 1;
    } else if (postCounter < 0 && tablet.matches) {
        postCounter = postSlides.length - 1;
    }
    postInner.style.transform = `translate(-${postCounter * postWidth}px)`;
});

document.querySelector('.post-arrows__right').addEventListener('click', function () {
    postCounter++;
    if (postCounter >= postSlides.length / 3 && !(tablet.matches)) {
        postCounter = 0;
    } else if (postCounter >= postSlides.length && tablet.matches) {
        postCounter = 0;
    }
    postInner.style.transform = `translate(-${postCounter * postWidth}px)`;
});
