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
const type = document.querySelector("#type");

// create Pokemon card
const createCard = function (name, image) {
    let content = template.content.querySelector(".card");
    let clone = document.importNode(content, true);

    clone.querySelector("span").textContent = name;
    clone.querySelector("img").src = image;
    clone.querySelector("img").alt = name;
    container.appendChild(clone);

    clone.addEventListener("click", function () {
        clone.querySelector("i").classList.toggle(had_favorite);
        clone.querySelector("i").classList.toggle(pink);
    });
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
    fetch(link).then(function (response) {
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

// create type button
const createTypeBtn = function (name) {
    let btn = document.createElement("button");
    let content = document.createTextNode(name);
    btn.appendChild(content);
    btn.classList.add(name);
    type.appendChild(btn);
}

// fetch Pokemon Type
const fetchType = function (url) {
    fetch(url).then((response) => {
        return response.json();
    }).then((data) => {
        // console.log(data);
        createTypeBtn(data.name);
    })
}

// fetch list Pokemon Type
const fetchPokemonType = function () {
    let link = base_API + 'type';
    fetch(link).then((response) => {
        return response.json();
    }).then((data) => {
        let arr = data.results;
        arr.forEach((e) => {
            // console.log(e.url);
            fetchType(e.url);
        });
    }).catch((error) => {
        console.log(error);
    });
};

fetchPokemonType();

// DOM event

// toggle btn menu
btn_menu.addEventListener("click", function () {
    btn_menu.classList.toggle(btn_close);
    nav_menu.classList.toggle(show_menu);
});

// // click btn favorite
// btn_favorite.forEach((e) => {
//     e.addEventListener("click", function () {
//         e.classList.toggle(had_favorite);
//         e.classList.toggle(pink);
//     });
// })