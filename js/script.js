// ---------------- VARIABLES ---------------- //
const time = document.querySelector('.time');
const dateBlock = document.querySelector('.date');
let day;

const greeting = document.querySelector('.greeting');
const greetingContainer = document.querySelector('.greeting-container');
const inputName = document.querySelector('.greeting-container .name');
const body = document.querySelector('body');

const slidePrev = document.querySelector('.slide-prev');
const slideNext = document.querySelector('.slide-next');
let randomNum = Math.round(Math.random() * 20);
const github = document.querySelector('.github');
const unsplash = document.querySelector('.unsplash');
const flickr = document.querySelector('.flickr');
const tagUnsplash = document.querySelector('.input-unsplash');
const tagFlickr = document.querySelector('.input-flickr');

const weather = document.querySelector('.weather');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.weather .city');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');

const quoterContainer = document.querySelector('.quoter-container');
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');

const buttonRu = document.querySelector('.translator-ru');
const buttonEn = document.querySelector('.translator-en');
const footer = document.querySelector('footer');

const titleSettingsLanguage = document.querySelector('.settings-language');
const titleSettingsBackgroundSource = document.querySelector('.settings-background-sourse');
const titleSettingsMusicSource = document.querySelector('.settings-music-sourse');
const titleSettingsShowHideBlocks = document.querySelector('.settings-show-hide-blocks');
const titleSettingsLinks = document.querySelector('.settings-links');

const settingsOpenBtn = document.querySelector('.settings-hide');
const arrowShowHideSettings = document.querySelector('.settings-hide img');
const settingsContainer = document.querySelector('.settings-container');
const playerShowHide = document.querySelector('.block-player');
const timeShowHide = document.querySelector('.block-time');
const dateShowHide = document.querySelector('.block-date');
const greetingShowHide = document.querySelector('.block-greeting');
const weatherShowHide = document.querySelector('.block-weather');
const quoteShowHide = document.querySelector('.block-quotes');
const toDoListShowHide = document.querySelector('.block-todolist');
const arrayBlocks = [playerShowHide, timeShowHide, dateShowHide, greetingShowHide, weatherShowHide, quoteShowHide, toDoListShowHide];
const musicForkStorageLink = document.querySelector('.fork');
const task = document.querySelector('.task');

const todolistContainer = document.querySelector('.todolist-container');
const todolistInputContainer = document.querySelector('.todolist-input-container');
const inputShowHideTodolist = document.querySelector('.todolist-show-hide');
const arrowShowHideTodolist = document.querySelector('.todolist-arrow');
const showHideBlocksValue = document.querySelector('.show-hide-blocks-value');
const todolist = document.querySelector('.todolist');
const todolistInput = document.querySelector('.todolist-input');
const plusIcon = document.querySelector('.plusIcon');
const todolistList = document.querySelector('.todolist-list');
const todolistItem = document.querySelectorAll('.todolist-item');
const smallcross = document.querySelectorAll('.smallcross');
const nowPlayingText = document.querySelector('.now-playing');
let classNumberItem = 0;
let classNumberImg = 0;
let arrayListItems = [];

// ---------------- TIME ---------------- //
function showTime() {
    const date = new Date();
    let currentTime;
    if (buttonEn.classList.contains('isEnabled')) {
        currentTime = date.toLocaleTimeString('en-En');
    } else {
        currentTime = date.toLocaleTimeString('ru-Ru')
    }
    time.textContent = currentTime;
    setTimeout(showTime, 1000);
    if (buttonEn.classList.contains('isEnabled')) {
        showDate('en-En');
    } else {
        showDate('ru-Ru');
    }
    showGreeting();
}
showTime();

function showDate(lang) {
    const date = new Date();
    const options = { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC' };
    const currentDate = date.toLocaleDateString(lang, options);
    dateBlock.textContent = currentDate;
}

function getTimeOfDay() {
    const date = new Date();
    const hours = date.getHours();

    if (hours < 6) { return day = 'night' };
    if (hours >= 6 && hours < 12) { return day = 'morning' };
    if (hours >= 12 && hours < 18) { return day = 'day' };
    if (hours >= 18 && hours < 24) { return day = 'evening' };
}

// ---------------- GREETING ---------------- //
const greetingTranslation = {
    morning: {
        en: 'Good morning,',
        ru: 'Доброе утро,',
    },
    day: {
        en: 'Good day,',
        ru: 'Добрый день,',
    },
    evening: {
        en: 'Good evening,',
        ru: 'Добрый вечер,',
    },
    night: {
        en: 'Good night,',
        ru: 'Доброй ночи,',
    }
}

function showGreeting() {

    if (buttonEn.classList.contains('isEnabled')) {
        greeting.textContent = `Good ${getTimeOfDay()},`
    } else {
        greeting.textContent = greetingTranslation[day].ru;
    }

    buttonEn.addEventListener('click', () => {
        greeting.textContent = `Good ${getTimeOfDay()},`
    });

    buttonRu.addEventListener('click', () => {
        greeting.textContent = greetingTranslation[day].ru;
    });

}

// ---------------- BACKGROUND ---------------- //
function startBackgroundImage() {
    let bgNum;
    String(randomNum).length === 1 ? bgNum = '0' + String(randomNum) : bgNum = randomNum;
    if (randomNum === 0) {
        body.style.background = `url("https://raw.githubusercontent.com/MaestroFront/momentum-storage/assets/images/${getTimeOfDay()}/01.webp") center/cover, rgba(0, 0, 0, 0.5)`;
    };
}
startBackgroundImage();

function removeClassIsEnabled(item) { item.classList.remove('isEnabled') };
function addClassIsEnabled(item) { item.classList.add('isEnabled') };

function changeBtnOfBackgroundStorage(item1, item2, item3, boolean1, boolean2, tag) {
    removeClassIsEnabled(item1);
    removeClassIsEnabled(item2);
    addClassIsEnabled(item3);

    tagFlickr.disabled = boolean1;
    tagUnsplash.disabled = boolean2;

    tag.style.opacity = '.6';
}

github.addEventListener('click', () => {
    changeBtnOfBackgroundStorage(unsplash, flickr, github, true, true);
})

unsplash.addEventListener('click', () => {
    changeBtnOfBackgroundStorage(flickr, github, unsplash, true, false, tagUnsplash);
})

flickr.addEventListener('click', () => {
    changeBtnOfBackgroundStorage(unsplash, github, flickr, false, true, tagFlickr);
})

function doAfterClickEnterOnBtnOfImgStorage(btn) {
    btn.addEventListener('keydown', (e) => {
        if (e.code === 'Enter') {
            getSlideNext();
        }
    })
}
doAfterClickEnterOnBtnOfImgStorage(tagUnsplash);
doAfterClickEnterOnBtnOfImgStorage(tagFlickr);

function getRandomNum() {
    return randomNum;
}

function setBg() {
    const timeOfDay = getTimeOfDay();
    const img = new Image();

    if (github.classList.contains('isEnabled')) {
        let bgNum;
        if (String(randomNum).length === 1) { bgNum = '0' + String(randomNum) } else { bgNum = randomNum };
        img.src = `https://raw.githubusercontent.com/MaestroFront/momentum-storage/assets/images/${timeOfDay}/${bgNum}.webp`;
        img.addEventListener('load', () => {
            body.style.backgroundImage = `url('https://raw.githubusercontent.com/MaestroFront/momentum-storage/assets/images/${timeOfDay}/${bgNum}.webp')`;
            body.style.backgroundPosition = 'center';
            body.style.backgroundSize = 'cover';
            body.style.backgroundRepeat = 'no-repeat';

        })
    }
}
setBg();

async function getLinkToImageFromUnsplash() {
    const url = `https://api.unsplash.com/photos/random?query=${tagUnsplash.value}&client_id=-otUeEwlJk3bUmrdjefTaWuawwlGwMlPWA4M0HOYop0`;
    const res = await fetch(url);
    const data = await res.json();

    const img = new Image();
    img.src = `${data.urls.regular}`;
    img.addEventListener('load', () => {
        body.style.backgroundImage = `url(${img.src})`;
        body.style.backgroundPosition = 'center';
        body.style.backgroundSize = 'cover';
        body.style.backgroundRepeat = 'no-repeat';
    })
}

async function getLinkToImageFromFlickr() {
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=4d6b171b3dc00d96c7a16c82b7a670fe&tags=${tagFlickr.value}&extras=url_l&format=json&nojsoncallback=1`;
    const res = await fetch(url);
    const data = await res.json();

    const img = new Image();
    if (data.photos.photo[randomNum].url_l) {
        img.src = `${data.photos.photo[randomNum].url_l}`;
    } else {
        let bgNum;
        if (String(randomNum).length === 1) { bgNum = '0' + String(randomNum) } else { bgNum = randomNum };
        img.src = `https://raw.githubusercontent.com/MaestroFront/momentum-storage/assets/images/${getTimeOfDay()}/${bgNum}.webp`;
    }
    img.addEventListener('load', () => {
        body.style.backgroundImage = `url(${img.src})`;
        body.style.backgroundPosition = 'center';
        body.style.backgroundSize = 'cover';
        body.style.backgroundRepeat = 'no-repeat';
    })
}

function getSlideNext() {
    if (unsplash.classList.contains('isEnabled')) {
        getLinkToImageFromUnsplash()
    }

    if (flickr.classList.contains('isEnabled')) {
        getLinkToImageFromFlickr()
    }

    randomNum = String(+randomNum + 1);
    if (randomNum > 20) { randomNum = '01' }
    setBg();
}

function getSlidePrev() {
    if (unsplash.classList.contains('isEnabled')) {
        getLinkToImageFromUnsplash()
    }

    if (flickr.classList.contains('isEnabled')) {
        getLinkToImageFromFlickr()
    }

    randomNum = String(+randomNum - 1);
    if (randomNum < 1) { randomNum = 20 }
    setBg();
}

slidePrev.addEventListener('click', getSlidePrev);
slideNext.addEventListener('click', getSlideNext);

// ---------------- WEATHER ---------------- //
const temperatureIcon = document.querySelector('.temperatureIcon');
const windIcon = document.querySelector('.windIcon');
const humidityIcon = document.querySelector('.humidityIcon');

async function getWeather(lang, city) {

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${lang}&appid=3babef20d333237e632e02b01c4065f8&units=metric`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.cod === '404' || data.cod === '400') {
        alert('Wrong value of city');
    }

    if (!data?.weather) {
        return;
    }

    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;

    if (buttonEn.classList.contains('isEnabled')) {
        wind.textContent = `Wind speed: ${data.wind.speed} m/s`;
        humidity.textContent = `Humidity: ${data.main.humidity} %`;
    }

    if (buttonRu.classList.contains('isEnabled')) {
        wind.textContent = `Скорость ветра: ${data.wind.speed}м/с`;
        humidity.textContent = `Влажность: ${data.main.humidity}%`;
    }

    temperatureIcon.classList.add('showIcon');
    windIcon.classList.add('showIcon');
    humidityIcon.classList.add('showIcon');

}

city.addEventListener('keydown', (e) => {
    if (e.code !== 'Enter') return;
    if (e.code === 'Enter') {
        temperatureIcon.classList.add('showIcon');
        windIcon.classList.add('showIcon');
        humidityIcon.classList.add('showIcon');
    }
    if (buttonEn.classList.contains('isEnabled')) { getWeather('en', e.target.value) };
    if (buttonRu.classList.contains('isEnabled')) { getWeather('ru', e.target.value) };
});

// ---------------- QUOTES ---------------- //
async function getQuotes() {

    const quotes = './js/data.json';
    const res = await fetch(quotes);
    const data = await res.json();

    randomNum = +randomNum;

    if (randomNum === 20) {
        randomNum = 0;
    }

    if (buttonRu.classList.contains('isEnabled')) {
        quote.textContent = data[randomNum].textRus;
        author.textContent = data[randomNum].authorRus;
    } else {
        quote.textContent = data[randomNum].textEng;
        author.textContent = data[randomNum].authorEng;
    }
    randomNum++;

}

setTimeout(getQuotes, 1000);


changeQuote.addEventListener('click', () => {
    changeQuote.classList.toggle('around');
    getQuotes();
})

// ---------------- TRANSLATOR ---------------- //
const arraySettingsItemsValues = [titleSettingsLanguage, titleSettingsBackgroundSource, titleSettingsMusicSource, titleSettingsShowHideBlocks, titleSettingsLinks, buttonRu, buttonEn, musicForkStorageLink, playerShowHide, timeShowHide, dateShowHide, greetingShowHide, weatherShowHide, toDoListShowHide, quoteShowHide, task];
const settingsItemsValuesRu = ['Язык', 'Хранилище фона', 'Хранилище музыки', 'Показать/скрыть блоки', 'Ссылки', 'Русский', 'Английский', 'Репозиторий', 'Аудиоплэйер', 'Время', 'Дата', 'Приветствие', 'Погода', 'Список дел', 'Цитаты', 'Задание'];
const settingsItemsValuesEn = ['Language', 'Background source', 'Music Source', 'Show/Hide Blocks', 'Links', 'Russian', 'English', 'Fork', 'AudioPlayer', 'Time', 'Date', 'Greeting', 'Weather', 'To do list', 'Quotes', 'Task'];

buttonEn.addEventListener('click', () => {
    if (buttonRu.classList.contains('isEnabled')) {
        getQuotes();
        removeClassIsEnabled(buttonRu);
        addClassIsEnabled(buttonEn);
    }
    getWeather('en', city.value);
    showDate('en-En');
    for (let i = 0; i < arraySettingsItemsValues.length; i++) {
        arraySettingsItemsValues[i].textContent = settingsItemsValuesEn[i];
    }
    if (city.value === 'Минск') {
        city.value = 'Minsk';
    }
    nowPlaying.textContent = 'Now playing';
    inputName.placeholder = '[Enter name]';
    todolistInput.placeholder = 'Add a mission';
})

buttonRu.addEventListener('click', () => {
    if (buttonEn.classList.contains('isEnabled')) {
        getQuotes();
        removeClassIsEnabled(buttonEn);
        addClassIsEnabled(buttonRu);
    }
    getWeather('ru', city.value);
    showDate('ru-Ru');
    for (let i = 0; i < arraySettingsItemsValues.length; i++) {
        arraySettingsItemsValues[i].textContent = settingsItemsValuesRu[i];
    }
    if (city.value === 'Minsk') {
        city.value = 'Минск';
    }
    nowPlaying.textContent = 'Сейчас играет';
    inputName.placeholder = '[Введите имя]';
    todolistInput.placeholder = 'Добавь задачу';
})

// ---------------- SETTINGS ---------------- //
window.addEventListener('click', (e) => {
    if (e.target.classList[0] != 'show' && e.target.classList[0] != 'settings-item' && e.target.classList[0] != 'settings-hide' && e.target.classList[0] != 'settings-block' && e.target.classList[0] != 'background-item' && e.target.nodeName != 'INPUT' && e.target.nodeName != 'BUTTON') {
        settingsContainer.classList.remove('show');
        arrowShowHideSettings.classList.remove('reflect');
    }
})

settingsOpenBtn.addEventListener('click', () => {
    settingsContainer.classList.toggle('show');
    arrowShowHideSettings.classList.toggle('reflect');
});

function showHidePageBlocks(item1, item2) {
    item1.classList.toggle('isEnabled');
    item2.classList.toggle('opacity');
}

playerShowHide.addEventListener('click', () => {
    showHidePageBlocks(playerShowHide, player);
});
timeShowHide.addEventListener('click', () => {
    showHidePageBlocks(timeShowHide, time);
});
dateShowHide.addEventListener('click', () => {
    showHidePageBlocks(dateShowHide, dateBlock);
});
greetingShowHide.addEventListener('click', () => {
    showHidePageBlocks(greetingShowHide, greetingContainer);
});
weatherShowHide.addEventListener('click', () => {
    showHidePageBlocks(weatherShowHide, weather);
});
quoteShowHide.addEventListener('click', () => {
    changeQuote.classList.toggle('opacity');
    showHidePageBlocks(quoteShowHide, quoterContainer);
});

toDoListShowHide.addEventListener('click', () => {
    showHidePageBlocks(toDoListShowHide, todolistContainer);
    inputShowHideTodolist.classList.toggle('opacity');
})

// ---------------- TO DO LIST ---------------- //
const ul = document.querySelector('.todolist-list');
function addANewTask(task) {
    let li = document.createElement('li');
    let img = document.createElement('img');

    li.classList.add('todolist-item');
    li.classList.add(`item${classNumberItem++}`);
    img.classList.add('smallcross');
    img.classList.add(`item${classNumberImg++}`);

    img.src = "./assets/svg/smallcrossIcon.svg";

    li.innerHTML = task;

    li.append(img);
    todolistList.append(li);

    arrayListItems.push(task);

    todolistInput.value = '';
}

plusIcon.addEventListener('click', () => {
    addANewTask(todolistInput.value);
});

todolistInput.addEventListener('keydown', (e) => {
    if (e.code === 'Enter') {
        addANewTask(todolistInput.value);
    };
})

window.addEventListener('click', (e) => {
    if (e.target.classList[0] === 'smallcross') {
        let array = [];
        for (let i = 1; i < document.querySelectorAll('.todolist-item').length; i++) {
            array.push(document.querySelectorAll('.todolist-item')[i].innerText);
        }
        document.querySelectorAll('.todolist-item').forEach(item => {
            if (item.classList.contains(e.target.classList[1])) {
                let index = array.indexOf(item);
                if (index !== -1) {
                    array.splice(index, 1);
                }
                item.remove();
            }
        })
        arrayListItems = array;
    }
    if (e.target.classList[0] != 'todolist-input-container' &&
        e.target.classList[0] != 'todolist' &&
        e.target.classList[0] != 'todolist-input' &&
        e.target.classList[0] != 'todolist-show-hide' &&
        e.target.classList[0] != 'plusIcon' &&
        e.target.classList[0] != 'todolist-container' &&
        e.target.classList[0] != 'smallcross') {
        todolistContainer.classList.remove('showTodolist');
        arrowShowHideTodolist.classList.remove('reflectArrow');
    }
})

inputShowHideTodolist.addEventListener('click', () => {
    todolistContainer.classList.toggle('showTodolist');
    arrowShowHideTodolist.classList.toggle('reflectArrow');
})

// ---------------- LOCAL STORAGE ---------------- //
function setLocalStorage() {

    localStorage.setItem('inputName', inputName.value);
    localStorage.setItem('city', city.value);

    localStorage.setItem('buttonRuValue', buttonRu.classList.value);
    localStorage.setItem('buttonEnValue', buttonEn.classList.value);

    localStorage.setItem('buttonRu', buttonRu.innerText);
    localStorage.setItem('buttonEn', buttonEn.innerText);
    localStorage.setItem('task', task.innerText);

    localStorage.setItem('inputNamePlaceholder', inputName.placeholder);
    localStorage.setItem('todolistInputPlaceholder', todolistInput.placeholder);

    localStorage.setItem('nowPlayingText', nowPlayingText.textContent);
    localStorage.setItem('titleSettingsLanguage', titleSettingsLanguage.textContent);
    localStorage.setItem('titleSettingsBackgroundSource', titleSettingsBackgroundSource.textContent);
    localStorage.setItem('titleSettingsMusicSource', titleSettingsMusicSource.textContent);
    localStorage.setItem('titleSettingsShowHideBlocks', titleSettingsShowHideBlocks.textContent);
    localStorage.setItem('titleSettingsLinks', titleSettingsLinks.textContent);
    localStorage.setItem('playerShowHide', playerShowHide.textContent);
    localStorage.setItem('timeShowHide', timeShowHide.textContent);
    localStorage.setItem('dateShowHide', dateShowHide.textContent);
    localStorage.setItem('greetingShowHide', greetingShowHide.textContent);
    localStorage.setItem('weatherShowHide', weatherShowHide.textContent);
    localStorage.setItem('quoteShowHide', quoteShowHide.textContent);
    localStorage.setItem('toDoListShowHide', toDoListShowHide.textContent);
    localStorage.setItem('musicForkStorageLink', musicForkStorageLink.textContent);

    localStorage.setItem('todolistItems', arrayListItems);

}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {

    if (localStorage.getItem('inputName')) {
        inputName.value = localStorage.getItem('inputName');
    }
    if (localStorage.getItem('city')) {
        city.value = localStorage.getItem('city');
    }
    if (localStorage.getItem('buttonRuValue')) {
        buttonRu.classList.value = localStorage.getItem('buttonRuValue');
    }
    if (localStorage.getItem('buttonEnValue')) {
        buttonEn.classList.value = localStorage.getItem('buttonEnValue');
    }
    if (localStorage.getItem('buttonRu')) {
        buttonRu.innerText = localStorage.getItem('buttonRu');
    }
    if (localStorage.getItem('buttonEn')) {
        buttonEn.innerText = localStorage.getItem('buttonEn');
    }
    if (localStorage.getItem('inputNamePlaceholder')) {
        inputName.placeholder = localStorage.getItem('inputNamePlaceholder');
    }
    if (localStorage.getItem('todolistInputPlaceholder')) {
        todolistInput.placeholder = localStorage.getItem('todolistInputPlaceholder');
    }
    if (localStorage.getItem('nowPlayingText')) {
        nowPlayingText.textContent = localStorage.getItem('nowPlayingText');
    }
    if (localStorage.getItem('titleSettingsLanguage')) {
        titleSettingsLanguage.textContent = localStorage.getItem('titleSettingsLanguage');
    }
    if (localStorage.getItem('titleSettingsBackgroundSource')) {
        titleSettingsBackgroundSource.textContent = localStorage.getItem('titleSettingsBackgroundSource');
    }
    if (localStorage.getItem('titleSettingsMusicSource')) {
        titleSettingsMusicSource.textContent = localStorage.getItem('titleSettingsMusicSource');
    }
    if (localStorage.getItem('titleSettingsShowHideBlocks')) {
        titleSettingsShowHideBlocks.textContent = localStorage.getItem('titleSettingsShowHideBlocks');
    }
    if (localStorage.getItem('titleSettingsLinks')) {
        titleSettingsLinks.textContent = localStorage.getItem('titleSettingsLinks');
    }
    if (localStorage.getItem('playerShowHide')) {
        playerShowHide.textContent = localStorage.getItem('playerShowHide');
    }
    if (localStorage.getItem('dateShowHide')) {
        dateShowHide.textContent = localStorage.getItem('dateShowHide');
    }
    if (localStorage.getItem('timeShowHide')) {
        timeShowHide.textContent = localStorage.getItem('timeShowHide');
    }
    if (localStorage.getItem('greetingShowHide')) {
        greetingShowHide.textContent = localStorage.getItem('greetingShowHide');
    }
    if (localStorage.getItem('weatherShowHide')) {
        weatherShowHide.textContent = localStorage.getItem('weatherShowHide');
    }
    if (localStorage.getItem('quoteShowHide')) {
        quoteShowHide.textContent = localStorage.getItem('quoteShowHide');
    }
    if (localStorage.getItem('toDoListShowHide')) {
        toDoListShowHide.textContent = localStorage.getItem('toDoListShowHide');
    }
    if (localStorage.getItem('musicForkStorageLink')) {
        musicForkStorageLink.textContent = localStorage.getItem('musicForkStorageLink');
    }
    if (localStorage.getItem('task')) {
        task.textContent = localStorage.getItem('task');
    }

    if (localStorage.getItem('todolistItems')) {
        const arrayKeys = localStorage.getItem('todolistItems').split(',');
        arrayKeys.forEach(item => {
            addANewTask(item)
        });
    }
}
window.addEventListener('load', getLocalStorage);