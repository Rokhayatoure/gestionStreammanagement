const slides = [
    { type: 'image', content: '/images/image1.jpg' },
    { type: 'image', content: '/images/image2.jpg' },
    { type: 'image', content: '/images/image3.jpg' },
]

let slideNum = 0

const img = document.getElementById('slide')
const spots = document.querySelectorAll('.spots')
const logos = document.querySelectorAll('#logos')

let img_src = img.src
function renderSlide() {
    img_src = slides[slideNum].content
    img.src = img_src
}

function changeSlide(move) {
    slideNum += move;

    if (slideNum >= slides.length)
        slideNum = 0;
    if (slideNum < 0)
        slideNum = slides.length - 1;
    
    renderSlide();
}

setInterval(() => changeSlide(1), 3000);

spots.forEach(spot => {
    spot.addEventListener('mouseover', ()=> {
        spot.classList.add('cursor-pointer')
    })

    spot.addEventListener('mouseout', ()=> {
        spot.classList.remove('cursor-pointer')
    })
})

logos.forEach(logo => {
    logo.addEventListener('mouseover', ()=> {
        logo.classList.add('rotate-10')
    })

    logo.addEventListener('mouseup', ()=> {
        logo.classList.remove('rotate-0')
    })
})

function setDots(dots, pos) {
    console.log(pos)
    dots.forEach(dot => {
        dot.classList.remove('current')
    })
    dots[pos - 1].classList.add('current')
}
