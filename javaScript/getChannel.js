// const data = await (await fetch("https://soixamapi.vercel.app/api/logo?type=TV")).json();


document.addEventListener("DOMContentLoaded", () => {
    const nav = document.querySelector(".channels-nav-bar");
    const items = nav.querySelectorAll(".channels-nav-item");

    // Thêm active cho thẻ đầu tiên
    if (items.length > 0) items[0].classList.add("active");

    // Lắng nghe click
    nav.addEventListener("click", (e) => {
        const item = e.target.closest(".channels-nav-item");
        if (!item) return;

        // Xóa active cũ
        nav.querySelector(".active")?.classList.remove("active");

        // Thêm active mới
        item.classList.add("active");
    });
});




let dataChannel = null;   // lúc đầu chưa có dữ liệu

const fetchDataChannel = (async () => {
    const res = await fetch("https://soixamapi.vercel.app/api/logo");
    const data = await res.json();
    dataChannel = data;   // gán vào biến global

    innerinnerNavBarChannel()
})();


function innerinnerNavBarChannel() {
    const idChannelNavBar = document.getElementById("channels-bar")
    const channelNavbar = dataChannel.map((i, index) => {
        return `
            <div onClick="innerChannel('${index}')" class="channels-nav-item">${i.info.nameGroup}</div> 
        `
    })
    idChannelNavBar.innerHTML = `
    <div onClick="innerChannel()" class="channels-nav-item active">Tất cả các kênh</div>
    ${channelNavbar.join("")}
    `
    innerChannel()
}



function innerChannel(pl = "ALL") {
    if (pl === "ALL") {
        var listChannel = dataChannel.map(i => {
            const channel = i.channel.map(k => {
                return `
                <div class="channel-card VAR-goTop" onClick="getChannel('${k.id}')">
                    <div class="card-thumbnail" style="border-color: #fff;">
                        <div class="premium-badge" style="display: ${k.status == "live" ? "none" : ""} ">Mất tín hiệu</div>
                        <img src="${k.logo}" alt="${k.acronym}" class="channel-logo" onerror="this.onerror=null; this.src='/media/logo/logo.png';">
                    </div>
                    <div class="channel-name">${k.acronym}</div>
                </div>
                `

            })
            return channel.join("")
        })
    }
    else {
        var listChannel = dataChannel[pl].channel.map(k => {
            return `
            <div class="channel-card VAR-goTop" onClick="getChannel('${k.id}')">
                <div class="card-thumbnail" style="border-color: #fff;">
                    <div class="premium-badge" style="display: ${k.status == "live" ? "none" : ""} ">Mất tín hiệu</div>
                    <img src="${k.logo}" alt="${k.acronym}" class="channel-logo" onerror="this.onerror=null; this.src='/media/logo/logo.png';">
                </div>
                <div class="channel-name">${k.acronym}</div>
            </div>
            `

        })
    }


    const idListChannel = document.getElementById("channels-list")
    idListChannel.innerHTML = listChannel.join("")
}
//   <div class="premium-badge" style="display: ${k.status == "live" ? "none" : ""} ">Mất tín hiệu</div>

async function getChannel(id) {

    const API = await getAPI(`https://soixamapi.vercel.app/api/channel?id=${id}`)
    schedule(API[0].schedule)
    loadPlayer({
        url: API[0].urlStream,
        drm: API[0].drm,
        kid: API[0].keyID,
        key: API[0].key,
        id: "myVideo"
    });

// loadPlayer({
//     url: "https://s2129134.cdn.mytvnet.vn/pkg20/live_dzones/hbo.smil/manifest.mpd",
//     drm: true,
//     kid: "Cd3+PWOGPK+ut50FRrCYqw",
//     key: "PeDzjc8BSCff1b7Dh0PGog",
//     id: "myVideo"
// });


}


getChannel("vtv1")



// loadPlayer({
//     url: "https://live.fptplay53.net/fnxhd2/anninhtv_vhls.smil/chunklist_b5000000.m3u8",
//     drm: false,
//     kid: "1234567890abcdef1234567890abcdef",
//     key: "abcdef1234567890abcdef1234567890",
//     id: "myVideo"
// });







// <div class="channel-card">
//     <div class="card-thumbnail" style="border-color: #fff;">
//         <img src="https://img.vtvprime.vn/3besFRMbi8HdBDsdgQNVFnTWi7KiLruKJ7uTXobHG2g/rs:fit:836:468/czM6Ly9wcmQtc24taW1hZ2VzL2NoYW5uZWwvYzQ0ZjFjMGMtYTAzOC00ZWMxLThiZWUtNDJlNTBmMjE1YTI4LnBuZw==.png"
//             alt="VTV1" class="channel-logo">
//     </div>
//     <div class="channel-name">VTV1</div>
// </div>

// <div class="channel-card">
//     <div class="card-thumbnail">
//         <div class="premium-badge">♕ Premium</div>
//         <img src="https://img.vtvprime.vn/3besFRMbi8HdBDsdgQNVFnTWi7KiLruKJ7uTXobHG2g/rs:fit:836:468/czM6Ly9wcmQtc24taW1hZ2VzL2NoYW5uZWwvYzQ0ZjFjMGMtYTAzOC00ZWMxLThiZWUtNDJlNTBmMjE1YTI4LnBuZw==.png"
//             alt="VTV1" class="channel-logo">
//     </div>
//     <div class="channel-name">ON Music</div>
// </div>

// < nav class="channels-nav-bar" >
//     <div class="channels-nav-item active">Tất cả các kênh</div>
//     <div class="channels-nav-item">Kênh yêu thích</div>
//     <div class="channels-nav-item">VTV</div>
//     <div class="channels-nav-item">VTVCab</div>
//     <div class="channels-nav-item">BOX</div>
//     <div class="channels-nav-item">SCTV</div>
//     <div class="channels-nav-item">HTV</div>
//     <div class="channels-nav-item">THVL</div>
//     <div class="channels-nav-item">Thiết Yếu</div>
//     <div class="channels-nav-item">Trong Nước</div>
//     <div class="channels-nav-item">Quốc Tế</div>
//     <div class="channels-nav-item">HBO Go</div>
//     <div class="channels-nav-item">Thể thao</div>
// </nav >