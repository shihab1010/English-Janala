const loadLesson = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLesson(json.data));
};
const displayLesson = (lessons) => {
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";
  for (let lesson of lessons) {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
                 <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="lesson-btn btn btn-soft btn-primary"
                ><i class="fa-solid fa-book-open mr-2"></i>Lesson-${lesson.level_no}
                </button>
        
        `;
    levelContainer.appendChild(btnDiv);
  }
};

// load level function
const loadLevelWord = (id) => {
  manageSpinner(true);
  const lessonButtons = document.getElementsByClassName("lesson-btn");
  for (const btn of lessonButtons) {
    btn.classList.remove("active");
  }
  const clickBtn = document.getElementById(`lesson-btn-${id}`);
  clickBtn.classList.add("active");
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayLevelWord(data.data));
};

const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";
  if (words.length == 0) {
    wordContainer.innerHTML = `
       
         <div class="grid col-span-full text-center space-y-5">
         <img class="mx-auto" src="./assets/alert-error.png" alt="">
        <p class="text-gray-500">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <h2 class="text-3xl font-bold">নেক্সট Lesson এ যান</h2>
       </div>
         `;
    manageSpinner(false);
    return;
  }
  for (let word of words) {
    const wordCard = document.createElement("div");
    wordCard.innerHTML = `
         <div class="word-card h-full bg-white py-10 px-5 rounded-xl shadow-sm text-center space-y-4">
            <h2 class="text-2xl font-bold">${
              word.word ? word.word : "শব্দ পাওয়া যায়নি।"
            }</h2>
            <p class=" font-semibold">Meaning / Pronunciation</p>
            <div class="text-2xl font-bold font-bangla">${
              word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি।"
            } / ${
      word.pronunciation ? word.pronunciation : "Pronunciation পাওয়া যায়নি।"
    }</div>
            <div class=" flex justify-between items-center">
                <button onclick="loadWordDetails(${
                  word.id
                })" class="bg-[#1a91ff1a] rounded-sm p-2"><i class="fa-solid fa-circle-info "></i></button>
                <button onclick="pronounceWord('${
                  word.word
                }')" class="bg-[#1a91ff1a] rounded-sm p-2"><i class="fa-solid fa-volume-high "></i></button>
            </div>
        </div>
        
        `;
    wordContainer.appendChild(wordCard);
    manageSpinner(false);
  }
};
// load word details
const loadWordDetails = (id) => {
  url = `https://openapi.programming-hero.com/api/word/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayWordDetails(data.data));
};

const displayWordDetails = (word) => {
  const detailsBox = document.getElementById("details-container");
  detailsBox.innerHTML = `
    <div class="">
            <h2 class="text-2xl font-bold">
              ${word.word} (  <i class="fa-solid fa-microphone-lines"></i> :${
    word.pronunciation
  })
            </h2>
          </div>
          <div class="">
            <p class="font-bold">Meaning</p>
            <p class="font-bold">${word.meaning}</p>
          </div>
          <div class="">
            <p class="font-bold">Example</p>
            <p class="font-bold">${word.sentence}</p>
          </div>
          <div class="">
            <p class="font-bold">সমার্থক শব্দ গুলো</p>
            <div class="">
            ${createElements(word.synonyms)}
            
          </div>
          </div>
  
  `;
  document.getElementById("word_modal").showModal();
};

const createElements = (arr) => {
  const htmlElements = arr.map((el) => `<span class="btn">${el}</span>`);
  return htmlElements.join(" ");
};
// manage loading
const manageSpinner = (status) => {
  if (status == true) {
    document.getElementById("spin").classList.remove("hidden");
    document.getElementById("word-container").classList.add("hidden");
  } else {
    document.getElementById("word-container").classList.remove("hidden");
    document.getElementById("spin").classList.add("hidden");
  }
};

// search
document.getElementById("btn-search").addEventListener("click", () => {
  const lessonButtons = document.getElementsByClassName("lesson-btn");
  for (const btn of lessonButtons) {
    btn.classList.remove("active");
  }
  const searchValue = document
    .getElementById("input-search")
    .value.trim()
    .toLowerCase();
  fetch("https://openapi.programming-hero.com/api/words/all")
    .then((res) => res.json())
    .then((data) => {
      const allWords = data.data;
      const filterWord = allWords.filter((word) =>
        word.word.toLowerCase().includes(searchValue)
      );
      displayLevelWord(filterWord);
    });
});
// speak words
function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

loadLesson();
