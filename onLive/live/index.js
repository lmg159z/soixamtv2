async function onlive(id) {
    const API = await getAPI(`https://andanh.site/onlive.php?id=${id}`)
    console.log(API)
    // const APIurl = await getAPI(`https://re.ghiminh1.workers.dev/?url=https://livestream-manager.onlive.vn/broad_stream_assign.html?return_type=gcp_cdn&use_cors=true&cors_origin_url=play.onlive.vn&broad_key=121141-common-original-hls`)
    // const APIurl = await getAPI(buildProxyLink(`https://re.ghiminh1.workers.dev/?url=https://livestream-manager.onlive.vn/broad_stream_assign.html?return_type=gcp_cdn&broad_key=122477-common-original-hls`))
    const APIurl = await getAPI(`https://andanh.site/get.php?r=2&url=https%3A%2F%2Fvietanhtv.id.vn%2Fonlive%2Fgetlive.php%3Fid%3D${id}%26broad_no%3D${API?.data.broad_no}`)
    if (API.result === 1) {
        const title = document.getElementById("onlive-title")
        const titleHTML = `
            <h3>${API?.data.broad_title}</h3>
    `
        title.innerHTML = titleHTML
        loadPlayer({
            url: `${APIurl.url2}`,
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
   window.location.href = "/";
}
else {
    onlive(getQueryParam("id"))
}


// https://andanh.site/get.php?r=2&url=https%3A%2F%2Fvietanhtv.id.vn%2Fonlive%2Fgetlive.php%3Fid%3Dlienquan