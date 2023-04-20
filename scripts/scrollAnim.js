var isMoving = false;
const titlesAll = ['introduction', 'mentality', 'programming']
const targetSection = document.querySelectorAll('.page__content')

$(document).on("mousewheel DOMMouseScroll MozMousePixelScroll", function (event, delta) {
    if (isMoving) return;
    navigateTo(event);
});

// touchscreen stuff
// -----
var ts;
$(targetSection).on('touchstart', function (e) {
    ts = e.originalEvent.touches[0].clientY;
});

$(targetSection).on('touchend', function (e) {

    // making sure it acts the same way on an android phone
    // (some touch events [like this one], work differently on iOS and Android, that's why it is needed)
    // -----
    if (navigator.userAgent.match(/Android/i)) {
        e.preventDefault();
    }
    // -----

    var te = e.originalEvent.changedTouches[0].clientY;
    if (ts > te + 5) {
        animControlTouchMove("down")
    } else if (ts < te - 5) {
        animControlTouchMove("up")
    }
});
//-----

// setting timeout for the mousewheel event, 
// otherwise it triggers the animation multiple times on one mousescroll.
function navigateTo(event) {
    isMoving = true;
    animControlMouseScroll(event)
    setTimeout(function () {
        isMoving = false;
    }, 2250);
}

// operating the page with mousewheel
function animControlMouseScroll(event) {
    const pages = document.querySelectorAll('.page')
    const title = document.querySelector('.page__title__text')

    //console.log(event.originalEvent.wheelDelta)

    if (event.originalEvent.wheelDelta < 0) {
        for (let i = 0; i < pages.length; i++) {
            if (pages[i].classList.contains('anim__in') && i != (pages.length - 1)) {
                pages[i].classList.remove('anim__in')
                pages[i].classList.add('anim__out')
                pages[i + 1].classList.remove('anim__out')
                pages[i + 1].classList.add('anim__in')
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
                title.innerHTML = [titlesAll[i - 1]]
                return
            }
        }
    }
}

// operating the page in case of touchscreens
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
                title.innerHTML = [titlesAll[i - 1]]
                return
            }
        }
    }
}

// operating the page with the arrows (chevrons)
function animControlChevron(triggerElement) {
    if (triggerElement == "d") {
        const pages = document.querySelectorAll('.page')
        const title = document.querySelector('.page__title__text')

        for (let i = 0; i < pages.length; i++) {
            if (pages[i].classList.contains('anim__in') && i != (pages.length - 1)) {
                pages[i].classList.remove('anim__in')
                pages[i].classList.add('anim__out')
                pages[i + 1].classList.remove('anim__out')
                pages[i + 1].classList.add('anim__in')
                title.innerHTML = [titlesAll[i + 1]]
                return
            }
        }
    }
    else {
        const pages = document.querySelectorAll('.page')
        const title = document.querySelector('.page__title__text')

        for (let i = 0; i < pages.length; i++) {
            if (pages[i].classList.contains('anim__in') && i != 0) {
                pages[i].classList.remove('anim__in')
                pages[i].classList.add('anim__out')
                pages[i - 1].classList.remove('anim__out')
                pages[i - 1].classList.add('anim__in')
                title.innerHTML = [titlesAll[i - 1]]
                return
            }
        }
    }
}