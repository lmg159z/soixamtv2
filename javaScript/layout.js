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
        </div>
   
`

const idFooter = document.getElementById("footer")

idFooter.innerHTML = `

        <div class="footer-container">
            <!-- Cột 1: Thông tin công ty -->
            <div class="footer-col company-info">
                <a href="#" class="logo" style="display:block; margin-bottom:15px;">SX<span>TV</span></a>
                <p>Cơ quan chủ quản: Hệ sinh thái Sói Xám Studio</p>
                <p>Địa chỉ: Hà Nội, Việt Nam</p>

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
                    <li><a href="https://vtvgo.vn">VTVGo</a></li>
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
        name: "Truyền hình",
        link: "/ch"
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
    },
    {
        name: "VTVgo",
        link: "/vtvgo"
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




window.TetCinematicEffect = (function () {
  let canvas, ctx, raf;
  let particles = [];
  let flowers = [];
  let running = false;
  let lastFirework = 0;

  /* ======================
     FIREWORK PARTICLE
  ====================== */
  class Particle {
    constructor(x, y, vx, vy, color, life) {
      this.x = x;
      this.y = y;
      this.vx = vx;
      this.vy = vy;
      this.life = life;
      this.alpha = 1;
      this.color = color;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vy += 0.015; // gravity nhẹ
      this.life--;
      this.alpha = Math.max(this.life / 80, 0);
    }
    draw() {
      ctx.globalAlpha = this.alpha;
      ctx.beginPath();
      ctx.arc(this.x, this.y, 1.8, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  function launchFirework() {
    const x = Math.random() * canvas.width * 0.8 + canvas.width * 0.1;
    const y = Math.random() * canvas.height * 0.4 + 50;
    const hue = 30 + Math.random() * 30;
    const color = `hsl(${hue},100%,60%)`;

    for (let i = 0; i < 90; i++) {
      const a = Math.random() * Math.PI * 2;
      const s = Math.random() * 3 + 1.2;
      particles.push(
        new Particle(
          x,
          y,
          Math.cos(a) * s,
          Math.sin(a) * s,
          color,
          80 + Math.random() * 20
        )
      );
    }
  }

  /* ======================
     FLOWERS
  ====================== */
  function injectFlowerStyle() {
    if (document.getElementById("tet-cine-style")) return;
    const style = document.createElement("style");
    style.id = "tet-cine-style";
    style.textContent = `
      .tet-cine-flower {
        position: fixed;
        top: -60px;
        width: 28px;
        height: 28px;
        background: url("https://i.imgur.com/JYUB0m3.png") center/contain no-repeat;
        pointer-events: none;
        opacity: .85;
        filter: drop-shadow(0 4px 10px rgba(255,200,80,.45));
        animation: tet-cine-fall linear forwards;
      }
      @keyframes tet-cine-fall {
        to { transform: translateY(110vh); }
      }
    `;
    document.head.appendChild(style);
  }

  function spawnFlower() {
    if (flowers.length > 16) return;
    const f = document.createElement("div");
    f.className = "tet-cine-flower";

    const dur = 14000 + Math.random() * 6000;
    const sway = Math.random() * 60 - 30;

    f.style.left = Math.random() * 100 + "vw";
    f.style.animationDuration = dur + "ms";
    f.style.transform = `translateX(${sway}px) scale(${0.7 + Math.random() * 0.4})`;
    f.style.zIndex = 999995;

    document.body.appendChild(f);
    flowers.push(f);

    setTimeout(() => {
      f.remove();
      flowers = flowers.filter(x => x !== f);
    }, dur);
  }

  /* ======================
     RENDER LOOP
  ====================== */
  function render(ts) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles = particles.filter(p => p.life > 0);

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    if (ts - lastFirework > 1800) {
      launchFirework();
      lastFirework = ts;
    }

    raf = requestAnimationFrame(render);
  }

  /* ======================
     API
  ====================== */
  function start() {
    if (running) return;
    running = true;

    canvas = document.createElement("canvas");
    canvas.style.cssText = `
      position:fixed;
      inset:0;
      pointer-events:none;
      z-index:999990;
    `;
    document.body.appendChild(canvas);
    ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = innerWidth;
      canvas.height = innerHeight;
    };
    resize();
    addEventListener("resize", resize);

    injectFlowerStyle();

    render(0);
    setInterval(spawnFlower, 1200);
  }

  function stop() {
    running = false;
    cancelAnimationFrame(raf);

    particles = [];
    flowers.forEach(f => f.remove());
    flowers = [];

    if (canvas) canvas.remove();
  }

  return { start, stop };
})();


 TetCinematicEffect.start();