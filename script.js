const products = {
    "Kiwis": ["/img/Kiwi.jpg", "/img/unnamed.jpg", "/img/kiwi1.jpg"],
    "Lemons": ["/img/lemon1.jpg", "/img/lemon3.jpg", "/img/lemon3.jpg"],
    "Strawberries": ["/img/sb1.jpg", "/img/sb3.png", "/img/sb3.png"],
    "Figs": ["/img/fig1.jpg", "/img/fig2.jpeg", "/img/fig3.jpg"],
    "Nectarines": ["/img/nec1.webp", "/img/nec2.jpg", "/img/nec3.jpg"],
    "Watermelons": ["/img/wt1.png", "/img/wt1.png", "/img/wt2.jpg"],
};

// Lưu trữ dữ liệu vào localStorage
localStorage.setItem("products", JSON.stringify(products));

function populateSidebar() {
    var data = JSON.parse(localStorage.getItem("products"));
    var container = document.querySelector('.search-container');
    container.innerHTML = '';

    if (data != null) {
        for (var category in data) {
            // Chọn ảnh đầu tiên trong mảng ảnh cho mỗi loại trái cây
            var imageSrc = data[category][0];
            
            var item_html = `
                <div class="fruit-item" data-category="${category}">
                    <div class="fruit-image">
                        <img src="${imageSrc}" alt="${category}">
                    </div>
                    <div class="fruit-info">
                        <h3>${category}</h3>
                        <p>Collection of high resolution photos of ${category}.</p>
                    </div>
                </div>
            `;
            container.innerHTML += item_html;
        }
    }

    // Đặt sự kiện click cho các mục trái cây
    const firstItem = container.querySelector('.fruit-item');
    if (firstItem) {
        firstItem.classList.add('active');
        displayImages(firstItem.getAttribute('data-category'));
    }

    const fruitItems = container.querySelectorAll('.fruit-item');
    fruitItems.forEach(item => {
        item.addEventListener('click', function () {
            fruitItems.forEach(li => li.classList.remove('active'));
            this.classList.add('active');
            displayImages(this.getAttribute('data-category'));
        });
    });
}

function displayImages(category) {
    var data = JSON.parse(localStorage.getItem("products"));
    var images = data[category];

    var photosSection = document.querySelector('.photos');
    photosSection.innerHTML = '';

    images.forEach(src => {
        var img = document.createElement('img');
        img.src = src;
        img.alt = category;
        photosSection.appendChild(img);
    });

    var header = document.querySelector('main header h2');
    header.textContent = category;
}

// Gọi hàm để điền các mục trái cây vào sidebar
populateSidebar();
