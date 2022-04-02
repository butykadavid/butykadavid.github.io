var isMoving = false;
const titlesAll = ['introduction', 'mentality', 'programming']
const targetSection = document.querySelectorAll('.page')

console.log(targetSection)

$(document).on("mousewheel DOMMouseScroll MozMousePixelScroll", function(event, delta) {
    if (isMoving) return;
    navigateTo(event);
});

var ts;
$(targetSection).on('touchstart', function(e) {
    ts = e.originalEvent.touches[0].clientY;
});

$(targetSection).on('touchend', function(e) {

    if (navigator.userAgent.match(/Android/i)) { // if you already work on Android system, you can        skip this step
        e.preventDefault();
    }
    var te = e.originalEvent.changedTouches[0].clientY;
    if (ts > te + 5) {
        animControlTouchMove("down")
    } else if (ts < te - 5) {
        animControlTouchMove("up")
    }
});

function navigateTo(event) {
    isMoving = true;
    animControlMouseScroll(event)
    setTimeout(function() {
        isMoving = false;
    }, 2250);
}

function animControlMouseScroll(event) {
    const pages = document.querySelectorAll('.page')
    const title = document.querySelector('.page__title__text')

    console.log(event.originalEvent.wheelDelta)

    if (event.originalEvent.wheelDelta < 0) {
        for (let i = 0; i < pages.length; i++) {
            if (pages[i].classList.contains('anim__in') && i != (pages.length - 1)) {
                pages[i].classList.remove('anim__in')
                pages[i].classList.add('anim__out')
                pages[i + 1].classList.remove('anim__out')
                pages[i + 1].classList.add('anim__in')
                console.log('Out: ' + i)
                console.log('In: ' + (i + parseInt(1)))
                title.innerHTML = [titlesAll[i + 1]]
                return
            }
        }
    } else {
        for (let i = 0; i < pages.length; i++) {
            if (pages[i].classList.contains('anim__in') && i != 0) {
                pages[i].classList.remove('anim__in')
                pages[i].classList.add('anim__out')
                pages[i - 1].classList.remove('anim__out')
                pages[i - 1].classList.add('anim__in')
                console.log('Out: ' + i)
                console.log('In: ' + (i - parseInt(1)))
                title.innerHTML = [titlesAll[i - 1]]
                return
            }
        }
    }
}

function animControlTouchMove(direction) {
    const pages = document.querySelectorAll('.page')
    const title = document.querySelector('.page__title__text')

    if (direction === "down") {
        for (let i = 0; i < pages.length; i++) {
            if (pages[i].classList.contains('anim__in') && i != (pages.length - 1)) {
                pages[i].classList.remove('anim__in')
                pages[i].classList.add('anim__out')
                pages[i + 1].classList.remove('anim__out')
                pages[i + 1].classList.add('anim__in')
                console.log('Out: ' + i)
                console.log('In: ' + (i + parseInt(1)))
                title.innerHTML = [titlesAll[i + 1]]
                return
            }
        }
    } else {
        for (let i = 0; i < pages.length; i++) {
            if (pages[i].classList.contains('anim__in') && i != 0) {
                pages[i].classList.remove('anim__in')
                pages[i].classList.add('anim__out')
                pages[i - 1].classList.remove('anim__out')
                pages[i - 1].classList.add('anim__in')
                console.log('Out: ' + i)
                console.log('In: ' + (i - parseInt(1)))
                title.innerHTML = [titlesAll[i - 1]]
                return
            }
        }
    }
}