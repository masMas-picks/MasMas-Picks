const container = document.getElementById("produk");
const search = document.getElementById("search");

let allProducts = [];

fetch("data/products.json")
.then(res => res.json())
.then(products => {

    allProducts = products;

    tampilkanProduk(products);

});

function tampilkanProduk(products){

    container.innerHTML = "";

    products.forEach(product=>{

        container.innerHTML += `
        <div class="card">
        
           ${product.badge ? `<span class="badge-card">${product.badge}</span>` : ""}
        
            <div class="gambar">
                <img src="${product.image}" alt="${product.name}">
            </div>
        
            <h3>${product.name}</h3>
        
            ${product.rating ? `<p class="rating">⭐ ${product.rating}</p>` : ""}
        
            <p class="harga">${product.price}</p>
        
            <a href="${product.affiliate}" target="_blank">
                cek detail produk
            </a>
        
        </div>
        `;

    });

}

search.addEventListener("input",()=>{

    const keyword = search.value.toLowerCase();

    const hasil = allProducts.filter(product=>

        product.name.toLowerCase().includes(keyword)

    );
    
    console.log(keyword);
    console.log(hasil);

    tampilkanProduk(hasil);

});

const buttons = document.querySelectorAll(".kategori button");

buttons.forEach(button => {

    button.addEventListener("click", () => {

        const category = button.dataset.category;

        if(category === "All"){
            tampilkanProduk(allProducts);
            return;
        }

        const hasil = allProducts.filter(product =>
            product.category === category
        );

        tampilkanProduk(hasil);

    });

});