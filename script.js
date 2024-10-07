// URLのパスを取得し、スラッシュで分割
const path = window.location.pathname.substring(1).split('/');

// JSONデータを取得
fetch('data.json')
    .then(response => response.json())  // レスポンスをJSONに変換
    .then(data => {
        let result = data;  // dataをresultに格納

        // パスに基づいてネストされたデータを取得
        for (const segment of path) {
            if (result[segment] !== undefined) {
                result = result[segment];  // ネストされたデータに移動
            } else {
                result = null;  // 該当するキーがなければnull
                break;
            }
        }

        // ページ全体を取得された結果のみに設定
        document.body.textContent = typeof result === 'object' 
            ? JSON.stringify(result, null, 2)  // オブジェクトをJSON文字列に変換
            : result;  // 文字列や他の型はそのまま表示
    })
    .catch(error => {
        console.error('Error:', error);
        document.body.textContent = 'Failed to retrieve data.';
    });
