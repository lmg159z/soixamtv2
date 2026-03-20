// ================== DATA ==================


(async () => {

    // const API = await getAPI("https://soixamapi.vercel.app/api/fpt");
// http://localhost:3000/api/fpt
    const API = await getAPI("http://localhost:3000/api/fpt");
    const data = API.map(i => ({
        name: i.name,
        url: decodeCustom(i.url),
        id: i.id,
        drm: i.drm,
        keyID: decodeCustom(i.keyID),
        key:   decodeCustom(i.key),
    }));
    console.log(data)
    // console.log(data)
    data.forEach(createChannel);
})();

// ================== INIT ==================
shaka.polyfill.installAll();

// function createChannel(channel) {
//     const box = document.createElement("div");
//     box.className = "video-box";
//     box.id = channel.id;

//     // 👉 thẻ a + href theo id JSON
//     const link = document.createElement("a");
//     link.className = "video-link";
//     link.href = `/ch/index.html?channel=${channel.id}`;
//     link.target = "_self"; // hoặc _blank nếu bạn muốn

//     const video = document.createElement("video");
//     video.autoplay = true;
//     video.muted = true;
//     video.playsInline = true;

//     const name = document.createElement("div");
//     name.className = "video-name";
//     name.textContent = channel.name;

//     link.appendChild(video);
//     link.appendChild(name);
//     box.appendChild(link);

//     document.getElementById("videoGrid").appendChild(box);

//     const player = new shaka.Player(video);

//     player.configure({
//         streaming: {
//             bufferingGoal: 6,
//             rebufferingGoal: 2,
//             lowLatencyMode: true
//         }
//     });

//     player.load(channel.url).then(() => {
//         console.log("PLAY:", channel.name);
//     }).catch(err => {
//         console.warn("SKIP:", channel.name, err);

//         player.destroy();
//         box.remove();
//     });
// }

// ================== BUILD ==================
// channels.forEach(createChannel);



async function createChannel(channel) {
    const box = document.createElement("div");
    box.className = "video-box";
    box.id = channel.id;

    const link = document.createElement("a");
    link.className = "video-link";
    link.href = `/ch/index.html?channel=${channel.id}`;
    link.target = "_self";

    const video = document.createElement("video");
    video.autoplay = true;
    video.muted = true;
    video.playsInline = true;

    const name = document.createElement("div");
    name.className = "video-name";
    name.textContent = channel.name;

    link.appendChild(video);
    link.appendChild(name);
    box.appendChild(link);
    document.getElementById("videoGrid").appendChild(box);

    const player = new shaka.Player(video);

    player.configure({
        streaming: {
            bufferingGoal: 6,
            rebufferingGoal: 2,
            lowLatencyMode: true
        }
    });

    try {

        // ================= DRM CHECK =================
        if (channel.drm === true && channel.keyID && channel.key) {

            console.log("Apply ClearKey:", channel.name);

            player.configure({
                drm: {
                    clearKeys: {
                        [channel.keyID]: channel.key
                    }
                }
            });

        }

        await player.load(channel.url);
        console.log("PLAY:", channel.name);

    } catch (err) {

        console.warn("SKIP:", channel.name, err);

        await player.destroy();
        box.remove();
    }
}


