
function getNgayThang(offset = 0) {
    const today = new Date();
    today.setDate(today.getDate() + offset);

    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');

    return `${dd}/${mm}`;
}



async function schedules(channel) {
    console.log(channel)
    if (channel != null){
    const data = await getAPI(`${channel}`)
    var htmlSchedule = data.items.map(i => {
        const now = Date.now();

        if (i.stopMs < now) {
            // return `
            // <div class="schedule-item past">
            //     <div class="item-time">${toHHMM(i.startMs)}</div>
            //     <div class="item-content">
            //         <div class="program-name">${i.title}</div>
            //     </div>
            //     <div class="item-action-icon">
            //         <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 4v6h6"></path><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path></svg>
            //     </div>
            // </div>`; // đã qua thời gian phát
        }
        else if (i.startMs <= now && now < i.stopMs) {
            return `
                <div class="schedule-item active">
            <div class="item-sidebar">
                <div class="live-badge">● LIVE</div>
            </div>
            <div class="item-content-full">
                <div class="active-header">
                    <span class="program-name">${i.title}</span>
                    <div class="equalizer">
                        <span></span><span></span><span></span>
                    </div>
                </div>
            </div>
        </div>`; // đang trong khoảng phát
        }
        else {
            return `
                <div class="schedule-item future">
                    <div class="item-time">${toHHMM(i.startMs)}</div>
                    <div class="item-content">
                        <div class="program-name">${i.title}</div>
                    </div>
                </div>`; // chưa tới thời gian phát
        }
    })
    }else{
        var  htmlSchedule = [`
            <div class="schedule-item active">
            <div class="item-sidebar">
                <div class="live-badge">● LIVE</div>
            </div>
            <div class="item-content-full">
                <div class="active-header">
                    <span class="program-name">Không có lịch phát sóng</span>
                    <div class="equalizer">
                        <span></span><span></span><span></span>
                    </div>
                </div>
            </div>
        </div>
            `]
    }

const idHTML = document.getElementById("tv-show__schedule")
idHTML.innerHTML = `
            <div class="schedule-header">
                <div class="channel-name">LỊCH PHÁT SÓNG</div>
                <div class="date-selector-wrapper">
                    <div class="date-picker" onclick="toggleDateDropdown()">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                        <span>Hôm nay, ${getNgayThang()}</span>
                        <svg class="arrow-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
                    </div>
                    <div class="dropdown-menu">
                        <div class="dropdown-item" onClick="console.log('${getNgayThang(-1)}')" >Hôm qua, ${getNgayThang(-1)}</div>
                        <div class="dropdown-item selected" onClick="console.log('${getNgayThang()}')">
                            <span >Hôm nay, ${getNgayThang()}</span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        </div>
                        <div class="dropdown-item" onClick="console.log('${getNgayThang(1)}')">Ngày mai, ${getNgayThang(1)}</div>
                    </div>
                </div>
            </div>
            <div class="schedule-list">
            ${htmlSchedule.join("")}
            </div>`

}





// Hàm bật tắt menu dropdown
function toggleDateDropdown() {
    const wrapper = document.querySelector('.date-selector-wrapper');
    wrapper.classList.toggle('open');
}

// Sự kiện click ra ngoài để đóng menu
document.addEventListener('click', function (event) {
    const wrapper = document.querySelector('.date-selector-wrapper');
    const picker = document.querySelector('.date-picker');

    // Nếu click không nằm trong wrapper thì đóng lại
    if (!wrapper.contains(event.target)) {
        wrapper.classList.remove('open');
    }
});

// Xử lý click chọn ngày (đổi active class)
const items = document.querySelectorAll('.dropdown-item');
items.forEach(item => {
    item.addEventListener('click', function () {
        // Xóa class selected cũ
        document.querySelector('.dropdown-item.selected')?.classList.remove('selected');
        // Xóa dấu tick cũ (nếu muốn code JS kỹ hơn)

        // Thêm class selected mới
        this.classList.add('selected');

        // Cập nhật text hiển thị trên nút (Tùy chọn)
        const text = this.querySelector('span') ? this.querySelector('span').innerText : this.innerText;
        document.querySelector('.date-picker span').innerText = text;

        // Đóng menu
        document.querySelector('.date-selector-wrapper').classList.remove('open');
    });
});


