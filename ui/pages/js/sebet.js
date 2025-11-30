let idUser = localStorage.getItem("id");
let sebet = document.getElementById("productList");
let login = document.getElementsByClassName("log")[0];
let logOut = document.getElementsByClassName("log")[1];
let id = localStorage.getItem("id");
let sebetContainer = document.getElementById("sbt");

window.addEventListener("DOMContentLoaded", () => {
  if (id) {
    login.classList.add("hidden");
    logOut.classList.remove("hidden");
  } else {
    login.classList.remove("hidden");
    logOut.classList.add("hidden");
    sebetContainer.innerHTML = `<main class="container mx-auto px-4 py-12">
        <div class="max-w-2xl mx-auto">
            <div class="bg-white rounded-2xl shadow-lg p-8 text-center">
          
                <div class="mb-6">
                    <div class="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                        <i class="fa-solid fa-lock text-blue-600 text-5xl"></i>
                    </div>
                </div>

                <h1 class="text-3xl font-bold text-gray-800 mb-4">
                    Səbət boşdur
                </h1>

                <div class="space-y-4 text-gray-600 mb-8">
                    <p class="text-lg">
                        Səbətə məhsul əlavə etmək üçün hesabınıza daxil olmalısınız.
                    </p>
                    <p>
                        Giriş etdikdən sonra bəyəndiyiniz məhsulları səbətə əlavə edə və alış-verişinizi tamamlaya bilərsiniz.
                    </p>
                </div>

                <div class="mt-8 pt-8 border-t border-gray-200">
                    <a href="../index.html" class="text-gray-600 hover:text-blue-600 transition flex items-center justify-center gap-2">
                        <i class="fa-solid fa-arrow-left"></i>
                        Alış-verişə davam et
                    </a>
                </div>

            </div>

        </div>
    </main>`

  }
});
logOut.addEventListener("click", (e) => {
  localStorage.removeItem("id");
});

fetch(`http://localhost:3000/sebet`)
.then(res => res.json())
.then(data => {
    data.filter(e =>{
      let bool = e.idUser == idUser;
      if(bool) {
        fetch(`https://fakestoreapi.com/products`)
    .then(res => res.json())
    .then(data => {
        data.filter(j =>{
            if(j.id == e.id){
                sebet.innerHTML += `
                <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex">
       
        <div class="relative w-64 flex-shrink-0 bg-gray-100">
            <img src="${j.image}" alt="Məhsul" class="w-full h-full object-contain p-4">
            
           
            <span class="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">-20%</span>
            
            <!-- Ürək İkonu -->
            <button class="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-red-500 hover:text-white transition">
                <i class="fa-regular fa-heart"></i>
            </button>
        </div>
        
      
        <div class="flex-1 p-6 flex flex-col justify-between">
            <div>
                <div class="mb-2">
                    <span class="text-xs text-gray-500 uppercase font-semibold">${j.category}</span>
                </div>
                <h3 class="text-2xl font-bold text-gray-800 mb-3">${j.title}</h3>
                
                <p class="text-gray-600 mb-4">${j.description}</p>
                
                
            </div>
            
            <div class="flex items-center justify-between">
               
                <div>
                    <span class="text-3xl font-bold text-blue-600">$${j.price}</span>
                    <span class="text-lg text-gray-400 line-through ml-2">$${(j.price * 1.25).toFixed(2)}</span>
                </div>
                 <button class="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition flex items-center space-x-2" Onclick="deleteFromCart(${j.id})">
                  Səbətdən Sil
                </button>
              
            </div>
        </div>
    </div>
`;
            }
        })
    });

      }
        
    })

});

function deleteFromCart(id){
    fetch(`http://localhost:3000/sebet/${id}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        console.log('Məhsul səbətdən silindi:', data);
        location.reload();
    })
    .catch(error => {
        console.error('Xəta baş verdi:', error);
    });
}