async function onlive(id) {
    const API = await getAPI(`https://onlive.ghiminh1.workers.dev/?id=${id}`)
    // const APIurl = await getAPI(`https://re.ghiminh1.workers.dev/?url=https://livestream-manager.onlive.vn/broad_stream_assign.html?return_type=gcp_cdn&use_cors=true&cors_origin_url=play.onlive.vn&broad_key=121141-common-original-hls`)


    if (API.result === 1) {
        const title = document.getElementById("onlive-title")
        const titleHTML = `
            <h3>${API?.data.broad_title}</h3>
    `
        title.innerHTML = titleHTML
        loadPlayer({
            url: `https://pc-web.stream.onlive.vn/live-stm-04/auth_playlist.m3u8?aid=${API?.data.hls_authentication_key}`,
            drm: false,
            kid: '',
            key: '',
            id: "myVideo"
        });
    }else{
        alert("XIN LỖI HỆ THỐNG KHÔNG BẮT ĐƯỢC TÍN HIỆU KÊNH NÀY VÌ VẤN ĐỀ BẢN QUYỀN PHÁT SÓNG")
    }
}



if (getQueryParam("id") === null) {
 
}
else {
    onlive(getQueryParam("id"))
}

// https://livestream-manager.onlive.vn/broad_stream_assign.html?return_type=gcp_cdn&use_cors=true&cors_origin_url=play.onlive.vn&broad_key=121141-common-original-hls&time=8577.826486465523