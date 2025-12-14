//    <div class="schedule-list" id="listVideo">
            
//             <!-- Item 1 -->
//             <div class="video-item">
//                 <div class="video-item__thumb">
//                     <img src="https://via.placeholder.com/160x90" alt="Thumb">
//                     <span class="duration">27:28</span>
//                 </div>
//                 <div class="video-item__info">
//                     <div class="title">Anh Ngọc & Calcio 25/26 - Số 13</div>
//                 </div>
//             </div>

//         </div>




(async () => {
    const id = getQueryParam("id")
    const type = getQueryParam("type")
    const url = buildProxyLink(`https://re.ghiminh1.workers.dev/?url=https://onplus.com.vn/_next/data/Zunl1uQ23SPeKMVfPQPaM/video.json?id=${id}&type=${type}`)
    const API = await getAPI(url)
    const titleEl = document.getElementById("video-title");
    const titleTM = document.getElementById("video-time");
    titleEl.textContent = API.pageProps.initVideo.name;
    titleTM.textContent = formatDateTime(API.pageProps.initVideo.created)
     loadPlayer({
        url: API.pageProps.initVideo.url,
        drm: false,
        kid: '',
        key: '',
        id: "myVideo"
    });
    listVD(id)
})()





async function listVD(id){
    const url = buildProxyLink(`https://re.ghiminh1.workers.dev/?url=https://onplus.com.vn/api/related-to?id=aca6e934-2a37-4103-8786-9d1be58cc21f&type=2&page_num=1&page_size=10`)
    const API = await getAPI(`${url}`)
    const idHTML = document.getElementById("listVideo")
    const html = API.data.map(i => {
        return `
        <a href="/stream/index.html?id=${i.id}&type=${i.type}">
            <div class="video-item">
                <div class="video-item__thumb">
                    <img src="${i.thumbnail}" alt="${i.name}">
                    <span class="duration" ${i.is_live === true ? 'style="background-color: red"' : ""}  >${i.is_live === true ? "LIVE" : toMMSS(i.duration)}</span>
                </div>
                <div class="video-item__info">
                    <div class="title">${i.name}</div>
                </div>
            </div>
            </a>
        `
    })
    idHTML.innerHTML = html.join("")
}

function buildProxyLink(input) {
    try {
        const u = new URL(input);

        // Lấy base proxy
        const proxyOrigin = u.origin;

        // Lấy toàn bộ query
        const params = new URLSearchParams(u.search);

        // Lấy url gốc
        let innerUrl = params.get("url");
        if (!innerUrl) return null;

        // ❗ Remove url param
        params.delete("url");

        // ❗ Nếu còn param => gắn ngược lại vào innerUrl
        const restQuery = params.toString();
        if (restQuery) {
            innerUrl += (innerUrl.includes("?") ? "&" : "?") + restQuery;
        }

        // Decode nếu đã encode
        innerUrl = decodeURIComponent(innerUrl);

        // Encode lại đúng 1 lần
        const encoded = encodeURIComponent(innerUrl);

        return `${proxyOrigin}/?url=${encoded}`;
    } catch (e) {
        console.error("Invalid URL", e);
        return null;
    }
}

function formatDateTime(isoString) {
    const date = new Date(isoString);

    const pad = n => String(n).padStart(2, "0");

    const HH = pad(date.getHours());
    const MM = pad(date.getMinutes());

    const DD = pad(date.getDate());
    const MM2 = pad(date.getMonth() + 1);
    const YYYY = date.getFullYear();

    return `${HH}:${MM} - ${DD}/${MM2}/${YYYY}`;
}
