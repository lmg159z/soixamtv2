


// document.addEventListener("DOMContentLoaded", () => {
//     const nav = document.querySelector(".channels-nav-bar");
//     const items = nav.querySelectorAll(".channels-nav-item");

//     // Thêm active cho thẻ đầu tiên
//     if (items.length > 0) items[0].classList.add("active");

//     // Lắng nghe click
//     nav.addEventListener("click", (e) => {
//         const item = e.target.closest(".channels-nav-item");
//         if (!item) return;

//         // Xóa active cũ
//         nav.querySelector(".active")?.classList.remove("active");

//         // Thêm active mới
//         item.classList.add("active");
//     });
// });




// let dataChannel = null; // global state

// (async function fetchDataChannel() {
//     try {
//         const [logoRes, event] = await Promise.all([
//             fetch("https://soixamapi.vercel.app/api/logo"),
//             getAPI("http://localhost:3000/api/event")
//         ]);

//         const data = await logoRes.json();

//         const testChannels = {
//             info: {
//                 nameGroup: "Sự kiện hấp dẫn",
//                 idGroup: "live2"
//             },
//             channel: event
//         };

//         // nếu event có dữ liệu thì thêm lên đầu
//         if (Array.isArray(event) && event.length > 0) {
//             data.unshift(testChannels);
//         }

//         dataChannel = data;
//         console.log(dataChannel);

//         innerinnerNavBarChannel();
//     } catch (err) {
//         console.error("Fetch channel error:", err);
//     }
// })();


// function innerinnerNavBarChannel() {
//     const idChannelNavBar = document.getElementById("channels-bar")
//     const channelNavbar = dataChannel.map((i, index) => {
//         return `
//             <div onClick="innerChannel('${index}')" class="channels-nav-item">${i.info.nameGroup}</div> 
//         `
//     })
//     idChannelNavBar.innerHTML = `
//     <div onClick="innerChannel()" class="channels-nav-item active">Tất cả các kênh</div>
//     ${channelNavbar.join("")}
//     `
//     innerChannel()
// }



// function innerChannel(pl = "ALL") {
//     var listChannel = [];



//     if (pl === "ALL") {
//         const usedIds = new Set();

//         listChannel = dataChannel.map(group => {

//             const isLive2 = group.info?.idGroup === "live2";

//             const channel = group.channel
//                 .filter(k => {
//                     // ✅ Nếu là live2 → cho phép trùng
//                     if (isLive2) return true;

//                     // ❌ Các group khác → lọc trùng như cũ
//                     if (usedIds.has(k.id)) return false;
//                     usedIds.add(k.id);
//                     return true;
//                 })
//                 .map(k => {
//                     return `
//                 <a href="/index.html?channel=${k.id}">
//                     <div class="channel-card">
//                         <div class="card-thumbnail" style="border-color: #fff;
//                             ${k.logo === "" || k.logo === null ? `
//                                 background-image: url('${k.thumb}');
//                                 background-size: cover;
//                                 background-position: center;
//                                 background-repeat: no-repeat
//                             ` : ''}">
//                             <div class="premium-badge" style="display: ${k.status == "live" ? "none" : ""}">
//                                 Mất tín hiệu
//                             </div>
//                             <img style="display: ${k.logo === "" || k.logo === null ? 'none' : 'block'}"
//                                  src="${k.logo}"
//                                  alt="${k.acronym}"
//                                  class="channel-logo"
//                                  onerror="this.onerror=null;this.src='/media/logo/logo.png';">
//                         </div>
//                         <div class="channel-name">${k.acronym}</div>
//                     </div>
//                 </a>
//                 `;
//                 });

//             return channel.join("");
//         });
//     }

//     else {
//         listChannel = dataChannel[pl].channel.map(k => {
//             return `
//             <a href="/index.html?channel=${k.id}">
//                 <div class="channel-card ">
//                    <div class="card-thumbnail" style="border-color: #fff; ${k.logo === "" || k.logo === null ? `background-image: url('${k.thumb}');background-size: cover; background-position: center;background-repeat: no-repeat` : ''}">
//                          <div class="premium-badge" style="display: ${k.status == "live" ? "none" : ""}">
//                             Mất tín hiệu
//                         </div>
//                          <img style="display: ${k.logo === "" || k.logo === null ? 'none' : 'block'}" src="${k.logo}" alt="${k.acronym}"
//                              class="channel-logo"
//                              onerror="this.onerror=null;this.src='/media/logo/logo.png';">
//                     </div>
//                     <div class="channel-name">${k.acronym}</div>
//                 </div>
//             </a>
//             `;
//         });
//     }

//     document.getElementById("channels-list").innerHTML = listChannel.join("");
// }

// async function getChannel(id) {

//     const API = await getAPI(`https://soixamapi.vercel.app/api/channel?id=${id}`)

//     HeaderTitle.set({
//         icon: "🔴",
//         title: "TRỰC TIẾP",
//         suffix: `${API[0].name} | ${API[0].acronym}`
//     });
//     schedules(API[0].schedule)
//     loadPlayer({
//         url: decodeCustom(API[0].urlStream),
//         drm: API[0].drm,
//         kid: toHex(decodeCustom(API[0].keyID)),
//         key: toHex(decodeCustom(API[0].key)),
//         id: "myVideo"
//     });

//     const offset = API[0].watermark; // hoặc ""

//     const el = document.querySelector(".yt-watermark");

//     if (el && offset.trim()) {
//         const currentTransform = el.style.transform || "";

//         if (/translate\([^)]*\)/.test(currentTransform)) {
//             // 🔁 Có translate → ghi đè đúng translate
//             el.style.transform = currentTransform.replace(
//                 /translate\([^)]*\)/,
//                 `translate(${offset})`
//             );
//         } else {
//             // ➕ Chưa có translate → thêm vào, giữ nguyên phần khác
//             el.style.transform = `${currentTransform} translate(${offset})`.trim();
//         }
//     }


// }




// if (getQueryParam("channel") === null) {
//     getChannel("vtv1")
// } else {
//     getChannel(getQueryParam("channel"))
// }





// --- GLOBAL STATE ---
let dataChannel = [];   // Lưu trữ toàn bộ dữ liệu kênh
let currentPl = "ALL";  // Lưu trạng thái tab người dùng đang xem (Mặc định là ALL)

// --- KHỞI TẠO ỨNG DỤNG ---
document.addEventListener("DOMContentLoaded", () => {
    // Chỉ xử lý click cơ bản, logic render đã chuyển xuống dưới
    const nav = document.querySelector(".channels-nav-bar");
    if(nav) {
        nav.addEventListener("click", (e) => {
            const item = e.target.closest(".channels-nav-item");
            if (!item) return;
            // Việc active class sẽ do hàm innerChannel xử lý để đồng bộ với dữ liệu
        });
    }
});

(async function initApp() {
    try {
        // 1. Lấy dữ liệu danh sách Logo (Nhóm kênh cố định)
        const logoRes = await fetch("https://soixamapi.vercel.app/api/logo");
        const dataLogos = await logoRes.json();
        
        // Gán dữ liệu ban đầu
        dataChannel = Array.isArray(dataLogos) ? dataLogos : [];

        // 2. Gọi hàm lấy Event lần đầu tiên và hiển thị
        await fetchEventAndRender(true);

        // 3. Cài đặt bộ đếm: Cứ 60 giây (60000ms) gọi lại API Event 1 lần
        setInterval(() => {
            fetchEventAndRender(false);
        }, 60000);

    } catch (err) {
        console.error("Lỗi khởi tạo ứng dụng:", err);
    }
})();

/**
 * Hàm lấy dữ liệu Event và xử lý cập nhật Real-time
 * @param {boolean} isFirstLoad - Có phải lần tải trang đầu tiên không
 */
async function fetchEventAndRender(isFirstLoad = false) {
    try {
        // Gọi API Event riêng biệt
        const eventData = await getAPI("https://soixamapi.vercel.app/api/event");

        // Tạo cấu trúc object chuẩn cho nhóm Event
        const newEventGroup = {
            info: { nameGroup: "Sự kiện hấp dẫn", idGroup: "live2" },
            channel: Array.isArray(eventData) ? eventData : []
        };

        // Tìm xem trong dataChannel hiện tại đã có nhóm 'live2' chưa
        const existingIndex = dataChannel.findIndex(g => g.info && g.info.idGroup === "live2");
        let hasChange = false;

        if (existingIndex !== -1) {
            // --- ĐÃ CÓ NHÓM EVENT TRƯỚC ĐÓ ---
            // So sánh dữ liệu cũ và mới. Nếu KHÁC nhau mới cập nhật để tránh render thừa.
            const oldDataJson = JSON.stringify(dataChannel[existingIndex].channel);
            const newDataJson = JSON.stringify(newEventGroup.channel);

            if (oldDataJson !== newDataJson) {
                // Nếu Event mới rỗng -> Xóa nhóm Event đi
                if (newEventGroup.channel.length === 0) {
                    dataChannel.splice(existingIndex, 1);
                    // Nếu đang xem tab bị xóa, quay về ALL
                    if (currentPl == existingIndex) currentPl = "ALL";
                } else {
                    // Cập nhật dữ liệu mới vào vị trí cũ
                    dataChannel[existingIndex] = newEventGroup;
                }
                hasChange = true;
            }
        } else {
            // --- CHƯA CÓ NHÓM EVENT ---
            if (newEventGroup.channel.length > 0) {
                // Thêm vào đầu danh sách
                dataChannel.unshift(newEventGroup);
                // Vì thêm vào đầu (index 0), các index cũ bị đẩy lùi -> Cập nhật currentPl nếu đang không xem ALL
                if (currentPl !== "ALL") {
                    currentPl = (parseInt(currentPl) + 1).toString();
                }
                hasChange = true;
            }
        }

        // Chỉ render lại khi: Lần đầu tải HOẶC có sự thay đổi dữ liệu
        if (isFirstLoad || hasChange) {
            console.log(`Cập nhật giao diện: ${new Date().toLocaleTimeString()}`);
            renderNavBar();
            renderChannelList(currentPl);
        }

    } catch (e) {
        console.error("Lỗi cập nhật Event:", e);
    }
}

// --- CÁC HÀM RENDER GIAO DIỆN ---

function renderNavBar() {
    const navBarContainer = document.getElementById("channels-bar");
    if (!navBarContainer) return;

    // Tạo HTML cho các nhóm kênh
    const navItemsHTML = dataChannel.map((group, index) => {
        // Kiểm tra active dựa trên biến toàn cục currentPl
        const activeClass = (currentPl.toString() === index.toString()) ? "active" : "";
        return `<div onClick="handleTabClick('${index}')" class="channels-nav-item ${activeClass}">${group.info.nameGroup}</div>`;
    }).join("");

    // Thêm nút "Tất cả" ở đầu
    const allActiveClass = (currentPl === "ALL") ? "active" : "";
    
    navBarContainer.innerHTML = `
        <div onClick="handleTabClick('ALL')" class="channels-nav-item ${allActiveClass}">Tất cả các kênh</div>
        ${navItemsHTML}
    `;
}

// Hàm trung gian xử lý click tab để cập nhật state
function handleTabClick(pl) {
    currentPl = pl; // Lưu lại tab đang chọn
    renderNavBar(); // Render lại Navbar để cập nhật class active
    renderChannelList(pl); // Render danh sách kênh
}

function renderChannelList(pl) {
    const listContainer = document.getElementById("channels-list");
    if (!listContainer) return;

    let htmlResult = [];

    if (pl === "ALL") {
        // Logic lọc trùng kênh khi xem tất cả (trừ live2)
        const usedIds = new Set();
        
        dataChannel.forEach(group => {
            const isLive2 = group.info?.idGroup === "live2";
            
            const groupHtml = group.channel
                .filter(ch => {
                    // Nếu là live2 -> luôn lấy
                    if (isLive2) return true;
                    // Nếu id đã có -> bỏ qua
                    if (usedIds.has(ch.id)) return false;
                    
                    usedIds.add(ch.id);
                    return true;
                })
                .map(ch => createChannelCard(ch))
                .join("");

            htmlResult.push(groupHtml);
        });
    } else {
        // Xem theo nhóm cụ thể
        const groupIndex = parseInt(pl);
        if (dataChannel[groupIndex]) {
            htmlResult = dataChannel[groupIndex].channel.map(ch => createChannelCard(ch));
        }
    }

    listContainer.innerHTML = htmlResult.join("");
}

// Hàm tạo HTML cho 1 thẻ kênh (Tách ra cho gọn)
function createChannelCard(k) {
    // Logic ẩn hiện logo/thumb
    const hasLogo = k.logo && k.logo !== "";
    const isLive = k.status === "live";
    
    const bgStyle = (!hasLogo) 
        ? `background-image: url('${k.thumb}'); background-size: cover; background-position: center; background-repeat: no-repeat;` 
        : '';
        
    const logoImg = hasLogo 
        ? `<img src="${k.logo}" alt="${k.acronym}" class="channel-logo" onerror="this.onerror=null;this.src='/media/logo/logo.png';">`
        : '';

    return `
    <a href="/index.html?channel=${k.id}">
        <div class="channel-card">
            <div class="card-thumbnail" style="border-color: #fff; ${bgStyle}">
                <div class="premium-badge" style="display: ${isLive ? "none" : "block"}">
                    Mất tín hiệu
                </div>
                <img style="display: ${hasLogo ? 'block' : 'none'}" 
                     src="${k.logo || ''}" 
                     alt="${k.acronym}"
                     class="channel-logo"
                     onerror="this.onerror=null;this.src='/media/logo/logo.png';">
            </div>
            <div class="channel-name">${k.acronym}</div>
        </div>
    </a>`;
}

// --- LOGIC PLAYER (GIỮ NGUYÊN) ---

async function getChannel(id) {
    try {
        const API = await getAPI(`https://soixamapi.vercel.app/api/channel?id=${id}`);
        
        if (!API || API.length === 0) return;

        const channelData = API[0];

        if(typeof HeaderTitle !== 'undefined') {
            HeaderTitle.set({
                icon: "🔴",
                title: "TRỰC TIẾP",
                suffix: `${channelData.name} | ${channelData.acronym}`
            });
        }

        if(typeof schedules === 'function') schedules(channelData.schedule);
        
        if(typeof loadPlayer === 'function') {
            console.log(decodeCustom(channelData.urlStream))
            loadPlayer({
                url: decodeCustom(channelData.urlStream),
                drm: channelData.drm,
                kid: toHex(decodeCustom(channelData.keyID)),
                key: toHex(decodeCustom(channelData.key)),
                license: decodeCustom(channelData.license),
                id: "myVideo"
            });
        }

        // Xử lý watermark
        const offset = channelData.watermark; 
        const el = document.querySelector(".yt-watermark");
        if (el && offset && offset.trim()) {
            const currentTransform = el.style.transform || "";
            if (/translate\([^)]*\)/.test(currentTransform)) {
                el.style.transform = currentTransform.replace(/translate\([^)]*\)/, `translate(${offset})`);
            } else {
                el.style.transform = `${currentTransform} translate(${offset})`.trim();
            }
        }
    } catch (e) {
        console.error("Lỗi getChannel:", e);
    }
}

// --- KHỞI CHẠY PLAYER MẶC ĐỊNH ---
if (getQueryParam("channel") === null) {
    getChannel("vtv1");
} else {
    getChannel(getQueryParam("channel"));
}

// Lưu ý: Đảm bảo các hàm tiện ích global (getAPI, decodeCustom, toHex, getQueryParam) 
// đã được định nghĩa ở file khác hoặc phía trên đoạn code này.