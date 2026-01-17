
// async function list(
//     url = "https://onplus.com.vn/_next/data/kEUCga5mXHIUbhk4wZPyG/category.json?id=esports"
// ) {
//     const API = await getAPI(`https://re.ghiminh1.workers.dev/?url=${url}`);
//     const esport = document.getElementById("esport-content");

//     const lists = API?.pageProps?.lists;
//     if (!lists) return;
//     HeaderTitle.set({
//         icon: "",
//         title: lists.name,
//         suffix: ""  
//          });
//     // 👉 Trường hợp có categories
//     if (lists.categories) {
//         esport.innerHTML = lists.categories.map(cat => `
//             <a href="/esports/index.html?id=${cat.id}">
//                 <h2 class="section-header">${cat.name}</h2>
//             </a>

//             <div class="video-grid">
//                 ${cat.contents.map(renderVideoCard).join("")}
//             </div>
//         `).join("");
//         return;
//     }

//     // 👉 Trường hợp mặc định (contents)
//     if (lists.contents) {

//         esport.innerHTML = `
//             <h2 class="section-header">${lists.name}</h2>
//             <div class="video-grid is-default">
//                 ${lists.contents.map(renderVideoCard).join("")}
//             </div>
//         `;
//     }
// }


// function renderVideoCard(item) {
//     return `
//         <a href="/stream/index.html?id=${item.id}&type=${item.type}">
//             <div class="video-card">
//                 <div class="thumbnail-wrapper">
//                     <img src="${item.thumbnail_horizontal}" 
//                          alt="${item.name}" 
//                          class="thumbnail-img"
//                          onerror="this.src='/img/no-thumb.jpg'">
//                     <span class="timestamp">${toMMSS(item.duration)}</span>
//                     <div class="play-overlay"></div>
//                 </div>
//                 <div class="video-info">
//                     <h3 class="video-title">${item.name}</h3>
//                 </div>
//             </div>
//         </a>
//     `;
// }




// console.log(getQueryParam("id"))

// if (getQueryParam("id") === null) {
//     list()
// }
// else {
//     list(`https://onplus.com.vn/_next/data/kEUCga5mXHIUbhk4wZPyG/category/detail/${getQueryParam("id")}.json`)
// }

















async function listVTVgo() {
    const API = await getAPI("https://re.ghiminh1.workers.dev/?url=https://vtvgo.4share.me/")
    const vtvgo = document.getElementById("esport-content");
    if (API) {
        const card = API.groups.map((i, index) => {
            if (i.id != "tv") {
                if (i.channels) {
                    const items = i.channels.map(k => {
                        return `
                            <!-- Video Item 1 -->
                            <a href="/vtvgo/stream/index.html${k.remote_data ? "?id=" + encodeCustom(k.remote_data.url) : "" }"  >
                        <div class="video-card">
                            <div class="thumbnail-wrapper">
                                <!-- Ảnh đại diện video -->
                                <img src="${k.image.url}" alt="${k.name}" class="thumbnail-img">
                                    <!-- Icon Play khi hover (Optional) -->
                                    <div class="play-overlay"></div>
                            </div>
                            <div class="video-info">
                                <h3 class="video-title">${k.name}</h3>
                            </div>
                        </div></a>
                    `
                    })
                    return `<a href="/vtvgo/index.html${i.remote_data ? "?listID=" + encodeCustom(i.remote_data.url) : "" }" ><h2 class="section-header">${i.name}</h2></a><div class="video-grid">${items.join("")}</div>`
                }
            } else { return }
        })

    vtvgo.innerHTML = card.join("")

    }
}




async function listItemVTVgo(id) {
    const url = decodeCustom(id)
    const API = await getAPI(`https://re.ghiminh1.workers.dev/?url=${url}`)
    const vtvgo = document.getElementById("esport-content");
    if (API){
        const card = API.channels.map(i =>{
            return  `
                            <a href="/vtvgo/stream/index.html${i.remote_data ? "?id=" + encodeCustom(i.remote_data.url) : "" }" >
                        <div class="video-card">
                            <div class="thumbnail-wrapper">
                                <!-- Ảnh đại diện video -->
                                <img src="${i.image.url}" alt="${i.name}" class="thumbnail-img">
                                    <!-- Icon Play khi hover (Optional) -->
                                    <div class="play-overlay"></div>
                            </div>
                            <div class="video-info">
                                <h3 class="video-title">${i.name}</h3>
                            </div>
                        </div></a>
                    `
        })
        vtvgo.innerHTML = `<div class="video-grid is-default">${card.join("")}</div>`
    }else{return}

    
}




if (getQueryParam("listID") === null) {
    listVTVgo()
}
else {
    // list(`https://onplus.com.vn/_next/data/kEUCga5mXHIUbhk4wZPyG/category/detail/${getQueryParam("id")}.json`)
    listItemVTVgo(getQueryParam("listID"))
}



// decodeCustom




// // < !--Tiêu đề Section-- >
// //     <h2 class="section-header">VMC WINTER 2025</h2>

// //     <!--Danh sách Video(Grid)-- >
// // <div class="video-grid">

// //     <!-- Video Item 1 -->
// // <div class="video-card">
// //     <div class="thumbnail-wrapper">
// //         <!-- Ảnh đại diện video -->
// //         <img src="https://imgvlive.vtvcab.vn/720X405/vong-dong-doi-2v2-all-star-championship-28-09-cap-4-ca13b8e1-5537-4c8d-97f7-e09ced755b14_20250930051341.jpg?auto=format&fit=max&w=1200" alt="EE vs EG Thumbnail" class="thumbnail-img">
// //             <!-- Thời lượng video -->
// //             <span class="timestamp">48:58</span>
// //             <!-- Icon Play khi hover (Optional) -->
// //             <div class="play-overlay"></div>
// //     </div>
// //     <div class="video-info">
// //         <h3 class="video-title">EE vs EG - VÒNG BẢNG VMC MÙA ĐÔNG 2025</h3>
// //     </div>
// // </div>

// // </div>