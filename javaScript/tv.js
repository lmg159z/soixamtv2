// async function loadPlayer(config) {
//     const video = document.getElementById(config.id);

//     if (!video) {
//         console.error("Không tìm thấy thẻ video:", config.id);
//         return;
//     }

//     // Tạo Shaka UI
//     const ui = new shaka.ui.Overlay(
//         new shaka.Player(video),
//         document.getElementById("tv-show__live"),
//         video
//     );

//     const player = ui.getControls().getPlayer(); // <-- chỗ này từng bị undefined
//     const controls = ui.getControls();

//     // Gán vào global nếu cần debug
//     window.player = player;
//     window.controls = controls;

//     // DRM
//     if (config.drm) {
//         player.configure({
//             drm: {
//                 clearKeys: {
//                     [config.kid]: config.key
//                 }
//             }
//         });
//     }

//     try {
//         await player.load(config.url);
//         console.log("LOAD OK:", config.url);
//     } catch (e) {
//         console.error("LOAD ERROR:", e);
//     }

//     video.autoplay = true;
// video.muted = false;     // cần muted cho trình duyệt auto play
// video.play();
// }

let oldPlayer = null;
let oldUI = null;

async function loadPlayer(config) {
    const video = document.getElementById(config.id);
    const container = document.getElementById("tv-show__live");

    // 1. Hủy player cũ
    if (oldPlayer) {
        try { await oldPlayer.destroy(); } catch(e) {}
        oldPlayer = null;
    }

    // 2. Xóa UI cũ nếu còn
    const oldControlDOM = container.querySelector(".shaka-controls-container");
    if (oldControlDOM) oldControlDOM.remove();

    // 3. Tạo player theo API mới (KHÔNG truyền video vào constructor)
    const player = new shaka.Player();     // ← API mới
    await player.attach(video);            // ← Gắn vào thẻ video

    // 4. Tạo UI mới
    const ui = new shaka.ui.Overlay(player, container, video);

    oldPlayer = player;
    oldUI = ui;

    // 5. DRM nếu có
    if (config.drm) {
        player.configure({
            drm: {
                clearKeys: {
                    [config.kid]: config.key
                }
            }
        });
    }

    // 6. Load stream
    try {
        await player.load(config.url);
        // console.log("LOAD OK:", config.url);
    } catch (e) {
        console.error("LOAD ERROR:", e);
    }

    video.autoplay = true;
    video.muted = false;
    video.play();
}
