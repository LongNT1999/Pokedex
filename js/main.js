const btn_menu = document.querySelector("#btn_menu");
const nav_menu = document.querySelector("header nav");console.log(nav_menu);
const btn_close = "fa-xmark";
const show_menu = "show";

// DOM event
btn_menu.addEventListener ("click", function() {
    btn_menu.classList.toggle(btn_close);
    nav_menu.classList.toggle(show_menu);
});