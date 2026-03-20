
async function sports(type = 1, slug) {
    const esport = document.getElementById("esport-content");
    const API = await getAPI("./slug.json")
    console.log(API)
    if (type === 1) {
        HeaderTitle.set({
            icon: "",
            title: "Thể thao tổng hợp",
            suffix: ""
        });
        // ===========================
        const listHTML = await Promise.all(
            API.slug.map(async (i) => {
                const dataSlug = await getAPI(`https://tv-web.api.vinasports.com.vn/api/v2/publish/see-more/events/${i.id}/?page_num=1&page_size=15`)
                return `
            <a href="/theThaoTongHop/index.html?slug=${i.id}">
                 <h2 class="section-header">${i.name}</h2>
            </a>
                 <div class="grid-layout-horizontal ">
                ${renderHTML(dataSlug.data)}
            </div>
        `;
            })
        );
        esport.innerHTML = listHTML.join("");
    }
    if (type === 2) {
        HeaderTitle.set({
            icon: "",
            title: "Thể thao tổng hợp",
            suffix: ""
        });
        // ===========================
        const dataSlug = await getAPI(`https://tv-web.api.vinasports.com.vn/api/v2/publish/see-more/events/${slug}/?page_num=1&page_size=15`)
        console.log(dataSlug)
        const listHTML = `
            <h2 class="section-header">${dataSlug.block.name}</h2>
            <div class="grid-layout">
                ${renderHTML(dataSlug.data)}
            </div>
        `
        esport.innerHTML = listHTML
    }

}




function renderHTML(data) {
    function encodeObj(obj) {
        const json = JSON.stringify(obj);

        const utf8Bytes = new TextEncoder().encode(json);
        let binary = "";
        utf8Bytes.forEach(b => binary += String.fromCharCode(b));

        return btoa(binary)
            .replace(/\+/g, "-")
            .replace(/\//g, "_")
            .replace(/=+$/, "");
    }

    const list = data.map(i => {


        const base64 = encodeObj({
            id: i.id,
            name: i.name,
            duration: i.duration,
            created: i.created,
            url: "https://livevlive.vtvcab.vn/hls/vod/newonsports/DISTRIBUTE/"
                + i.url + "/index.m3u8"
        });
        return `
    <a href="./stream/index.html?id=${base64}">
                    <div class="video-card">
                        <div class="thumb-wrapper">
                            <img src="${i.thumbnail_horizontal}" alt="${i.id}" class="thumb-img" loading="lazy">
                            <div class="video-time" >
                                ${toMMSS(i.duration)}
                            </div>
                        </div>
                        <div class="card-info">
                            <span class="time-slot">${i.name}</span>
                        </div>
                    </div> 
                </a>`;

    })

    return list.join("")

}











// function renderVideoCard(item) {
//     if (item.is_protected) return "";

//     let st = "";

//     switch (item.status) {
//         case "live":
//             st = "TRỰC TIẾP";
//             break;

//         case "not_started":
//             st = formatDateTime(item.start_time);
//             break;

//         default:
//             st = toMMSS(item.duration);
//     }

//     const isLive = item.status === "live";

//     return `
//         <a href="/stream/index.html?id=$${i.id}&type=$${i.type}">
//             <div class="video-card">
//                 <div class="thumbnail-wrapper">
//                     <img 
//                         src="$${i.thumbnail_horizontal}"
//                         alt="$${i.name}"
//                         class="thumbnail-img"
//                     >
//                     <span class="timestamp" ${isLive ? "style='background-color:red'" : ""}>
//                         ${st}
//                     </span>
//                     <div class="play-overlay"></div>
//                 </div>

//                 <div class="video-info">
//                     <h3 class="video-title">$${i.name}</h3>
//                 </div>
//             </div>
//         </a>
//     `;
// }


function formatDateTime(isoString) {
    const date = new Date(isoString);

    const HH = String(date.getUTCHours()).padStart(2, '0');
    const MM = String(date.getUTCMinutes()).padStart(2, '0');
    const DD = String(date.getUTCDate()).padStart(2, '0');
    const MMth = String(date.getUTCMonth() + 1).padStart(2, '0');
    const YYYY = date.getUTCFullYear();

    return `${HH}:${MM}-${DD}/${MMth}/${YYYY}`;
}
if (getQueryParam("slug") === null) {
    sports(1, "")
}
else {
    // list(`https://onplus.com.vn/_next/data/Zunl1uQ23SPeKMVfPQPaM/danh-muc/${getQueryParam("slug")}.json?slug=${getQueryParam("slug")}`)
    sports(2, getQueryParam("slug"))
}























// < !--Tiêu đề Section-- >
//     <h2 class="section-header">VMC WINTER 2025</h2>

//     <!--Danh sách Video(Grid)-- >
// <div class="video-grid">

//     <!-- Video Item 1 -->
// <div class="video-card">
//     <div class="thumbnail-wrapper">
//         <!-- Ảnh đại diện video -->
//         <img src="https://imgvlive.vtvcab.vn/720X405/vong-dong-doi-2v2-all-star-championship-28-09-cap-4-ca13b8e1-5537-4c8d-97f7-e09ced755b14_20250930051341.jpg?auto=format&fit=max&w=1200" alt="EE vs EG Thumbnail" class="thumbnail-img">
//             <!-- Thời lượng video -->
//             <span class="timestamp">48:58</span>
//             <!-- Icon Play khi hover (Optional) -->
//             <div class="play-overlay"></div>
//     </div>
//     <div class="video-info">
//         <h3 class="video-title">EE vs EG - VÒNG BẢNG VMC MÙA ĐÔNG 2025</h3>
//     </div>
// </div>

// </div>