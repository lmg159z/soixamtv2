async function list(
    type = 1,
    url = "https://onplus.com.vn/_next/data/j42WhsACa0rWDB-93l-DI/index.json"
) {
    const API = await getAPI(
        `https://re.ghiminh1.workers.dev/?url=${encodeURIComponent(url)}`
    );
    if (!API) return;

    const esport = document.getElementById("esport-content");
    if (!esport) return;

    /* ===== ID cần loại bỏ ===== */
    const EXCLUDE_IDS = new Set([95, 315, 208, 121, 209, 153, 211]);

    /* ===== Trường hợp categories ===== */
    if (type === 1 && Array.isArray(API?.pageProps?.screenblocks)) {
        HeaderTitle.set({
            icon: "",
            title: "Thể thao tổng hợp",
            suffix: ""
        });
        esport.innerHTML = API.pageProps.screenblocks
            .filter(cat =>
                cat.events &&
                !EXCLUDE_IDS.has(cat.id)
            )
            .map(cat => `
                <a href="/theThaoTongHop/index.html?slug=${cat.id}">
                    <h2 class="section-header">${cat.name}</h2>
                </a>

                <div class="video-grid">
                    ${cat.events.map(renderVideoCard).join("")}
                </div>
            `)
            .join("");

        return;
    }
    if (type === 2 && API?.data) {
        HeaderTitle.set({
            icon: "",
            title: API.block?.name,
            suffix: ""
        });
        esport.innerHTML = `
            <h2 class="section-header">${API.block?.name ?? ""}</h2>
            <div class="video-grid is-default">
                ${API.data.map(renderVideoCard).join("")}
            </div>
        `;
    }
}

function renderVideoCard(item) {
    if (item.is_protected) return "";

    let st = "";

    switch (item.status) {
        case "live":
            st = "TRỰC TIẾP";
            break;

        case "not_started":
            st = formatDateTime(item.start_time);
            break;

        default:
            st = toMMSS(item.duration);
    }

    const isLive = item.status === "live";

    return `
        <a href="/stream/index.html?id=${item.id}&type=${item.type}">
            <div class="video-card">
                <div class="thumbnail-wrapper">
                    <img 
                        src="${item.thumbnail_horizontal}"
                        alt="${item.name}"
                        class="thumbnail-img"
                        onerror="this.src='/img/no-thumb.jpg'"
                    >
                    <span class="timestamp" ${isLive ? "style='background-color:red'" : ""}>
                        ${st}
                    </span>
                    <div class="play-overlay"></div>
                </div>

                <div class="video-info">
                    <h3 class="video-title">${item.name}</h3>
                </div>
            </div>
        </a>
    `;
}


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
    list()
}
else {
    // list(`https://onplus.com.vn/_next/data/Zunl1uQ23SPeKMVfPQPaM/danh-muc/${getQueryParam("slug")}.json?slug=${getQueryParam("slug")}`)
    list(2, `https://tv-web.api.vinasports.com.vn/api/v2/publish/see-more/events/${getQueryParam("slug")}`)
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