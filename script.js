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
                 <button  class="btn btn-soft btn-primary"
                ><i class="fa-solid fa-book-open mr-2"></i>Lesson-${lesson.level_no}
                </button>
        
        `;
    levelContainer.appendChild(btnDiv);
  }
};
loadLesson();
