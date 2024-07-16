const checkBoxList = document.querySelectorAll(".check-box");
const inputFields = document.querySelectorAll(".goal-input");
const errorLevel = document.querySelector(".error-label");
const progressLevel = document.querySelector(".progress-label");
const progressBar = document.querySelector(".progress-bar");
const progressValue = document.querySelector(".progress-value");

const allQuotes = [
  "Raise the bar by completing goals!",
  "Well begun is half done!",
  "Just a step away, keep going!",
  "Whoa! You just completed all the goals, time for chill ",
];

const allGoals = JSON.parse(localStorage.getItem("allGoals")) || {
  first: { name: "", completed: false },
  second: { name: "", completed: false },
  third: { name: "", completed: false },
};
let completedGoalsCount = Object.values(allGoals).filter(
  (goal) => goal.completed
).length;
progressValue.style.width = `${(completedGoalsCount / inputFields.length) * 100}%`;
progressValue.firstElementChild.innerText = `${completedGoalsCount}/${inputFields.length} Completed`;
progressLevel.innerText = allQuotes[completedGoalsCount];

checkBoxList.forEach((checkbox) => {
  // console.log(checkbox);
  checkbox.addEventListener("click", (e) => {
    // console.log('CheckBox Clicked');
    const allGoalsAdded = [...inputFields].every(function (input) {
      return input.value;
    });
    if (allGoalsAdded) {
      checkbox.parentElement.classList.toggle("completed");
      const inputId = checkbox.nextElementSibling.id;
      console.log(inputId);
      allGoals[inputId].completed = !allGoals[inputId].completed;
      completedGoalsCount = Object.values(allGoals).filter(
        (goal) => goal.completed
      ).length;

      progressValue.style.width = `${(completedGoalsCount / inputFields.length) * 100}%`;
      progressValue.firstElementChild.innerText = `${completedGoalsCount}/${inputFields.length} Completed`;
      progressLevel.innerText = allQuotes[completedGoalsCount];

      localStorage.setItem("allGoals", JSON.stringify(allGoals));
    } else {
      progressBar.classList.add("show-error");
    }
  });
});
inputFields.forEach((input) => {
  input.value = allGoals[input.id].name;

  if (allGoals[input.id].completed) {
    input.parentElement.classList.add("completed");
  }
  input.addEventListener("focus", () => {
    progressBar.classList.remove("show-error");
  });
  input.addEventListener("input", (e) => {
    if (allGoals[input.id].completed) {
      input.value = allGoals[input.id].name;
      return;
    }
    
    allGoals[input.id].name= input.value,
    localStorage.setItem("allGoals", JSON.stringify(allGoals));
    console.log(input.id);
    console.log(allGoals);
  });
});

