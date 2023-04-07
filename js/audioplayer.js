const player = document.querySelector('.player');
const playerSvg = document.querySelector('.player-svg');
const musicImg = player.querySelector('.img-area img');
const musicName = player.querySelector('.song-details .name');
const musicArtist = player.querySelector('.song-details .artist');
const mainAudio = player.querySelector('#main-audio');
const playPauseBtn = player.querySelector('.play-pause');
const iconPlayPause = playPauseBtn.querySelector('i');
const prevBtn = player.querySelector('#prev');
const nextBtn = player.querySelector('#next');
const progressArea = player.querySelector('.progress-area');
const progressBar = player.querySelector('.progress-bar');
const totalDuration = player.querySelector('.timer .duration');
const musicList = player.querySelector('.music-list');
const showMoreBtn = player.querySelector('#more-music');
const hideMusicBtn = musicList.querySelector('#close');

let musicIndex = 1;

window.addEventListener('load', () => {
    loadMusic(musicIndex);
    playingNow();
})

// load music function
function loadMusic(indexNumb) {
    musicName.textContent = allMusic[indexNumb - 1].name;
    musicArtist.textContent = allMusic[indexNumb - 1].artist;
    musicImg.src = `https://raw.github.com/MaestroFront/momentum-storage/assets/images/music/${allMusic[indexNumb - 1].img}.webp`;
    mainAudio.src = `https://raw.github.com/MaestroFront/momentum-storage/assets/playlist/${allMusic[indexNumb - 1].src}.mp3`;
}

// play music function
function playMusic() {
    player.classList.add('paused');
    playPauseBtn.querySelector('i').textContent = 'pause';
    mainAudio.play();
}

// pause music function
function pauseMusic() {
    player.classList.remove('paused');
    iconPlayPause.textContent = 'play_arrow';
    mainAudio.pause();
}

// next music function
function nextMusic() {
    musicIndex++;
    musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
    playingNow();
}

// prev music function
function prevMusic() {
    musicIndex--;
    musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
    playingNow();
}

// play or pause button event
playPauseBtn.addEventListener('click', () => {
    const isMusicPaused = player.classList.contains('paused');
    isMusicPaused ? pauseMusic() : playMusic();
})

// button for switch next sound
nextBtn.addEventListener('click', () => {
    nextMusic();
    playingNow();
})

// button for switch prev sound
prevBtn.addEventListener('click', () => {
    prevMusic();
    playingNow();
})

// progress bar
mainAudio.addEventListener('timeupdate', (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;

    let progressWidth = (currentTime / duration) * 100;
    let musicCurrentTime = player.querySelector('.current');
    let musicDuration = player.querySelector('.duration');
    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);

    progressBar.style.width = `${progressWidth}%`;

    mainAudio.addEventListener('loadeddata', () => {
        let audioDuration = mainAudio.duration;
        let totalMin = Math.floor(audioDuration / 60);
        let totalSec = Math.floor(audioDuration % 60);
        totalSec < 10 ? totalSec = `0${totalSec}` : totalSec;
        musicDuration.textContent = `${totalMin}:${totalSec}`;
    });

    currentSec < 10 ? currentSec = `0${currentSec}` : currentSec;
    musicCurrentTime.textContent = `${currentMin}:${currentSec}`;
})

// click on the progress bar
progressArea.addEventListener('click', (e) => {
    let progressWidthval = progressArea.clientWidth;
    let clickedOffSetX = e.offsetX;
    let songDuration = mainAudio.duration;

    mainAudio.currentTime = (clickedOffSetX / progressWidthval) * songDuration;
})

// shuffle song
const repeatBtn = player.querySelector('#repeat-plist');

repeatBtn.addEventListener('click', () => {
    let getText = repeatBtn.textContent;

    switch (getText) {
        case 'repeat':
            repeatBtn.textContent = 'repeat_one';
            repeatBtn.setAttribute('title', 'Song looped ')
            break;
        case 'repeat_one':
            repeatBtn.textContent = 'shuffle';
            repeatBtn.setAttribute('title', 'Playback shuffle')
            break;
        case 'shuffle':
            repeatBtn.textContent = 'repeat';
            repeatBtn.setAttribute('title', 'Playlist looped ')
            break;
    }
});

// after song ended
mainAudio.addEventListener('ended', () => {

    let getText = repeatBtn.textContent;

    switch (getText) {

        case 'repeat':
            nextMusic();
            break;
        case 'repeat_one':
            mainAudio.currentTime = 0;
            loadMusic(musicIndex);
            playMusic();
            playingNow();
            break;
        case 'shuffle':
            let randIndex = Math.floor((Math.random() * allMusic.length) + 1);
            do {
                randIndex = Math.floor((Math.random() * allMusic.length) + 1);
            } while (musicIndex == randIndex);

            musicIndex = randIndex;
            loadMusic(musicIndex);
            playMusic();
            playingNow();
            break;
    }
});

// show playlist
showMoreBtn.addEventListener('click', () => {
    musicList.classList.toggle('show');
});

// hide control buttons
hideMusicBtn.addEventListener('click', () => {
    showMoreBtn.click();
});

// create li items on the playlist
const ulTag = player.querySelector('ul');

for (let i = 0; i < allMusic.length; i++) {

    let liTag = `<li li-index='${i + 1}'>
                    <div class="row">
                        <span>${allMusic[i].name}</span>
                        <p>${allMusic[i].artist}</p>
                    </div>
                    <audio class='${allMusic[i].src}' src="https://raw.github.com/MaestroFront/momentum-storage/assets/playlist/${allMusic[i].src}.mp3"></audio>
                    <button class='icon-playlist play-sound${i + 1}'></button>
                    <span id='${allMusic[i].src}' class="audio-duration"></span>
                </li>`

    ulTag.insertAdjacentHTML('beforeend', liTag);

    let liAudioDurationTag = ulTag.querySelector(`#${allMusic[i].src}`);
    let liAudioTag = ulTag.querySelector(`.${allMusic[i].src}`);

    liAudioTag.addEventListener('loadeddata', () => {
        let duration = liAudioTag.duration;
        let totalMin = Math.floor(duration / 60);
        let totalSec = Math.floor(duration % 60);
        totalSec < 10 ? totalSec = `0${totalSec}` : totalSec;
        liAudioDurationTag.textContent = `${totalMin}:${totalSec}`;
    })
};

// click on li item in playlist
const allLiTags = ulTag.querySelectorAll('li');

function playingNow() {
    for (let j = 0; j < allLiTags.length; j++) {
        if (allLiTags[j].classList.contains('playing')) {
            allLiTags[j].classList.remove('playing');
            for (let i = 0; i < allLiTags.length; i++) {
                document.querySelector(`.play-sound${i + 1}`).classList.remove('pause');
            }
            document.querySelector(`.play-sound${musicIndex}`).classList.add('pause');
        }

        if (allLiTags[j].getAttribute('li-index') == musicIndex) {
            allLiTags[j].classList.add('playing');

        }
        allLiTags[j].setAttribute('onclick', 'clicked(this)');
    };
}

// play song on li click in playlist
function clicked(element) {
    let getLiIndex = element.getAttribute('li-index');
    musicIndex = getLiIndex;
    loadMusic(musicIndex);
    playMusic();
    playingNow();
}

// hide and show player
const nowPlaying = document.querySelector('.now-playing');
const imgArea = document.querySelector('.img-area');
const songDetails = document.querySelector('.song-details');
const topBar = document.querySelector('.top-bar');
const turn = document.querySelector('.turn');

// change themes
const changerWrapper = document.querySelector('.changer-themes');
const openThemesList = document.querySelector('.open');
const arrowClose = document.querySelector('.changer-themes i');

const redTheme = document.querySelector('.red-theme');
const orangeTheme = document.querySelector('.orange-theme');
const yellowTheme = document.querySelector('.yellow-theme');
const greenTheme = document.querySelector('.green-theme');
const blueTheme = document.querySelector('.blue-theme');
const purpleTheme = document.querySelector('.purple-theme');
const originalTheme = document.querySelector('.original-theme');

openThemesList.addEventListener('click', () => {
    changerWrapper.classList.add('down');
});

arrowClose.addEventListener('click', () => {
    changerWrapper.classList.remove('down');
});

const arrayOfThemes = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];
const arrayOfBlocksWhichNeedToChangeAColor = [player, musicList, changerWrapper];
const arrayOfColorChangeBtn = [redTheme, orangeTheme, yellowTheme, greenTheme, blueTheme, purpleTheme];

// clear all themes
function clearThemes() {
    arrayOfThemes.map(item => {
        player.classList.remove(item);
        musicList.classList.remove(item);
        changerWrapper.classList.remove(item);
    });
}

function addColor(array, color) {
    array.forEach(item => item.classList.add(color));
}

redTheme.addEventListener('click', () => {
    clearThemes();
    addColor(arrayOfBlocksWhichNeedToChangeAColor, 'red');
});

orangeTheme.addEventListener('click', () => {
    clearThemes();
    addColor(arrayOfBlocksWhichNeedToChangeAColor, 'orange');
});

yellowTheme.addEventListener('click', () => {
    clearThemes();
    addColor(arrayOfBlocksWhichNeedToChangeAColor, 'yellow');
});

greenTheme.addEventListener('click', () => {
    clearThemes();
    addColor(arrayOfBlocksWhichNeedToChangeAColor, 'green');
});

blueTheme.addEventListener('click', () => {
    clearThemes();
    addColor(arrayOfBlocksWhichNeedToChangeAColor, 'blue');
});

purpleTheme.addEventListener('click', () => {
    clearThemes();
    addColor(arrayOfBlocksWhichNeedToChangeAColor, 'purple');
});

originalTheme.addEventListener('click', () => {
    clearThemes();
})

// volume
const volume = document.querySelector(".volume");
const arrowOpenVolume = document.querySelector(".arrow-open-volume");
const volumeContainer = document.querySelector(".volume-container");

function setAttributes(el, attrs) {
    for (var key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
}

volume.addEventListener("input", function () { mainAudio.volume = volume.value; });

arrowOpenVolume.addEventListener('click', () => {
    volumeContainer.classList.toggle('show');
    arrowOpenVolume.classList.toggle('rotate');
});