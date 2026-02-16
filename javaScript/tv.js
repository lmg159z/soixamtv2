
let oldPlayer = null;
let oldUI = null;

async function loadPlayer(config) {
    const video = document.getElementById(config.id);
    const container = document.getElementById("tv-show__live");

    // 1. Hủy player cũ
    if (oldPlayer) {
        try { await oldPlayer.destroy(); } catch (e) {}
        oldPlayer = null;
    }

    // 2. Xóa UI cũ
    const oldControlDOM = container.querySelector(".shaka-controls-container");
    if (oldControlDOM) oldControlDOM.remove();

    // 3. Tạo player (API mới)
    const player = new shaka.Player();
    await player.attach(video);

    // 4. Tạo UI
    const ui = new shaka.ui.Overlay(player, container, video);

    oldPlayer = player;
    oldUI = ui;

    // 5. DRM handling
    if (config.drm) {

        // ✅ Trường hợp 1: ClearKey (có key + kid)
        if (config.kid && config.key) {
            player.configure({
                drm: {
                    clearKeys: {
                        [config.kid]: config.key
                    }
                }
            });
        }

        // ✅ Trường hợp 2: License server (kid + key trống)
        else if (config.license) {
            player.configure({
                drm: {
                    servers: {
                        // dùng widevine mặc định
                        "com.widevine.alpha": config.license
                    }
                }
            });
        }
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
    await video.play();
}
