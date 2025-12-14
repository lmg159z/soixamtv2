const hamburgerBtn = document.getElementById('hamburger-btn');
const navMenu = document.getElementById('nav-menu');
const icon = hamburgerBtn.querySelector('i');

hamburgerBtn.addEventListener('click', () => {
    // Toggle class 'active' cho menu
    navMenu.classList.toggle('active');

    // Đổi icon từ 3 gạch sang dấu X và ngược lại
    if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
    } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    }
});

// Đóng menu khi click vào vùng content bên dưới (tùy chọn)
document.querySelector('.main-content').addEventListener('click', () => {
    if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    }
});





// ===========================

const menu = [
    {
        name: "Trang chủ",
        link: "/"
    },
    {
        name: "Esport",
        link: "/esports"
    },
    {
        name: "VOD thể thao",
        link: "#"
    },
    {
        name: "Thể thao tổng hợp",
        link: "/theThaoTongHop"
    },
    {
        name: "Xổ số",
        link: "#"
    }
]



const idMenu = document.getElementById('nav-menu')

const dataHTML = menu.map(i => {
    return `
     <li><a href="${i.link}" class="">${i.name}</a></li>
    `
})

idMenu.innerHTML = dataHTML.join("")

console.log(dataHTML.join(""))



