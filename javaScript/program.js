(async () => {
    const idHTML = document.getElementById("container");

    // --- BƯỚC MỚI: Hiển thị Loading Animation ---
    // Gán HTML loading ngay lập tức
    idHTML.innerHTML = `
        <div class="loading-wrapper">
            <div class="loader"></div>
        </div>
    `;

    try {
        // Gọi API (Lúc này màn hình đang quay vòng tròn)
        const API = await getAPI("https://soixamapi.vercel.app/api/broadcastProgram");
        const APIsport = await getAPI("https://soixamapi.vercel.app/api/sports");
        
        // --- Code xử lý cũ đã tối ưu ---
        const liveThumB = API.liveThumB;
        // Thuật toán xáo trộn nhanh (Fisher-Yates)
        for (let i = liveThumB.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [liveThumB[i], liveThumB[j]] = [liveThumB[j], liveThumB[i]];
        }

        const liveThumbHTML = liveThumB.map(i => `
            <a href="/ch/index.html?channel=${i.id}">
                <div class="video-card">
                    <div class="thumb-wrapper">
                        <img src="${i.live}" alt="${i.id}" class="thumb-img" loading="lazy">                    
                        <span class="badge-channel-name">${i.acronym}</span>
                    </div>
                </div> 
            </a>
        `).join("");

        const broadcastHTML = API.broadCast
            .filter(i => i.status !== 2)
            .map(i => {
                const isLive = i.status === 1;
                return `
                <a href="/ch/index.html?channel=${i.channel_id}">
                    <div class="video-card">
                        <div class="thumb-wrapper">
                            <img src="${i.thumbnail}" alt="${i.id}" class="thumb-img" loading="lazy">
                            <span class="badge-live" style="display:${isLive ? 'block' : 'none'}">Đang phát</span>
                            <div class="overlay-status" style="display:${!isLive ? 'block' : 'none'}">
                                ${formatBroadcastTime(i.start_time)}
                            </div>
                        </div>
                        <div class="card-info">
                            <span class="time-slot">${i.name}</span>
                        </div>
                    </div> 
                </a>`;
            }).join("");

        const sportsHTML = APIsport.data.map( i => {
             return `
              <a href="/liveSport/index.html?id=${i.id}"
                 style="${i.stream_link ? '':'pointer-events: none; color: gray;'}"
              >
                <div class="match-card">
                  <div class="match-header">
                    <div class="league">${i.league?.name || ""}</div>
                  </div>
                  <div class="teams">
                    <div class="team">
                      <img src="${i.home_team?.logo  || "https://robong.net/images/avatar-blank.jpg" }" alt="">
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


                    // <div class="time">${formatBroadcastTime(i.match_time)}</div>
        // --- Xóa Loading và Gán nội dung thật ---
        idHTML.innerHTML = `
            <h2 class="section-title">Kênh truyền hình tiêu biểu</h2>
            <div class="grid-layout-horizontal">${liveThumbHTML}</div>
            <h2 class="section-title">Thể thao tổng hợp</h2>
            <div class="grid-layout-horizontal">${sportsHTML}</div>
            <h2 class="section-title">Chương trình truyền hình</h2>
            <div class="grid-layout">${broadcastHTML}</div>
        `;

    } catch (error) {
        console.error("Lỗi:", error);
        // Nếu lỗi thì báo lỗi đẹp
        idHTML.innerHTML = `
            <div class="loading-wrapper">
                <p style="color:red">Có lỗi xảy ra khi tải dữ liệu!</p>
            </div>`;
    }
})();

// Hàm format thời gian giữ nguyên
