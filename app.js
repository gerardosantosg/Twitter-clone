let text = document.getElementById("text-area");
let submit = document.getElementById("submit");
let publications = document.getElementById("publications");
let startLikes = 0;
let h1 = document.querySelector("h1");
let loginBtn = document.getElementById("loginBtn");
let form = document.querySelector(".login");
let happening = document.querySelector(".happening");
let tweets = [];
let username = "";

function setDate() {
  let today = new Date();
  let date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  let time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let dateTime = date + " " + time;
  return dateTime;
}
function loginRequest(e) {
  e.preventDefault();
  let usernameEntered = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  if (usernameEntered.length > 3 && password.length > 3) {
    removeForm();
    return (username += usernameEntered);
  } else {
    alert("username and password must have at least 4 characters");
    return;
  }
}
function removeForm() {
  form.classList.toggle("visible");
  happening.classList.toggle("noHappening");
}
function post(id, text) {
  let dateTime = setDate();
  let newTweetInList = document.createElement("li");
  startLikes = 0;
  newTweetInList.className = "card";
  newTweetInList.innerHTML = `
    <span><h3 class="username"> @${username}</h3><i class="fa fa-trash remove" aria-hidden="true"></i></span>
  <p class="published">${text}</p>
  <span class="cointainer"><h6 class="date">Tweeted ${dateTime}</h6><i class="fa fa-thumbs-up like liked" aria-hidden="true"></i><h5 class="counter">${startLikes}</h5></span>
  `;
  const listRoot = document.getElementById("publications");
  listRoot.append(newTweetInList);
  clearInputs();
  addEventListenerToRemoveBtn(id);
  liking(id);
}
function addEventListenerToRemoveBtn(id) {
  let removeBtn = document.querySelectorAll(".remove");
  for (let i = 0; i < removeBtn.length; i++) {
    if (i === removeBtn.length - 1) {
      removeBtn[i].addEventListener("click", deleteTweet.bind(null, id));
    }
  }
}
function deleteTweet(id) {
  let tweetIndex = 0;
  for (let tweet of tweets) {
    if (tweet.id === id) {
      break;
    }
    tweetIndex++;
  }

  if (confirm("Do you really want to delete this item?")) {
    tweets.splice(tweetIndex, 1);
    const listRoot = document.getElementById("publications");
    listRoot.children[tweetIndex].remove();
  }
}

function liking(id) {
  let likeBtn = document.querySelectorAll(".like");
  for (let i = 0; i < likeBtn.length; i++) {
    if (i === likeBtn.length - 1) {
      let transferLikeBtn = likeBtn[i];
      likeBtn[i].addEventListener(
        "click",
        addLike.bind(null, id, transferLikeBtn)
      );
    }
  }
}
function addLike(id, likeBtn) {
  let likeCounter = document.querySelectorAll(".counter");
  let tweetIndex = 0;
  startLikes = 0;
  for (let tweet of tweets) {
    if (tweet.id === id) {
      startLikes += 1;
      likeBtn.style.color = "blue";
      break;
    }
    tweetIndex++;
  }
  likeCounter[tweetIndex].textContent = startLikes;
}

function clearInputs() {
  text.value = "";
}

function checkForEmptyFields() {
  if (text.value === "") alert("You need to enter some text");
}

function createTweetObject() {
  let tweetValue = text.value;
  if (tweetValue.trim() === "") {
    alert("Empty tweets are not allowed");
    return;
  }
  let newTweet = {
    id: Math.random(),
    text: tweetValue,
  };
  tweets.push(newTweet);
  post(newTweet.id, newTweet.text);
}

loginBtn.addEventListener("click", loginRequest);
submit.addEventListener("click", createTweetObject);
