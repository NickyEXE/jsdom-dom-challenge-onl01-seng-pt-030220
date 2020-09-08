const counter = document.getElementById("counter")
const plus = document.getElementById("plus")
const minus = document.getElementById("minus")
const pause = document.getElementById("pause")
const form = document.getElementById("comment-form")
const likeList = document.querySelector(".likes")
const list = document.getElementById("list")
const heart = document.getElementById("heart")


const countUp = () => counter.innerText ++
const countDown = () => counter.innerText --

function pauseCount(){
  counter.classList.remove("paused")
  interval = setInterval(countUp, 1000)
  pause.innerText = "pause"
}

function unpauseCount(){
  counter.classList.add("paused")
  clearInterval(interval)
  pause.innerText = "resume"
}

function toggleButtons(){
  document.querySelectorAll("button").forEach(button => {
    if (button.id !== "pause"){
      button.disabled = !button.disabled
    }
  })
}

function like(){
  let currentSecond = counter.innerText
  let li = document.getElementById(`second-${currentSecond}`)
  if (li){
    li.innerText = `${currentSecond} has been liked ${++li.dataset.likes} times.`
  }
  else {
    likeList.innerHTML += `<li id=second-${currentSecond} data-likes=1>${currentSecond} has been liked 1 time.</li>`
  }
}

heart.addEventListener("click", like)
plus.addEventListener("click", countUp)
minus.addEventListener("click", countDown)
pause.addEventListener("click", () => {
  counter.classList.contains("paused") ? pauseCount() : unpauseCount()
  toggleButtons()
})
let interval = setInterval(countUp, 1000)
