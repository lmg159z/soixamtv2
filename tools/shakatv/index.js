   document.getElementById('configForm').addEventListener('submit', function(e) {
            e.preventDefault(); // Chặn load lại trang

            // Hàm helper: Lấy giá trị, trim khoảng trắng, nếu rỗng thì trả về ""
            const getVal = (id) => {
                const element = document.getElementById(id);
                return element && element.value.trim() !== "" ? element.value.trim() : "";
            };

            // Tạo object data
            const streamData = {
                url: getVal('inpUrl'),
                referer: getVal('inpReferer'),
                origin: getVal('inpOrigin'),
                keyId: getVal('inpKeyId'),
                key: getVal('inpKey'),
                license: getVal('inpLicense')

            };
             loadPlayer({
                url: streamData.url,
                drm: true,
                kid: streamData.keyId,
                key: streamData.key,
                license: streamData.license,
                id: "myVideo"
            });
       



            // TODO: Bạn viết tiếp code xử lý ở đây (ví dụ: truyền vào player)
        });