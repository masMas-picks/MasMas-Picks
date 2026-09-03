const container = document.getElementById("produk");
const search = document.getElementById("search");
const buttons = document.querySelectorAll(".kategori button");

let allProducts = [];
let activeCategory = "All";
let keyword = "";


/* =========================
   AMBIL DATA PRODUK
========================= */

fetch("data/products.json")
    .then(res => {
        if (!res.ok) {
            throw new Error("Gagal mengambil products.json");
        }

        return res.json();
    })

    .then(products => {

        allProducts = products;

        tampilkanProduk();

    })

    .catch(error => {

        console.error(error);

        container.innerHTML = `
            <p style="
                color:#9CA3AF;
                text-align:center;
                padding:30px;
            ">
                Produk gagal dimuat.
                <br>
                Periksa file data/products.json
            </p>
        `;

    });


/* =========================
   TAMPILKAN PRODUK
========================= */

function tampilkanProduk() {

    container.innerHTML = "";

    const hasil = allProducts.filter(product => {

        const cocokKategori =
            activeCategory === "All" ||
            product.category === activeCategory;

        const cocokSearch =
            product.name
                .toLowerCase()
                .includes(keyword);

        return cocokKategori && cocokSearch;

    });


    /* Tidak ada produk */

    if (hasil.length === 0) {

        container.innerHTML = `
            <p style="
                grid-column:1/-1;
                text-align:center;
                color:#9CA3AF;
                padding:40px 10px;
            ">
                😔 Produk tidak ditemukan.
            </p>
        `;

        return;
    }


    /* Tampilkan produk */

    hasil.forEach(product => {

        container.innerHTML += `

            <div class="card">

                ${
                    product.badge
                    ?
                    `<span class="badge-card">
                        ${product.badge}
                    </span>`
                    :
                    ""
                }

                <div class="gambar">

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                        loading="lazy"
                    >

                </div>


                <h3>
                    ${product.name}
                </h3>


                ${
                    product.rating
                    ?
                    `<p class="rating">
                        ⭐ ${product.rating}
                    </p>`
                    :
                    ""
                }


                ${
                    product.review
                    ?
                    `<p class="review">
                        💬 ${product.review}
                    </p>`
                    :
                    ""
                }


                ${
                    product.price
                    ?
                    `<p class="harga">
                        ${product.price}
                    </p>`
                    :
                    ""
                }


                <a
                    href="${product.affiliate}"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Cek Detail Produk
                </a>

            </div>

        `;

    });

}


/* =========================
   SEARCH
========================= */

search.addEventListener("input", () => {

    keyword = search.value
        .toLowerCase()
        .trim();

    tampilkanProduk();

});


/* =========================
   KATEGORI
========================= */

buttons.forEach(button => {

    button.addEventListener("click", () => {

        activeCategory = button.dataset.category;


        /* Ubah tombol aktif */

        buttons.forEach(btn => {

            btn.classList.remove("active");

        });

        button.classList.add("active");


        tampilkanProduk();

    });

});


/* =========================
   DEFAULT
========================= */

const tombolSemua = document.querySelector(
    '.kategori button[data-category="All"]'
);

if (tombolSemua) {
    tombolSemua.classList.add("active");
}