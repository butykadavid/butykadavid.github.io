window.addEventListener('load', function () {
    const navItems = document.querySelectorAll('.navig__item');
    const URL = window.location.href;
    const splitUrl = URL.split('/');

    if (splitUrl[splitUrl.length - 1] === 'index.html' || !URL.includes('/')) {
        navItems[0].classList.add('active');
        navItems[4].classList.add('active');
    } else if (splitUrl[splitUrl.length - 1] === 'about.html') {
        navItems[1].classList.add('active');
        navItems[5].classList.add('active');
    } else if (splitUrl[splitUrl.length - 1] === 'contact.html') {
        navItems[2].classList.add('active');
    }  else if (splitUrl[splitUrl.length - 1] === 'projects.html') {
        navItems[3].classList.add('active');
        navItems[7].classList.add('active');
        console.log('active: projects')
    }
    
})