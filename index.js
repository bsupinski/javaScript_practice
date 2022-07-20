//Reverse hover
const reverseHover = () => {
    
    const navContainer = document.querySelector(".wrapper--navigation");
    const fade = function (e) {
        if( e.target.classList.contains("nav__item")) {
            const targetLink = e.target;
            const linkSiblings = targetLink.closest(".wrapper--navigation").querySelectorAll(".nav__item");

            linkSiblings.forEach( sibling => {
                if(sibling !== targetLink) {
                    sibling.style.opacity = this;
                };
            });
        };
    };

    navContainer.addEventListener("mouseover", fade.bind(0.3));
    navContainer.addEventListener("mouseout", fade.bind(1));
};

//Sticky Nav
const stickyNav = () => {
    const header = document.querySelector(".header");
    const stickyHere = document.querySelector(".home");

    const headerHeight = header.getBoundingClientRect().height;

    const stickyOptions = {
        root: null,
        threshold: 0,
        rootMargin: `-${headerHeight}px`,
    };

    const stickyNav = (entries) => {
        const entry = entries[0];
        if (!entry.isIntersecting) header.classList.add("sticky");
        else header.classList.remove("sticky");
    }

    const navObserver = new IntersectionObserver(stickyNav, stickyOptions);
    navObserver.observe(stickyHere);

}

//Smooth scroll navigation
const smoothScroll = () => {
    const navContainer = document.querySelector(".navigation")
    const sections = document.querySelectorAll("section")

    navContainer.addEventListener("click", (e) =>{
        e.preventDefault();
        sections.forEach(section => {
            if(section.id.toLocaleLowerCase() === e.target.textContent.toLocaleLowerCase()){
            document.querySelector(e.target.getAttribute("href")).scrollIntoView({behavior: "smooth"})
            };
        });
    });
};

//Content revealed on scroll
const revealonScroll = () => {
    const wrapperSections = document.querySelectorAll(".wrapper--section");

    const showSection = (entries, observer) => {
        const entry = entries[0];
        
        if(!entry.isIntersecting) return;

        entry.target.classList.remove("hide__section");
        observer.unobserve(entry.target);

    };

    const sectionOptions = {
        root: null,
        threshold: .25,
    };

    const sectionObserver = new IntersectionObserver(showSection,sectionOptions);

    wrapperSections.forEach(section => {
        sectionObserver.observe(section);
        section.classList.add("hide__section");
    });
    wrapperSections[0].classList.remove("hide__section");

};

//Slider component
const slider_component = () => {
    
    const slides = document.querySelectorAll(".slide");
    const leftButton = document.querySelector(".left__button");
    const rightButton = document.querySelector(".right__button");
    const dotContainer = document.querySelector(".dots__container")
    
    let currentSlide = 0;
    
    const maxSlides = slides.length;
    
    const goSlide = (goHere) => {
        slides.forEach((slide, index)=> {
            slide.style.transform=`translateX(${100 * (index - goHere)}%)`
        })
    }
    
    const nextSlide = () => {
        if ( currentSlide === maxSlides - 1)currentSlide = 0;
        else currentSlide ++;
        
        goSlide(currentSlide);
        activeDot(currentSlide);
    }
    
    const prevSlide = () => {
        if (currentSlide === 0) currentSlide = maxSlides - 1;
        else currentSlide--;
    
        goSlide(currentSlide);
        activeDot(currentSlide);
    }
    
    const makeDots = () => {
        slides.forEach((_, i)=> {
            dotContainer.insertAdjacentHTML("beforeend", `<button class="dot" data-slide="${i}"></button>`
            )
        })
    };
    
    const activeDot = (slide) => {
        document.querySelectorAll(".dot"). forEach(d => d.classList.remove("dot--active"));
    
        document.querySelector(`.dot[data-slide="${slide}"]`).classList.add("dot--active")
    
    };
    
    const init = () => {
        goSlide(0);
        makeDots();
        activeDot(0)
    };
    
    rightButton.addEventListener("click", nextSlide);
    leftButton.addEventListener("click", prevSlide);
    
    document.addEventListener("keydown", (e)=> {
        if(e.key === "ArrowLeft")prevSlide();
        if(e.key === "ArrowRight")nextSlide();
    })
    
    dotContainer.addEventListener("click", (e) =>{
        if( e.target.classList.contains("dot")) {
            const targetSlide = e.target.dataset.slide;
            goSlide(targetSlide);
            activeDot(targetSlide);
        }
    })
    
    init();
};

//Tab Component
const tabComponent = () => {
    const tabContainer = document.querySelector(".example__tab--container");
    const tabs = document.querySelectorAll(".example__tab");
    const content = document.querySelectorAll(".example__content");

    tabContainer.addEventListener("click", (e) => {
        const clicked = e.target.closest(".example__tab");

        tabs.forEach(tab => tab.classList.remove("example__tab--active")
        );
        clicked.classList.add("example__tab--active");


        content.forEach(c => c.classList.remove("example__content--active"))
        document.querySelector(`.example__content--${clicked.dataset.tab}`).classList.add("example__content--active");

    });
};

reverseHover();
stickyNav();
smoothScroll();
revealonScroll();
slider_component();
tabComponent();

