

let oldPlayer = null;
// let oldUI = null;

// async function loadPlayer(config) {
//     const video = document.getElementById(config.id);
//     const container = document.getElementById("tv-show__live");

//     // 1. Hủy player cũ
//     if (oldPlayer) {
//         try { await oldPlayer.destroy(); } catch(e) {}
//         oldPlayer = null;
//     }

//     // 2. Xóa UI cũ nếu còn
//     const oldControlDOM = container.querySelector(".shaka-controls-container");
//     if (oldControlDOM) oldControlDOM.remove();

//     // 3. Tạo player theo API mới (KHÔNG truyền video vào constructor)
//     const player = new shaka.Player();     // ← API mới
//     await player.attach(video);            // ← Gắn vào thẻ video

//     // 4. Tạo UI mới
//     const ui = new shaka.ui.Overlay(player, container, video);

//     oldPlayer = player;
//     oldUI = ui;

//     // 5. DRM nếu có
//     if (config.drm) {
//         player.configure({
//             drm: {
//                 clearKeys: {
//                     [config.kid]: config.key
//                 }
//             }
//         });
//     }

//     // 6. Load stream
//     try {
//         await player.load(config.url);
//         // console.log("LOAD OK:", config.url);
//     } catch (e) {
//         console.error("LOAD ERROR:", e);
//     }

//     video.autoplay = true;
//     video.muted = false;
//     video.play();
// }

let player = null;
let ui = null;

let currentSource = "main";   // main | fallback
let healthTimer = null;

const FALLBACK_URL = "./media/video/err.mp4";
const CHECK_INTERVAL = 30000;
const PING_TIMEOUT = 5000;

/* ============================= */
/* PING STREAM (NO SHAKA)        */
/* ============================= */
async function pingStream(url, timeout = PING_TIMEOUT) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);

    try {
        const res = await fetch(url, {
            method: "GET",
            mode: "cors",
            credentials: "omit",
            cache: "no-store",
            signal: controller.signal
        });
        if (!res.ok) throw new Error("PING FAIL");
    } finally {
        clearTimeout(timer);
    }
}

/* ============================= */
/* INIT PLAYER (SAFE)            */
/* ============================= */
async function loadPlayer(config) {
    const video = document.getElementById(config.id);
    const container = document.getElementById("tv-show__live");

    /* ===== INIT PLAYER (1 LẦN) ===== */
    if (!player) {
        player = new shaka.Player();
        await player.attach(video);

        // ❗ TẮT native controls VĨNH VIỄN
        video.controls = false;
        video.removeAttribute("controls");

        // ❗ XÓA UI DƯ THỪA (NẾU CÓ)
        container
            .querySelectorAll(".shaka-controls-container")
            .forEach(el => el.remove());

        // ❗ TẠO UI DUY NHẤT
        ui = new shaka.ui.Overlay(player, container, video);

        // ❗ FIX TRACKING PREVENTION
        player.configure({
            offline: { usePersistentLicense: false }
        });

        player.getNetworkingEngine().clearAllRequestFilters();
        player.getNetworkingEngine().clearAllResponseFilters();

        // ❗ STREAM DIE → FALLBACK
        player.addEventListener("error", () => {
            if (currentSource === "main") {
                switchToFallback(video);
            }
        });
    }

    /* ===== DRM (OPTIONAL) ===== */
    if (config.drm) {
        player.configure({
            drm: {
                clearKeys: {
                    [config.kid]: config.key
                }
            }
        });
    }

    /* ===== LOAD MAIN ===== */
    tryMainStream(video, config);
}

/* ============================= */
/* TRY LOAD MAIN STREAM           */
/* ============================= */
async function tryMainStream(video, config) {
    try {
        await pingStream(config.url);
        await player.load(config.url);

        currentSource = "main";

        video.controls = false;
        video.removeAttribute("controls");

        video.loop = false;
        video.autoplay = true;
        video.muted = false;
        video.play();

        console.log("✅ MAIN STREAM PLAYING");
    } catch {
        console.warn("❌ MAIN STREAM FAIL");
        switchToFallback(video);
    } finally {
        scheduleNextCheck(video, config);
    }
}

/* ============================= */
/* FALLBACK VIDEO                */
/* ============================= */
function switchToFallback(video) {
    if (currentSource === "fallback") return;

    currentSource = "fallback";

    player.unload().finally(() => {
        video.controls = false;
        video.removeAttribute("controls");

        video.src = FALLBACK_URL;
        video.loop = true;
        video.autoplay = true;
        video.muted = false;
        video.play();

        console.log("▶ FALLBACK LOOPING");
    });
}

/* ============================= */
/* HEALTH CHECK (NEVER DIE)      */
/* ============================= */
function scheduleNextCheck(video, config) {
    clearTimeout(healthTimer);

    healthTimer = setTimeout(() => {
        if (currentSource === "fallback") {
            console.log("🔍 CHECKING MAIN STREAM...");
            tryMainStream(video, config);
        } else {
            scheduleNextCheck(video, config);
        }
    }, CHECK_INTERVAL);
}
