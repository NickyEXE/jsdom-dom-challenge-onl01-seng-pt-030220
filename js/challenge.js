const state = {
  count: 0,
  paused: false,
  likes: {}
}
const counter = document.getElementById("counter")
const plus = document.getElementById("plus")
const minus = document.getElementById("minus")
const pause = document.getElementById("pause")
const form = document.getElementById("comment-form")
const likeList = document.querySelector(".likes")
const list = document.getElementById("list")
const heart = document.getElementById("heart")



function count(num){
  if (!state.paused){
    state.count += num
    counter.innerText = state.count
  }
}

function like(){
  (state.likes[state.count]) ? state.likes[state.count] ++ : state.likes[state.count] = 1
  renderLikes()
}

function renderLikes(){
  likeList.innerHTML = ""
  Object.entries(state.likes).forEach(likeArray => {
    const second = likeArray[0]
    const likes = likeArray[1]
    renderLike(second, likes)
  })
}

function renderLike(second, likes){
  const li = document.createElement("li")
  li.innerText = `${second} has been liked ${likes} time${state.likes[second] === 1 ? "" : "s"}.`
  likeList.appendChild(li)
}


function pauseApp(){
  state.paused = !state.paused
  Array.from(document.querySelectorAll("button")).forEach(button=>{
    if (button.id !== "pause") {
      button.disabled = !button.disabled
    }
  })
  pause.innerText = state.paused ? "resume" : "pause"
}

function addComment(e){
  e.preventDefault()
  let input = form.comment.value
  const comment = document.createElement("p")
  comment.innerText = input
  list.appendChild(comment)
  form.reset()
}

const buttonFunctions = {
  "plus": () => count(1),
  "minus": () => count(-1),
  "pause": pauseApp,
  "heart": like
}

setInterval(() => count(1), 1000)
form.addEventListener("submit", addComment)
document.addEventListener("click", (e) => {
  buttonFunctions[e.target.id] && buttonFunctions[e.target.id]()
})
