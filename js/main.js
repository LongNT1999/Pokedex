const btn_menu = document.querySelector("#btn_menu");
const nav_menu = document.querySelector("header nav");
var btn_favorite;
const btn_close = "fa-xmark";
const show_menu = "show";
const had_favorite = "fa-solid";
const pink = "pink";

const base_API = "https://pokeapi.co/api/v2/";
const limit = 12;
const offset = 0;
const template = document.querySelector("#template");
const container = document.querySelector("#container");

// create Pokemon card
const createCard = function (name, image) {
    let content = template.content.querySelector(".card");
    let clone = document.importNode(content, true);

    clone.querySelector("span").textContent = name;
    clone.querySelector("img").src = image;
    clone.querySelector("img").alt = name;
    container.appendChild(clone);
};

// fetch Pokemom data
const fetchPokemonData = function (url) {
    fetch(url).then(function (response) {
        return response.json();
    }).then(function (data) {
        // console.log(data);
        createCard(data.name, data.sprites.front_default);
    }).catch(function (error) {
        console.log(error);
    });
};

// fetch list Pokemom data
const fetchPokemonList = function () {
    let link = base_API + 'pokemon?limit=' + limit + '&' + offset + '=' + offset;
    list_Pokemon = fetch(link).then(function (response) {
        // console.log(response);
        return response.json();
    }).then(function (data) {
        let arr = data.results;
        arr.forEach(function (e) {
            // console.log(e);
            fetchPokemonData(e.url);
        });
    }).catch(function (error) {
        console.log(error);
    });
};

fetchPokemonList();

// DOM event

window.onload = function () {
    var btn_favorite = document.querySelectorAll("card"); console.log(btn_favorite);
}


// // toggle btn menu
// btn_menu.addEventListener("click", function () {
//     btn_menu.classList.toggle(btn_close);
//     nav_menu.classList.toggle(show_menu);
// });

// // click btn favorite
// btn_favorite.forEach((e) => {
//     e.addEventListener("click", function () {
//         e.classList.toggle(had_favorite);
//         e.classList.toggle(pink);
//     });
// })