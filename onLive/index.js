

(async ( )=> {
    const onLive = document.getElementById("onLive")
    // const API = await getAPI("https://livestream.ghiminh1.workers.dev/")
    const API = await getAPI(`https://service.onlive.vn/api/get-list-live-subcategory?page=1&limit=300`)
    console.log(API)
    const data = API?.data.map(i =>{
      // console.log(`https://stimg.onlive.vn/LOGO/${i.user_id.slice(2)}/${i.user_id}/${i.user_id}.jpg`)
        return `
        <a href="/onLive/live/index.html?id=${i.user_id}" >
            <div class="stream-card">
        <div class="thumb-box">
            <img src="${toHttps(i.thumb)}" alt="thumb">
            <span class="label label-live">Trực tiếp</span>
            <span class="label label-cat">${i.cate_name}</span>
        </div>
        <div class="info-box">
            <img src="https://stimg.onlive.vn/LOGO/${i.user_id.slice(0,2)}/${i.user_id}/${i.user_id}.jpg" class="user-avatar" alt="avt">
            <div class="text-content">
                <h3 class="stream-title">${i.broad_title}</h3>
                <p class="user-name">${i.user_nick}</p>
                <div class="tag-list">
      
                </div>
            </div>
        </div>
    </div></a>
        `
    })
 onLive.innerHTML = data.join("")
})()




function toHttps(url) {
  if (!url) return "";

  // Nếu bắt đầu bằng //
  if (url.startsWith("//")) {
    return "https:" + url;
  }

  // Nếu là http:// → đổi sang https://
  if (url.startsWith("http://")) {
    return url.replace("http://", "https://");
  }

  // Nếu đã là https://
  if (url.startsWith("https://")) {
    return url;
  }

  // Trường hợp chỉ là path (/1/121481...)
  if (url.startsWith("/")) {
    return "https://liveimg.onlive.vn" + url;
  }

  // fallback
  return "https://" + url;
}


