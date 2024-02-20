const btn_menu = document.querySelector("#btn_menu");
const nav_menu = document.querySelector("header nav");
var btn_favorite;
const btn_close = "fa-xmark";
const show_menu = "show";
const had_favorite = "fa-solid";
const pink = "pink";

const base_API = "https://pokeapi.co/api/v2/";
const limit = 30;
const offset = 0;
const template = document.querySelector("#template");
const container = document.querySelector("#container");
const type = document.querySelector("#type");

var count = 0;
const pagination = document.querySelector("#pagination");
const first_btn = '<<';
const previous_btn = '<';
const next_btn = '>';
const last_btn = '>>';

// create Pokemon card
const createCard = function (name, image, type) {
    let content = template.content.querySelector(".card");
    let clone = document.importNode(content, true);

    clone.querySelector("span").textContent = name;
    clone.querySelector("img").src = image;
    clone.querySelector("img").alt = name;
    clone.classList.add(type);
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
        console.log(data.id);
        createCard(data.name, data.sprites.front_default, data.types[0].type.name);
    }).catch(function (error) {
        console.log(error);
    });
};

// create pagination btn
const createPaginate = function (i) {
    let btn = document.createElement("button");
    let content = document.createTextNode(i);
    btn.appendChild(content);
    // btn.value = i;

    btn.addEventListener('click', () => {
        // console.log(btn.innerHTML);
        //clear all Pokemon in screen
        container.innerHTML = '';
        let n = limit * (parseInt(btn.innerHTML, 10) - 1);
        console.log(n);
        fetchPokemonList(limit, n);
    });

    pagination.appendChild(btn);
}

// fetch list Pokemom data
const fetchPokemonList = function (limit, offset) {
    let link = base_API + 'pokemon?limit=' + limit + '&offset' + '=' + offset;console.log(link);
    fetch(link).then(function (response) {
        // console.log(response);
        return response.json();
    }).then(function (data) {
        let arr = data.results;

        arr.forEach(function (e) {
            // console.log(e.url);
            fetchPokemonData(e.url);
        });

        // create page btn
        pagination.innerHTML = '';
        createPaginate(first_btn);
        createPaginate(previous_btn);
        count = Math.ceil(data.count / limit);
        for (let i = 0; i < count; i++) {
            createPaginate(i + 1);
        }
        createPaginate(next_btn);
        createPaginate(last_btn);
    }).catch(function (error) {
        console.log(error);
    });
};

fetchPokemonList(limit, offset);

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

// pagination
