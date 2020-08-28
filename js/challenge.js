const state = {
  running: true,
  timer: 0,
  seconds: {},
}

function handleClick(e){
  switch (e.target.id){
    case "pause":
      togglePause()
      break;
    case "plus":
      changeTime(1)
      break;
    case "minus":
      changeTime(-1)
    break;
    case "heart":
      likeSecond()
    break;
  }
}

function handleSubmit(e){
  e.preventDefault()
  document.getElementById("list").innerHTML += `<li>${e.target.comment.value}</li>`
  e.target.reset()
}

function togglePause(){
  state.running = !state.running
  document.querySelectorAll("button").forEach(node => (node.id !== "pause") && (node.disabled = !node.disabled))
}

function changeTime(num){
  state.running && (state.timer += num)
  renderTimer()
}

function likeSecond(){
  state.seconds[state.timer] ? state.seconds[state.timer]++ : state.seconds[state.timer] = 1;
  renderSeconds()
}

function renderTimer(){
  document.getElementById("counter").innerText = state.timer
}

function renderSeconds(){
  document.querySelector(".likes").innerHTML = ""
  Object.entries(state.seconds).forEach(renderSecond)
}

function renderSecond(arr){
  document.querySelector(".likes").innerHTML += `<li>${arr[0]} has been liked ${arr[1]} time${arr[1] > 1 ? "s" : ""}.</li>`
}

document.addEventListener("click", handleClick)
document.getElementById("comment-form").addEventListener("submit", handleSubmit)
setInterval(() => changeTime(1), 1000)
