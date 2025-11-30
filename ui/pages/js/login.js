let loginForm = document.getElementById('login');
let emailInput = document.getElementById('email');
let passwordInput = document.getElementById('password');
let eye = document.getElementsByClassName('icon')[0];
let eye2 = document.getElementsByClassName('icon')[1];
let emptyMsg = document.getElementsByClassName('empty')[0];
let emptyPassMsg = document.getElementsByClassName('empty')[1];

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
     let email = emailInput.value.trim();
  let pass = password.value.trim();
  fetch("http://localhost:3000/user")
    .then((res) => res.json())
    .then((data) => {
      let user = data.find((user) => user.email.trim() == email);
      console.log(user);
      if (user && user.pass == pass) {
        localStorage.setItem("id", user.id);
        window.location.href = "http://127.0.0.1:5500/ui/index.html";
      }
       if(!user || user.pass != pass){
        alert("mail ve ya şifrə yanlışdır");
      }
      else{
        if(emailInput.trim() == "" ){
          emptyMsg.classList.remove('hidden');
        }
        if(passwordInput.trim() == "" ){
          emptyPassMsg.classList.remove('hidden');
      }}
      
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
  emptyMsg.classList.add('hidden');
});
passwordInput.addEventListener('keydown', () => {
  emptyPassMsg.classList.add('hidden');
});