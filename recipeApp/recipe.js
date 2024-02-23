
const inputArea = document.getElementById("inp")
const btn = document.querySelector("form")
const container = document.querySelector(".recipe-container")
const recipeDetailsContent = document.querySelector(".recipeDetailsContent")
const recipeCloseBtn = document.querySelector(".closeBtn")


btn.addEventListener("submit" , function(event){
    event.preventDefault()
    const input = inputArea.value.trim()
    validateFxn(input)
},false)

function validateFxn(value){
    
    if (!value) {
      alert("Input must Required")
    }
    else{
        inputArea.value = ""
        apiRequest(value)
    }
    
}

async function apiRequest(item){
    try {
        container.innerHTML = "<h2>Fetching Recipes...</h2>"
        // console.log(item);
        const myApi = `https://www.themealdb.com/api/json/v1/1/search.php?s=${item}`
        const dataToFetch = await fetch(myApi)
        const jsonData = await dataToFetch.json()
        addInformation(jsonData)
    } catch (error) {
       container.innerHTML = `<img src="../portfolioWebsite/images/Error.png" alt="404" height="400px">`
    }

}


function addInformation(item){
console.log(item);
const myArray = item

container.innerHTML = ""
myArray.meals.map(function(element , index , array){
    const div = document.createElement("div")
    // className
    div.classList.add("recipe")

    div.innerHTML = `
    <img src="${element.strMealThumb}" alt="image">
    <h3>${element.strMeal}</h3>
    <p><span>${element.strArea}</span> Dish</p>
    <p>Belongs to <span>${element.strCategory}</span> Category</p>
    `
    const button =  document.createElement("button")
    button.textContent = "View Recipe"
    div.appendChild(button)

 button.addEventListener("click" , function(){
    openRecipePopup(element)
 })

//  button.addEventListener("click" ,   openRecipePopup(element))
    container.appendChild(div)
})
}

function ingredentdList(meal){
let ingredentList  = ""

for(let i = 1; i < 20; i++){
    const currentIngredent = meal[`strIngredient${i}`]

    if(currentIngredent){
        const measure = meal[`strMeasure${i}`]
        ingredentList += `<li>${measure} ${currentIngredent}</li>`
    }
    else{
        break
    }
}
return ingredentList
}  


function openRecipePopup(values) {
 recipeDetailsContent.innerHTML = `
     <h2 class="recipeName">${values.strMeal}</h2>
     <h3>Ingredients: </h3>
     <ul class="ingredientsList">${ingredentdList(values)}</ul>

     <div class="instructions">
    <h3>Instructions:</h3>
    <p>${values.strInstructions}</p>
 </div>
 `  
 
 recipeDetailsContent.parentElement.style.display = "block"
}

recipeCloseBtn.addEventListener("click" , function(event){
    recipeDetailsContent.parentElement.style.display = "none"
},false)