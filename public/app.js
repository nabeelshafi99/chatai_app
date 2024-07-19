// imports
import { auth, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, collection, getDocs, addDoc, db ,signOut } from "./config.js"

import { genAI } from './ai.js'


let isSignup = false;

  
const loginUi = () => {
  return `<div class="auth d-flex align-items-center">
  
      <div class="formBox py-4 bg-dark text-light">
        <div class="container">
          <h4 class="text-center fw-bold fs-4 text-light ">Login</h4>
          <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input type="email" class="form-control" id="email" placeholder="name@example.com">
          </div>
          <div class="mb-3">
            <label for="Password" class="form-label">Password</label>
            <input type="password" class="form-control" id="password" placeholder="Password">
          </div>
          <div class="log-btn my-3">
            <button onclick="logInBtn()" class="btn btn-success w-100 rounded-5">Login</button>
          </div>
  
          <hr class="border" />
  
          <div class="sin-btn">
            <button onclick="authUi()" class="btn btn-light w-100 rounded-5">Signup</button>
          </div>
  
        </div>
      </div>
    </div>`
}

const signupUi = () => {
  return `<div class="auth d-flex align-items-center">
  
      <div class="formBox py-4 bg-dark text-light">
        <div class="container">
          <h4 class="text-center fw-bold fs-4 text-light ">Signup</h4>
          <div class="mb-3">
  
            <label for="fullname" class="form-label">Full Name</label>
  
            <input type="text" class="form-control" id="fullname" placeholder="Enter your full name">
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input type="email" class="form-control" id="email" placeholder="name@example.com">
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" id="password" placeholder="Password">
          </div>
          <div class="log-btn my-3">
            <button onclick="signUpBtn()" class="btn btn-success w-100 rounded-5">Signup</button>
          </div>
  
          <hr class="border" />
  
          <div class="sin-btn">
            <button onclick="authUi()" class="btn btn-light w-100 rounded-5">Login</button>
          </div>
  
        </div>
      </div>
    </div>`
}


const aiConverUi = () => {
  return ` <div class="nav-box position-fixed bottom-0 w-100">

      <div class="container">
        <div class="d-flex align-items-center my-2">
          <div class="writemsg">

            <input type="text" placeholder="Message" class="form-control write-field rounded-5 px-3" id='writemsg'>

          </div>
          <div class="ms-2 sentBtn" onclick='airun()'>
            <button class="btn btn-success">
              <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>

        </div>
      </div>

    </div>

    <div class="container-fluid  bg-dark text-light">

      <div class="header-box d-flex justify-content-between align-items-center py-2">
        

 <span class="d-flex justify-content-between align-items-center w-100 px-4">
          <div class="d-flex align-items-center gap-3">
            <div class="us-pr-pic">
              <img src="./ai.jpg" alt="./">
            </div>
            <div class="d-flex flex-column justify-content-center">
              <div class="us-pr-ti">Chat with Ai</div>
      
            </div>
          </div>
           <div style="cursor:pointer;" class="p-2" data-bs-toggle="modal" data-bs-target="#signOut">
                  <i class="fa-solid fa-ellipsis-vertical fs-3"></i>
                </div>
        </span>
       


      </div>

    </div>

    <div class="modal fade" id="signOut" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content d-flex p-5 bg-dark">
      <h4 class="text-center">Are your sure?</h4>
      <button class="btn btn-success mt-2" onclick="signout()">Signout</button>
    </div>
  </div>
</div>

    <div class="content-box container-fluid my-2 overflow-auto d-flex flex-column">
<div class="chat-container">
</div>
    </div>
`
}

function logInBtn() {
  const email = document.getElementById("email")
  const password = document.getElementById("password")

  const emailRegax = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (emailRegax.test(email.value)) {
    console.log("Valid email address");

    if (password.value.trim()) {

      const auth = getAuth();
      signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
          const user = userCredential.user;
          window.location.reload()
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });

      email.value = ""
      password.value = ""

    } else {
      password.style.border = "2px solid red"
      password.focus()
    }

  } else {
    email.style.border = "2px solid red"
    email.focus()
  }

}

function signUpBtn() {
  const fullname = document.getElementById("fullname")
  const email = document.getElementById("email")
  const password = document.getElementById("password")

  // regax
  const emailRegax = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegax = /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,}$/;


  if (fullname.value.trim()) {

    if (emailRegax.test(email.value)) {

      if (passwordRegax.test(password.value)) {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email.value, password.value)
          .then((userCredential) => {
            const user = userCredential.user;
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
          });

        fullname.value = ""
        email.value = ""
        password.value = ""
      } else {
        password.style.border = "2px solid red"
        password.focus()
      }

    } else {
      email.style.border = "2px solid red"
      email.focus()
    }


  } else {
    fullname.style.border = "2px solid red"
    fullname.focus()
  }

}

function authUi() {
  const rootBox = document.getElementById("rootBox")

  if (isSignup) {
    rootBox.innerHTML = loginUi()
    isSignup = false;
  } else {
    rootBox.innerHTML = signupUi()
    isSignup = true;
  }

}

function aiConver() {
  rootBox.innerHTML = aiConverUi()
}

async function renderMsg(text, side) {

  if (text && side) {
     try {
  const docRef = await addDoc(collection(db, "chatai"), {
    msg: text,
    side: side,
  });
  // console.log("Document written with ID: ", docRef.id);
} catch (e) {
  // console.error("Error adding document: ", e);
     }
  }
  
  
  const chatUi = document.querySelector(".chat-container")
  const messageHTML = `
    <div class="message ${side}">${text}</div>
  `;
  chatUi.innerHTML += messageHTML;

 

}


async function airun() {

  const writemsg = document.getElementById('writemsg')

  let text = writemsg.value
  
  if (writemsg) {
        const prompt = writemsg.value
    if(writemsg.value){
    renderMsg(text, 'right')
      }
    writemsg.value = ''

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    renderMsg(response.text(), 'left') ;  
    
  }
}



function signout(){
  const auth = getAuth();
  signOut(auth).then(() => {
    window.location.reload();
    alert("Signout Successfully")
  }).catch((error) => {
    alert("Sign out failed: " + error.message);
  });
}

  window.onload = () => {
    const rootBox = document.getElementById("rootBox")

    getAuth()
 onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      if (uid) {
      rootBox.innerHTML = aiConverUi()
      }
      
    } else {
      rootBox.innerHTML = loginUi()
    }
  });
  }




  window.authUi = authUi;
  window.logInBtn = logInBtn;
  window.signUpBtn = signUpBtn;
  window.aiConver = aiConver;
  window.airun = airun;
  window.signout = signout
