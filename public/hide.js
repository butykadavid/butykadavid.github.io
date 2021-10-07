var HideBrand = function(){
    var parent = document.getElementByClassName('navbar-brand')[0];
    var brand = parent.getElementByID('brand');

    brand.style.display = 'none';
};

var HideSocial = function(){
    var parent = document.getElementByClassName('socialMedia')[0];
    var social = parent.getElementByID('social');

    social.style.display = 'none';
};