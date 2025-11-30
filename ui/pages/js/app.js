let login = document.getElementsByClassName("log")[0];
let logOut = document.getElementsByClassName("log")[1];
let id = localStorage.getItem("id");
let productList = document.getElementById("productList");

window.addEventListener("DOMContentLoaded", () => {
  if (id) {
    login.classList.add("hidden");
    logOut.classList.remove("hidden");
  } else {
    login.classList.remove("hidden");
    logOut.classList.add("hidden");
  }
});

logOut.addEventListener("click", (e) => {
  localStorage.removeItem("id");
});

fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((e) => {
      productList.innerHTML += `
       <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex">
        <div class="relative w-64 flex-shrink-0 bg-gray-100">
            <img src="${
              e.image
            }" alt="Məhsul" class="w-full h-full object-contain p-4">
            
          
            <span class="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">-20%</span>
            
            <!-- Ürək İkonu -->
            <button class="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-red-500 hover:text-white transition">
                <i class="fa-regular fa-heart"></i>
            </button>
        </div>
        
        <div class="flex-1 p-6 flex flex-col justify-between">
            <div>
                <div class="mb-2">
                    <span class="text-xs text-gray-500 uppercase font-semibold">${
                      e.category
                    }</span>
                </div>
                <h3 class="text-2xl font-bold text-gray-800 mb-3">${
                  e.title
                }</h3>
                
                <p class="text-gray-600 mb-4">${e.description}</p>
                
             
                <div class="flex items-center mb-4">
                    <div class="flex text-yellow-400 text-lg">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                    </div>
                    <span class="text-gray-500 ml-2">(${
                      e.rating.count
                    } rəy)</span>
                </div>
            </div>
            
            <div class="flex items-center justify-between">
               
                <div>
                    <span class="text-3xl font-bold text-blue-600">$${
                      e.price
                    }</span>
                    <span class="text-lg text-gray-400 line-through ml-2">$${(
                      e.price * 1.25
                    ).toFixed(2)}</span>
                </div>
                
                <button class="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition flex items-center space-x-2" onclick="addToCart(${
                  e.id
                })">
                    <i class="fa-solid fa-cart-shopping"></i>
                    <span>Səbətə əlavə et</span>
                </button>
            </div>
        </div>
    </div>
`;
    });
  });

function addToCart(id) {
  let idUser = localStorage.getItem("id");
  if (idUser) {
    fetch(`http://localhost:3000/sebet`)
    .then((res) => res.json())
    .then((data) => {
      let bool = data.find((e) => e.id == id && e.idUser == idUser);
      if (!bool) {
        fetch(`http://localhost:3000/sebet`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, idUser }),
        });
      }else {
        alert("Bu məhsul artıq səbətdədir");
      }

    });
  }else {
    alert("Zəhmət olmasa, əvvəlcə daxil olun");
  }
}
