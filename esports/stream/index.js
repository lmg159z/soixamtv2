



(async () => {
    const id = getQueryParam("id")
    const titleEl = document.getElementById("video-title");
    const titleTM = document.getElementById("video-time");
    const dataE = decodeObj(id)
    const payment = await getAPI(`https://payment-public-api.onlivetv.vn/api/vod/sign_key?vod_id=${dataE.id}`)
    console.log(payment)

    titleEl.textContent = dataE.name;
    titleTM.textContent = "Ngày đăng: " + formatDateTime(dataE.created)
    HeaderTitle.set({
            icon:  "",
            title: dataE.name,
            suffix: ""  
            });        
    const urlStreams = `https://cdn-vod.onlivetv.vn/${payment.data.expires}/${payment.data.secure}/${payment.data.rand}/${dataE.url}`
    loadPlayer({
        url: urlStreams,
        drm: false,
        kid: '',
        key: '',
        id: "myVideo"
    });
    listVD(dataE.id)
})()

function decodeObj(str) {
    str = str.replace(/-/g, "+").replace(/_/g, "/");
    while (str.length % 4) str += "=";

    const binary = atob(str);
    const bytes = Uint8Array.from(binary, c => c.charCodeAt(0));
    const json = new TextDecoder().decode(bytes);

    return JSON.parse(json);
}




async function listVD(id){
    const API = await getAPI(`https://andanh.site/proxyipvn.php?url=https%3A%2F%2Fonlivetv.vn%2Fapi%2Frelated-to%3Fid%3D${id}%26type%3D2%26page_num%3D2%26page_size%3D20`)
    const idHTML = document.getElementById("listVideo")
    

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

    const html = API.data.map(i => {
        const base64 = encodeObj({
            id: i.id,
            name: i.name,
            duration: i.duration,
            created: i.created,
            url: i.url
        });
        return `
        <a href="/esports/stream/index.html?id=${base64}">
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
