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
                 <button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-soft btn-primary"
                ><i class="fa-solid fa-book-open mr-2"></i>Lesson-${lesson.level_no}
                </button>
        
        `;
    levelContainer.appendChild(btnDiv);
  }
};

// load level function
const loadLevelWord = (id) => {
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
    return;
  }
  for (let word of words) {
    const wordCard = document.createElement("div");
    wordCard.innerHTML = `
         <div class="word-card bg-white py-10 px-5 rounded-xl shadow-sm text-center space-y-4">
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
                <button class="bg-[#1a91ff1a] rounded-sm p-2"><i class="fa-solid fa-circle-info "></i></button>
                <button class="bg-[#1a91ff1a] rounded-sm p-2"><i class="fa-solid fa-volume-high "></i></button>
            </div>
        </div>
        
        `;
    wordContainer.appendChild(wordCard);
  }
};

loadLesson();
