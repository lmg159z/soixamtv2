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
    const  id = getQueryParam("id")
    const url = buildProxyLink(`https://re.ghiminh1.workers.dev/?url=${decodeCustom(id)}`)
    const API = await getAPI(url)
    const titleEl = document.getElementById("video-title");
    const titleTM = document.getElementById("video-time");
    titleEl.textContent = API.sources[0].contents[0].streams[0].name;
    // titleTM.textContent = formatDateTime(API.pageProps.initVideo.created)
    HeaderTitle.set({
            icon: "XSTV",
            title: API.sources[0].contents[0].streams[0].name,
            suffix: ""  
            });
    loadPlayer({
        url: API.sources[0].contents[0].streams[0].stream_links[0].url,
        drm: false,
        kid: '',
        key: '',
        id: "myVideo"
    });
    listVD(id)
})()



listVD()

async function listVD(){
    const url = buildProxyLink(`https://re.ghiminh1.workers.dev/?url=https://vtvgo.4share.me/vod/vodchannel_1117?limit=60&sortBy=outstanding&customVodList=`)
    const API = await getAPI(`${url}`)
    const idHTML = document.getElementById("listVideo")
    const html = API.channels.map(i => {
        return `
        <a href="/vtvgo/stream/index.html${i.remote_data ? "?id=" + encodeCustom(i.remote_data.url) : "" }">
            <div class="video-item">
                <div class="video-item__thumb">
                    <img src="${i.image.url}" alt="${i.name}">
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
