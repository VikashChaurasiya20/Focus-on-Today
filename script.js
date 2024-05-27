const checkBoxList = document.querySelectorAll('.check-box');
const inputFields = document.querySelectorAll('.goal-input');
const errorLevel = document.querySelector('.error-label');
const progressBar = document.querySelector('.progress-bar');
const progressValue = document.querySelector('.progress-value');


const allGoals =JSON.parse(localStorage.getItem('allGoals')) ||{}
checkBoxList.forEach((checkbox)=>{
    // console.log(checkbox);
    checkbox.addEventListener('click',(e)=>{
        // console.log('CheckBox Clicked');
        const allGoalsAdded = [...inputFields].every(function(input){
            return input.value
        })
        if(allGoalsAdded){

            checkbox.parentElement.classList.toggle('completed')
            // progressValue.style.width='33.33%'
       const inputId = checkbox.nextElementSibling.id
       console.log(inputId);
       allGoals[inputId].completed =  !allGoals[inputId].completed
       localStorage.setItem('allGoals',JSON.stringify(allGoals))

        }
        else{
           progressBar.classList.add('show-error')
        }
    })
})
inputFields.forEach((input)=>{

    input.value = allGoals[input.id].name

    if(allGoals[input.id].completed){
        input.parentElement.classList.add('completed')
    }
    input.addEventListener('focus',()=>{
        progressBar.classList.remove('show-error')

    })
    input.addEventListener('input',(e)=>{
        allGoals[input.id]={
            name:input.value,
            completed:false,
        }
        localStorage.setItem('allGoals',JSON.stringify(allGoals))
        console.log(input.id);
        console.log(allGoals);
    })

})

// const allGoals ={
//     first:{
//         name:'Learn Js',
//         completed: false
//     },
//     second:{
//         name:'Learn Angular',
//         completed: false
//     },
//     third:{
//         name:'Reading Book',
//         completed: false
//     }
// }

