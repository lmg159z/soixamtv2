(async () => {
    const idHTML = document.getElementById("container");
    const APIsport = await getAPI("https://soixamapi.vercel.app/api/sports");
    const sportsHTML = APIsport.data.map(i => {
        return `
              <a href="/liveSport/index.html?id=${i.id}"
                 style="${i.stream_link ? '' : 'pointer-events: none; color: gray;'}"
              >
                <div class="match-card">
                  <div class="match-header">
                    <div class="league">${i.league?.name || ""}</div>
                  </div>
                  <div class="teams">
                    <div class="team">
                      <img src="${i.home_team?.logo || "https://robong.net/images/avatar-blank.jpg"}" alt="">
                      <div>${i.home_team?.name || ""}</div>
                    </div>
                    <div class="vs">VS</div>
                    <div class="team">
                      <img src="${i.away_team?.logo || 'https://robong.net/images/avatar-blank.jpg'}" alt="">
                      <div>${i.away_team?.name || ""}</div>
                    </div>
                  </div>
                  <div class="match-footer">
                    <div class="${i.stream_link ? "statusLive" : "status"}">
                      ${i.stream_link ? "LIVE" : formatBroadcastTime(i.match_time)}
                    </div>
                  </div>
                </div>
              </a>
            `
    }).join("")
    idHTML.innerHTML = `
            <h2 class="section-title">Thể thao tổng hợp</h2>
            <div class="grid-layout">${sportsHTML}</div>
          `;
})()




async function getURLPlay(id) {
    // 1. Gọi API. Nếu lỗi 404, getAPI có thể trả về null/undefined.
    // Chúng ta cần bọc trong try/catch nếu getAPI throw lỗi, 
    // hoặc chỉ cần kiểm tra kết quả trả về.
    let API = null;
    try {
        API = await getAPI(`https://soixamapi.vercel.app/api/sports?id=${id}`);
    } catch (e) {
        console.log("Lỗi khi gọi API:", e);
    }

    const idHTML = document.getElementById("live-container");

    // 2. SỬA LỖI Ở ĐÂY:
    // Kiểm tra xem API có tồn tại không (khác null/undefined) VÀ không có thuộc tính error
    if (API && !API.error) {
        
        loadPlayer({
            url: API.stream_link,
            id: "myVideo"
        });

        // Sử dụng optional chaining (?.) cho mảng commentary_links để tránh lỗi nếu mảng rỗng
        const linksHtml = API.commentary_links?.map((item, index) => {
            return `
                 <div class="live-item" 
                  onclick="liveHandleCopy(this)" 
                  data-copy="${item.link}">
                  FEED ${index + 1}
                  </div>
                `;
        }).join('') || ''; // Thêm .join('') để bỏ dấu phẩy giữa các phần tử

        const htmlTitle = `
         <div class="live-meta-info">
            <h3 class="live-title">${API.home_team.name} vs ${API.away_team.name} | ${API.league.name}</h3>
            <span class="live-date">Cập nhật: ${API.match_time}</span>
        </div>

        <div class="live-scroll-list">
            ${linksHtml}
        </div>
         `;
         
        idHTML.innerHTML = htmlTitle;

    } else {
        // Trường hợp API bị null (404) hoặc có lỗi trả về
        console.warn("Trận đấu không tồn tại hoặc API lỗi 404");
        
        const htmlTitle = `
         <div class="live-meta-info">
            <h3 class="live-title">Trận đấu chưa lên sóng hoặc không tồn tại</h3>
        </div>
         `;
        idHTML.innerHTML = htmlTitle;
    }
}


if (getQueryParam("id") === null) {
    // getChannel("vtv1");
} else {
    getURLPlay(getQueryParam("id"));
}




 function liveHandleCopy(element) {
        // Lấy nội dung từ thuộc tính data-copy
        // Nếu không có data-copy thì lấy text hiển thị (fallback)
        const contentToCopy = element.getAttribute('data-copy') || element.innerText;

        navigator.clipboard.writeText(contentToCopy).then(() => {
            // Hiệu ứng Visual feedback
            element.classList.add('live-copied-success');
            setTimeout(() => {
                element.classList.remove('live-copied-success');
            }, 1500);
        }).catch(err => {
            console.error('Live Copy Error:', err);
            alert("Lỗi copy: " + err);
        });
    }

