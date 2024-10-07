// URLからパスを取得
const path = window.location.pathname.substring(1);

// data.jsonを取得する関数
fetch('data.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // データのネストを取得
        const keys = path.split('/');
        let result = data;

        for (const key of keys) {
            if (result[key] !== undefined) {
                result = result[key];
            } else {
                // キーが存在しない場合は404エラーメッセージを表示
                document.body.textContent = "404 error";
                return;
            }
        }

        // 取得した値を表示
        document.body.textContent = JSON.stringify(result, null, 2);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        // エラーが発生した場合も404エラーメッセージを表示
        document.body.textContent = "404 error";
    });
