let c = 0;

const _t = document.querySelectorAll(".secret__li");

_t.forEach((element) => {
    element.addEventListener("click", () => {
        c++;
        if (c % 7 === 0) window.location.href = "blog.html?login=true";
    });
});