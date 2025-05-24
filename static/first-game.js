
const audio = document.getElementById('my-audio');
const image = document.getElementById('play-image');

let isPlaying = false;

image.addEventListener('click', function () {
    if (!isPlaying) {
        audio.volume = 0.05; // 🔉 Ovoz darajasi: 0.0 (jim) — 1.0 (to‘liq)
        audio.play();
        isPlaying = true;
        image.style.opacity = 0.6; // Vizual effekt (ixtiyoriy)
    } else {
        audio.pause();
        isPlaying = false;
        image.style.opacity = 1; // Tiklash
    }
});

// Agar musiqa tugasa, flagni qayta o'zgartiramiz:
audio.addEventListener('ended', function () {
    isPlaying = false;
    image.style.opacity = 1;
});



const topRowCells = document.querySelectorAll('.top-row .cell');
topRowCells.forEach(cell => cell.addEventListener('click', onTopCellClick));
const bottomRow = document.querySelector('.bottom-row');
let bottomRowCells = bottomRow.querySelectorAll('.cell');

bottomRowCells.forEach(cell => cell.addEventListener('click', onBottomCellClick));


const answerLetters = ['O', 'N', 'A'];

const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let selectedTopIndex = 0;  // Avval birinchi katak tanlangan
let yellowBottomIndex = null;

function highlightSelectedTop() {
    topRowCells.forEach((cell, idx) => {
        if(idx === selectedTopIndex){
            cell.classList.add('yellow');
        } else {
            cell.classList.remove('yellow');
        }
    });
}



// function onBottomCellClick(e) {
//     const clickedCell = e.target;
//     const index = +clickedCell.dataset.index;

//     if (yellowBottomIndex !== null && yellowBottomIndex !== index) {
//         const oldCell = bottomRow.querySelector(`.cell[data-index="${yellowBottomIndex}"]`);
//         if (oldCell) oldCell.classList.remove('yellow');
//         yellowBottomIndex = null;
//     }

//     const correctLetter = answerLetters[selectedTopIndex];
//     const clickedLetter = clickedCell.textContent;

//     if (clickedLetter === '') return; // Bo‘sh katakka bosilsa hech narsa qilmaymiz

//     if (yellowBottomIndex === index) {
//         if (clickedLetter === correctLetter) {
//             // To‘g‘ri harf

//             // Yuqoridagi katakka harfni ko‘rsatish
//             topRowCells[selectedTopIndex].textContent = correctLetter;
//             topRowCells[selectedTopIndex].classList.add('visible');

//             // Pastdagi katakni butunlay o'chirish (DOMdan olib tashlash)
//             clickedCell.remove();

//             // Yangilangan bottomRowCells ni yangilaymiz
//             bottomRowCells = bottomRow.querySelectorAll('.cell');

//             yellowBottomIndex = null;
//             selectedTopIndex = getNextEmptyTopIndex() ?? null;
//             clearTopRowError();

//             // Agar keyingi bo‘sh katak bo‘lsa, uni sariq rangga bo‘yaymiz
//             highlightSelectedTop();

//         } else {
//             // Noto‘g‘ri harf
//             clickedCell.classList.add('wrong');
//             showTopRowError();

//             setTimeout(() => {
//                 clickedCell.classList.remove('wrong');
//                 clearTopRowError();
//                 clickedCell.classList.remove('yellow');
//                 yellowBottomIndex = null;
//             }, 1000);
//         }
//         return;
//     }

//     // Agar yangi tanlov bo‘lsa, sariq rang beramiz
//     bottomRowCells.forEach(cell => cell.classList.remove('yellow'));
//     clickedCell.classList.add('yellow');
//     yellowBottomIndex = index;
// }

// Yuqori qator kataklarini o‘q tugmalar bilan boshqarish uchun funksiya




function onBottomCellClick(e) {
    const clickedCell = e.target;
    const index = +clickedCell.dataset.index;

    if (yellowBottomIndex !== null && yellowBottomIndex !== index) {
        const oldCell = bottomRow.querySelector(`.cell[data-index="${yellowBottomIndex}"]`);
        if (oldCell) oldCell.classList.remove('yellow');
        yellowBottomIndex = null;
    }

    const correctLetter = answerLetters[selectedTopIndex];
    //const clickedLetter = clickedCell.textContent;
    const clickedLetter = clickedCell.textContent.toUpperCase();
    
    // 🔊 AUDIO O‘YNATISH
    const audioElement = document.getElementById('bottomAudio' + clickedLetter);
    if (audioElement) {
        audioElement.currentTime = 0;
        audioElement.play();
    }


    

    if (clickedLetter === '') return; // Bo‘sh katakka bosilsa hech narsa qilmaymiz

    if (yellowBottomIndex === index) {
        if (clickedLetter === correctLetter) {
            // To‘g‘ri harf bosildi

            // Top-row ning joriy katagida allaqachon harf bor, bottom-row harfni o'chiramiz
            clickedCell.remove();

            bottomRowCells = bottomRow.querySelectorAll('.cell');

            yellowBottomIndex = null;

            // Keyingi katakga harfni qo‘shamiz, agar keyingi katak bo‘lsa
            if (selectedTopIndex + 1 < topRowCells.length) {
                const nextIndex = selectedTopIndex + 1;
                topRowCells[nextIndex].textContent = answerLetters[nextIndex];
                topRowCells[nextIndex].classList.add('visible');
                selectedTopIndex = nextIndex;
            } else {
                // O'yin tugadi, barcha harflar ko'rsatildi
                selectedTopIndex = null;
                // alert('Tabriklaymiz! So‘zni to‘liq to‘g‘ri to‘ldirdingiz!');
                document.querySelector('.bottom-container.congrats').classList.remove('congrats');
                document.getElementById('congratsAudio').play();
            }

            highlightSelectedTop();
            clearTopRowError();
            speakLetter(selectedTopIndex);

        } else {
            // Noto‘g‘ri harf bosildi
            clickedCell.classList.add('wrong');
            showTopRowError();

            setTimeout(() => {
                clickedCell.classList.remove('wrong');
                clearTopRowError();
                clickedCell.classList.remove('yellow');
                yellowBottomIndex = null;
            }, 1000);
        }
        return;
    }

    // Yangi tanlov uchun sariq rang beramiz
    bottomRowCells.forEach(cell => cell.classList.remove('yellow'));
    clickedCell.classList.add('yellow');
    yellowBottomIndex = index;
}




function onPrevClick() {
    if(selectedTopIndex === null) return;
    do {
        selectedTopIndex = (selectedTopIndex - 1 + topRowCells.length) % topRowCells.length;
    } while(topRowCells[selectedTopIndex].textContent !== ''); // Bo‘sh katakka o‘tish
    highlightSelectedTop();
    speakLetter(selectedTopIndex);
}

function onNextClick() {
    if(selectedTopIndex === null) return;
    do {
        selectedTopIndex = (selectedTopIndex + 1) % topRowCells.length;
    } while(topRowCells[selectedTopIndex].textContent !== '');
    highlightSelectedTop();
    speakLetter(selectedTopIndex);
}

function getNextEmptyTopIndex() {
    for(let i = 0; i < topRowCells.length; i++){
        if(topRowCells[i].textContent === '') return i;
    }
    return null;
}

function speakLetter(index) {
    if (index === null) return;

    const letterToSpeak = answerLetters[index];
    const audioElement = document.getElementById('topAudio' + letterToSpeak.toUpperCase());

    if (audioElement) {
        audioElement.currentTime = 0;
        audioElement.play();
    }
}

/*
function onTopCellClick(e) {
    const index = +e.target.dataset.index;
    if (topRowCells[index].textContent !== '') return;
    selectedTopIndex = index;
    highlightSelectedTop();
    speakLetter(selectedTopIndex);

}
*/

function onTopCellClick(e) {
    const index = +e.target.dataset.index;

    // Har qanday holatda selectedTopIndex ni yangilaymiz
    selectedTopIndex = index;
    highlightSelectedTop();
    speakLetter(selectedTopIndex);
}



function showTopRowError() {
    document.querySelector('.top-row').classList.add('red');
}

function clearTopRowError() {
    document.querySelector('.top-row').classList.remove('red');
}
// function init() {
//     // Boshlang‘ich holat: birinchi bo‘sh katakni tanlab sariq rang beramiz
//     selectedTopIndex = getNextEmptyTopIndex();
//     highlightSelectedTop();

//     topRowCells.forEach(cell => {
//         cell.textContent = '';
//         cell.classList.remove('visible');
//         cell.addEventListener('click', onTopCellClick);
//     });

//     // 🟡 Shu yerda 1-harfni ko‘rsatamiz:
//     topRowCells[0].textContent = answerLetters[0];
//     topRowCells[0].classList.add('visible');

//     bottomRowCells.forEach(cell => {
//         cell.classList.remove('yellow', 'wrong');
//         cell.addEventListener('click', onBottomCellClick);
//     });

//     prevBtn.addEventListener('click', onPrevClick);
//     nextBtn.addEventListener('click', onNextClick);

//     // O‘yin boshlanganda tanlangan katakdagi harfni ovoz chiqarish
//     speakLetter(selectedTopIndex);
// }

document.addEventListener('DOMContentLoaded', () => {
    const imageContainer = document.querySelector('.image-container');
    const imageAudio = document.getElementById('imageAudio');

    imageContainer.addEventListener('click', () => {
        if (imageAudio) {
            imageAudio.currentTime = 0;
            imageAudio.play();
        }
    });
});

function init() {
    topRowCells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('visible');
        cell.addEventListener('click', onTopCellClick);
    });

    selectedTopIndex = 0;
    topRowCells[0].textContent = answerLetters[0];
    topRowCells[0].classList.add('visible');
    highlightSelectedTop();

    bottomRowCells.forEach(cell => {
        cell.classList.remove('yellow', 'wrong');
        cell.addEventListener('click', onBottomCellClick);
    });

    prevBtn.addEventListener('click', onPrevClick);
    nextBtn.addEventListener('click', onNextClick);

    speakLetter(selectedTopIndex);
}

init();



