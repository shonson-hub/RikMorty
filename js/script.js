// Перевод

const VARIABLES = [
    {
        male: "Мужской",
        female: "Женский"
    },
    {
        human: "Человек",
        alien: "Инопланетянин",
        robot: "Робот",
        humanoid: "Гуманойд"
    },
    {
        aliveMale: 'Жив',
        aliveFemale: 'Жива',
        deadMale: 'Мёртв',
        deadFemale: "Мёртва",
        unknown: 'Неизвестно'
    },
    {
        green: "rgba(58, 223, 33, 0.84)",
        yellow: "rgb(247, 155, 43)",
        red: "rgba(216, 38, 35, 0.84)"
    },
    {
        citadel: "Цитадель Риков",
        anatomy: "Анатомический парк",
        cable: "Межпространственное ТВ",
        earth: "Земля (запасной вариант)",
        c137: "Земля(С-137)"
    }
];

const keyChar = 'https://rickandmortyapi.com/api/character';

const charList = document.querySelector('.content__list');
const charTemplate = document.querySelector('#item__char').content.querySelector('.content__item');
const nextButton = document.querySelector('.next__button');
const prevButton = document.querySelector('.prev__button');
const bigAvatar = document.querySelector('.aside__content img');
const bigName = document.querySelector('.aside__content h3');
const bigGender = document.querySelector('.item__gender');
const bigSpecies = document.querySelector('.item__species');
const bigOrigin = document.querySelector('.item__origin');
const bigLocation = document.querySelector('.item__location');
const bigStatus = document.querySelector('.item__status-big');
const currentPage = document.querySelector('.pages__counter .current');
const totlaPage = document.querySelector('.pages__counter .total');
const asideEpisodes = document.querySelector('.aside__episodes');
const episodeTemplate = document.querySelector('#episode__item').content.querySelector('.aside__episode');

// Получаем данные

getData(keyChar);

async function getData (key) {
    const resp = await fetch(key);
    const respData = await resp.json();
    let chars = respData.results;
    console.log(chars);
    console.log(respData.info);
    totlaPage.textContent = respData.info.pages
    charList.innerHTML = '';
    getChars(chars);
}

//  Отрисовка списка персонажей

function getChars (data) {
    data.forEach((char) => {
        const charCards = document.createDocumentFragment();
        const charCard = charTemplate.cloneNode(true);
        charCard.querySelector('.item__img').src = char.image;
        charCard.querySelector('.item__name').textContent = char.name;
        charCard.querySelector('.item__origin').textContent = char.origin.name;
        if (char.origin.name == 'unknown') {
            charCard.querySelector('.item__origin').textContent = VARIABLES[2].unknown;
        } else if (char.origin.name == 'Earth (C-137)') {
            charCard.querySelector('.item__origin').textContent = VARIABLES[4].c137;
        } else if (char.origin.name == 'Earth (Replacement Dimension)') {
            charCard.querySelector('.item__origin').textContent = VARIABLES[4].earth;
        }
        charCard.querySelector('.item__location').textContent = char.location.name;
        if (char.location.name == 'unknown') {
            charCard.querySelector('.item__location').textContent = VARIABLES[2].unknown;
        } else if (char.location.name == "Anatomy Park") {
            charCard.querySelector('.item__location').textContent = VARIABLES[4].anatomy;
        } else if (char.location.name == "Citadel of Ricks") {
            charCard.querySelector('.item__location').textContent = VARIABLES[4].citadel;
        } else if (char.location.name == "Interdimensional Cable") {
            charCard.querySelector('.item__location').textContent = VARIABLES[4].cable;
        } else if (char.location.name == "Earth (Replacement Dimension)") {
            charCard.querySelector('.item__location').textContent = VARIABLES[4].earth;
        } else if (char.location.name == "Earth (C-137)") {
            charCard.querySelector('.item__location').textContent = VARIABLES[4].c137;
        }
        charCard.querySelector('.item__status').textContent = char.status;
        if (char.status == 'unknown') {
            charCard.querySelector('.item__status').textContent = VARIABLES[2].unknown;
            charCard.querySelector('.item__status').style.color = VARIABLES[3].yellow;
        } else if ( char.status == "Alive" ) {
            charCard.querySelector('.item__status').style.color = VARIABLES[3].green;
            if (char.gender == "Male") {
                charCard.querySelector('.item__status').textContent = VARIABLES[2].aliveMale;
            } else {
                charCard.querySelector('.item__status').textContent =  VARIABLES[2].aliveFemale;
            }
        } else {
            charCard.querySelector('.item__status').style.color = VARIABLES[3].red;
            if (char.gender == "Male") {
                charCard.querySelector('.item__status').textContent = VARIABLES[2].deadMale;
            } else {
                charCard.querySelector('.item__status').textContent = VARIABLES[2].deadFemale;
            }
        };
        charCards.appendChild(charCard);
        charList.appendChild(charCards);

        charCard.addEventListener('mouseover', () => {
            cursor.classList.add('active');
            cloud.textContent = charCard.textContent;
        });
        charCard.addEventListener('mouseout', () => {
            cursor.classList.remove('active');
        });

        getBigPicture(charCard,char);

        // const chars = charList.querySelectorAll('.content__item');
        // chars.forEach((char) => {
        //     char.addEventListener('click', (e) => {
        //         console.log(char)

        //     })

        // })
    });
};

//  Отрисовка персонажа в досье с большой пикчей

function getBigPicture (info,item) {
    let gender,
        species,
        origin,
        status;
    let location = item.location.name;

    item.gender == "Male" ? gender = VARIABLES[0].male : gender = VARIABLES[0].female;
    item.species == "Human" ? species = VARIABLES[1].human : species = VARIABLES[1].alien;
    item.origin.name == 'unknown' ? origin = 'Неизвестно' : origin = item.origin.name;
    item.origin.name == 'unknown' ? origin = 'Неизвестно' : origin = item.origin.name;

    if (item.status == 'unknown') {
        status = VARIABLES[2].unknown;
    } else if ( item.status == "Alive" ) {
        if (item.gender == "Male") {
            status = VARIABLES[2].aliveMale;
        } else {
            status = VARIABLES[2].aliveFemale
        }
    } else {
        if (item.gender == "Male") {
            status = VARIABLES[2].deadMale;
        } else {
            status = VARIABLES[2].deadFemale;
        }
    };

    info.addEventListener('click', (e) => {
        bigAvatar.src = info.querySelector('.item__img').src;
        bigName.textContent = info.querySelector('.item__name').textContent;
        bigGender.textContent = gender;
        bigSpecies.textContent = species;
        bigOrigin.textContent = origin;
        bigLocation.textContent = location;
        bigStatus.textContent = status;

        const episodes = item.episode;
        asideEpisodes.innerHTML = '';

        episodes.forEach((episode) => {
            const items = document.createDocumentFragment();
            const item = episodeTemplate.cloneNode(true);
            item.querySelector('span').textContent = episode.slice(40,item.length);
            items.appendChild(item);
            asideEpisodes.appendChild(items);
        });
    });
};

// Переключатель страниц

let counter = 1;

function getNext() {
    return function() {
        if (counter >= totlaPage.textContent) {
            return counter = totlaPage.textContent;
        }
      return counter++;
    };
}

function getPrev() {
    return function() {
        if (counter <= 1) {
            return counter = 1;
        }
        return counter--;
    };
}

const nextPage = getNext();
const prevPage = getPrev();

nextButton.addEventListener('click', function() {
    nextPage();
    getData(keyChar + `?page=${counter}`);
    currentPage.textContent = counter;
});

prevButton.addEventListener('click', function() {
    prevPage();
    getData(keyChar + `?page=${counter}`);
    currentPage.textContent = counter;
});

// SWIPER

const swiper = new Swiper(".mySwiper", {
    speed: 600,
    parallax: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
});

// CURSOR

const body = document.querySelector('body');
const cloud = document.querySelector('.cloud');
const cursor = document.querySelector('.cursor');
const links = document.querySelectorAll('a');

let mouseX = 0, mouseY = 0, posX = 0, posY = 0;

function mouseCoords(e) {
    mouseX = e.pageX
    mouseY = e.pageY
};

gsap.to({}, .01, {
    repeat: -1,
    onRepeat: () => {
        posX += (mouseX - posX) /20
        if (mouseX > posX) {
            cursor.classList.remove('cursor-rev');
        } else {
            cursor.classList.add('cursor-rev');
        }
        posY += (mouseY - posY) /20
        gsap.set(cursor, {
            css: {
                left: posX + 20 + "px",
                top: posY
            }
        })
    }
});

links.forEach((link) => {
    link.addEventListener('mouseover', () => {
		cursor.classList.add('active');
        console.log(link.textContent)
        cloud.textContent = link.textContent;
	});
	link.addEventListener('mouseout', () => {
		cursor.classList.remove('active');
        cloud.textContent = '';
	});
})

body.addEventListener('mousemove', e => {
    mouseCoords(e);
    cursor.classList.remove('hidden');
});
body.addEventListener('mouseout', e => {
    cursor.classList.add('hidden');
});

// showMe();
// dontShow();

function showMe () {
    setTimeout(function(){ cloud.textContent = "Show me what you got!";cursor.classList.add('active'); }, 2000);
};

function dontShow () {
    setTimeout(function(){ cursor.classList.remove('active'); }, 4000);
};

setInterval(showMe, 10000);
setInterval(dontShow, 10000);