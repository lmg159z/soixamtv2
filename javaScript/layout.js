(async () =>{

const infoDevice = await getAPI("https://free.freeipapi.com/api/json")
if (infoDevice.isProxy){
    alert("Vui lòng tắt proxy. Website hỗ trợ tốt nhất trên khu vực Nước Cộng hòa Xã hội Chủ nghĩa Việt Nam")
}
const idHeader = document.getElementById("header")
idHeader.innerHTML = `

        <div class="header-left">
            <!-- Nút Hamburger Mobile -->
            <div class="hamburger" id="hamburger-btn">
                <i class="fa-solid fa-bars"></i>
            </div>

            <!-- Logo -->
            <a href="/" class="logo">SX<span>TV</span></a>

            <!-- Menu Điều hướng -->
            <ul class="nav-menu" id="nav-menu">
                <!-- Thêm ô tìm kiếm vào trong Menu khi ở Mobile -->
                <li style="border:none; padding-bottom:10px;" class="mobile-only-search"></li>
                <!-- Placeholder vị trí search mobile nếu muốn -->
                <!-- <li><a href="#" class="active">Trang chủ</a></li>
                <li><a href="#">Truyền hình</a></li>
                <li><a href="#">HBO Go</a></li>
                <li><a href="#">Phim</a></li>
                <li><a href="#">Thể thao</a></li>
                <li><a href="#">TV Show</a></li>
                <li><a href="#">Kho phim VIP</a></li> -->
            </ul>
        </div>

        <div class="header-right">
            <!-- Search Box (Desktop) -->
            <div class="search-box">
                <input type="text" placeholder="Tìm kiếm...">
                <i class="fa-solid fa-magnifying-glass"></i>
            </div>

            <!-- Icon Search (Mobile) -->
            <div class="mobile-search-icon">
                <i class="fa-solid fa-magnifying-glass"></i>
            </div>

            <!-- Chú ý: Ẩn chữ 'Đăng nhập' trên mobile để đỡ chật, chỉ hiện icon -->
        </div>
   
`

const idFooter = document.getElementById("footer")

idFooter.innerHTML = `

        <div class="footer-container">
            <!-- Cột 1: Thông tin công ty -->
            <div class="footer-col company-info">
                <a href="#" class="logo" style="display:block; margin-bottom:15px;">SX<span>TV</span></a>
                <p>Cơ quan chủ quản: Hệ sinh thái Sói Xám Studio .</p>
                <p>Địa chỉ: Hà Nội, Việt Nam.</p>

                <div class="social-links">
                    <a href="#"><i class="fa-brands fa-facebook-f"></i></a>
                    <a href="#"><i class="fa-brands fa-youtube"></i></a>
                    <a href="#"><i class="fa-brands fa-tiktok"></i></a>
                </div>
            </div>

            <!-- Cột 2: Dịch vụ -->
            <div class="footer-col">
                <h4>Dịch vụ</h4>
                <ul>
                    <li><a href="#">Gói cước Mobile</a></li>
                    <li><a href="#">Dịch vụ truyền hình</a></li>
                    <li><a href="#">Thể thao trực tiếp</a></li>
                </ul>
            </div>

            <!-- Cột 3: Hỗ trợ -->
            <div class="footer-col">
                <h4>Đối tác</h4>
                <ul>
                    <li><a href="https://vnepg.site/">VNEPG - EPG Việt Nam</a></li>
                    <li><a href="https:fptplay.vn">FPTPlay</a></li>
                    <li><a href="https://mytv.com.vn/">MyTV</a></li>
                    <li><a href="https://tv360.vn">TV360</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h4>Thông tin của bạn</h4>
                <ul>
                <li>IP: ${infoDevice.ipAddress}</li>
                <li>Quốc gia: ${infoDevice.countryName}</li>
                <li>Múi giờ: ${infoDevice.timeZones[0]}</li>
                <li>Thành phố: ${infoDevice.cityName}</li>
                <li>Nhà mạng: ${infoDevice.asnOrganization}</li>
                <li>Trạng thái proxy: ${infoDevice.isProxy === false ? "Không" : "Có"}</li>
                </ul>
            </div>

        </div>

        <div class="footer-bottom">
            <p>&copy; 2025 SoiXamTV. All rights reserved.</p>
        </div>
   
`





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
        name: "Thể thao tổng hợp",
        link: "/theThaoTongHop"
    },
    {
        name: "Livestream",
        link: "/onLive"
    },
    {
        name: "FPTPlay",
        link: "/fpt"
    }
]



const idMenu = document.getElementById('nav-menu')

const dataHTML = menu.map(i => {
    return `
     <li><a href="${i.link}" class="">${i.name}</a></li>
    `
})

idMenu.innerHTML = dataHTML.join("")



})()






// ===========================
