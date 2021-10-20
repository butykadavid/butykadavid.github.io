function clickSingleA(a)
{
    items = document.querySelectorAll('.navigation-link.active');

    if(items.length) 
    {
        items[0].className = 'navigation-link';
    }

    a.className = 'navigation-link active';
}