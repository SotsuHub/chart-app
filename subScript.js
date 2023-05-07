"use strict";

// 😊消去ボタン処理
function pushClearButton() {
    localStorage.clear();
    // テーブルの値を消去する
    inputAllElementsArray.forEach((element) => (element.value = ""));
    console.log("全て消去しました");
}
