

(async ( )=> {
    const onLive = document.getElementById("onLive")
    const API = await getAPI("https://livestream.ghiminh1.workers.dev/")

    const data = API?.contents.map(i =>{
        return `
        <a href="/onLive/live/index.html?id=${i.user_id}" >
            <div class="stream-card">
        <div class="thumb-box">
            <img src="${i.thumbnail}" alt="thumb">
            <span class="label label-live">Trực tiếp</span>
            <span class="label label-cat">${i.user_nick}</span>
        </div>
        <div class="info-box">
            <img src="${i.user_profile_img}" class="user-avatar" alt="avt">
            <div class="text-content">
                <h3 class="stream-title">${i.title}</h3>
                <p class="user-name">${i.user_id}</p>
                <div class="tag-list">
                </div>
            </div>
        </div>
    </div></a>
        `
    })
 onLive.innerHTML = data.join("")
})()






