let registerForm = document.getElementById('registerForm');
let fullNameInput = document.getElementById('fullName');
let emailInput = document.getElementById('email');
let passwordInput = document.getElementById('password');
let eye = document.getElementsByClassName('icon')[0];
let eye2 = document.getElementsByClassName('icon')[1];
let validateMsg = document.getElementById('validate');
let emptyMsg = document.getElementsByClassName('empty')[1];
let emptyNameMsg = document.getElementsByClassName('empty')[0];
let emptyPassMsg = document.getElementsByClassName('empty')[2];
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
 let name = fullNameInput.value;
  let email = emailInput.value;
  let pass = passwordInput.value;
  let bool = false;
  fetch("http://localhost:3000/user")
    .then((res) => res.json())
    .then((data) => {
      let bool = data.find(
        (u) => u.email.trim().toLowerCase() == email.trim().toLowerCase()
      );
      if (bool) {
        validateMsg.classList.remove('hidden');
      } else {
        if (name.trim() !== "" && email.trim() !== "" && pass.trim() !== "") {
          fetch("http://localhost:3000/user", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({ name, email, pass }),
          });

          window.location.href = "http://127.0.0.1:5500/ui/pages/login.html";
        }else{
        if(emailInput.trim() == "" ){
          emptyMsg.classList.remove('hidden');
        }
        if(fullNameInput.trim() == "" ){
          emptyNameMsg.classList.remove('hidden');
        }
        if(passwordInput.trim() == "" ){
          emptyPassMsg.classList.remove('hidden');
      }}
      }
    });
});
eye.addEventListener('click', () => {
  passwordInput.type = 'text';
  eye.classList.add('hidden');
  eye2.classList.remove('hidden');
});
eye2.addEventListener('click', () => {
  passwordInput.type = 'password';
  eye2.classList.add('hidden');
  eye.classList.remove('hidden');
});
emailInput.addEventListener('keydown', () => {
  validateMsg.classList.add('hidden');
  emptyMsg.classList.add('hidden');

});
fullNameInput.addEventListener('keydown', () => {
  emptyNameMsg.classList.add('hidden');
});
passwordInput.addEventListener('keydown', () => {
  emptyPassMsg.classList.add('hidden');
});