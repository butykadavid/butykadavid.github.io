var isMoving = false;
const titlesAll = ['introduction', 'mentality', 'programming']

$(document).bind("mousewheel DOMMouseScroll MozMousePixelScroll", function (event, delta) {
    if (isMoving) return;
    navigateTo(event);
});

function navigateTo(event) {
    isMoving = true;
    animControl(event)
    setTimeout(function () {
        isMoving = false;
    }, 2250);
}

function animControl(event) {
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