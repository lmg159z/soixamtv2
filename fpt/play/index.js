


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
                <a href="/index.html?channel=${k.id}" >
                <div class="channel-card VAR-goTop" >
                    <div class="card-thumbnail" style="border-color: #fff;">
                        <div class="premium-badge" style="display: ${k.status == "live" ? "none" : ""} ">Mất tín hiệu</div>
                        <img src="${k.logo}" alt="${k.acronym}" class="channel-logo" onerror="this.onerror=null; this.src='/media/logo/logo.png';">
                    </div>
                    <div class="channel-name">${k.acronym}</div>
                </div></a>
                `

            })
            return channel.join("")
        })
    }
    else {
        var listChannel = dataChannel[pl].channel.map(k => {
            return `
        <a href="/index.html?channel=${k.id}" >
            <div class="channel-card VAR-goTop" >
                <div class="card-thumbnail" style="border-color: #fff;">
                    <div class="premium-badge" style="display: ${k.status == "live" ? "none" : ""} ">Mất tín hiệu</div>
                    <img src="${k.logo}" alt="${k.acronym}" class="channel-logo" onerror="this.onerror=null; this.src='/media/logo/logo.png';">
                </div>
                <div class="channel-name">${k.acronym}</div>
            </div></a>
            `

        })
    }


    const idListChannel = document.getElementById("channels-list")
    idListChannel.innerHTML = listChannel.join("")
}
//   <div class="premium-badge" style="display: ${k.status == "live" ? "none" : ""} ">Mất tín hiệu</div>



async function getChannel(id) {

    const API = await getAPI(`https://soixamapi.vercel.app/api/channel?id=${id}`)

    HeaderTitle.set({
    icon: "🔴",
    title: "TRỰC TIẾP",
    suffix: `${API[0].name} | ${API[0].acronym}`  
});

    loadPlayer({
        url: API[0].urlStream,
        drm: API[0].drm,
        kid: toHex(API[0].keyID),
        key: toHex(API[0].key),
        id: "myVideo"
    });


}




if (getQueryParam("id") === null) {
    getChannel("vtv1")
} else {
    loadPlayer({
        url: decodeCustom(getQueryParam("id")),
        drm: false,
        kid: "",
        key: "",
        id: "myVideo"
    });

}



