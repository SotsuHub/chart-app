"use strict";

const setGraphData = (array) => {
    graphData = {
        labels: ["Pアイドル", "Dアイドル", "1000rpm", "1300rpm"],
        datasets: [
            {
                label: "正常",
                data: array[0],
                borderColor: "#c0b097",
                backgroundColor: "#c0b097",
                hidden: !graphLineIsVisible[0],
            },
            {
                label: "エアフロ特性ずれ",
                data: array[1],
                borderColor: "#5fda86",
                backgroundColor: "#5fda86",
                hidden: !graphLineIsVisible[1],
            },
            {
                label: "エア吸い",
                data: array[2],
                borderColor: "#71eeff",
                backgroundColor: "#71eeff",
                hidden: !graphLineIsVisible[2],
            },
            {
                label: "燃料ライン詰まり",
                data: array[3],
                borderColor: "#ff7364",
                backgroundColor: "#ff7364",
                hidden: !graphLineIsVisible[3],
            },
        ],
    };
};

const setGraphOptions = (min, max, step) => {
    graphOptions = {
        responsive: false,
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            y: {
                min: min,
                max: max,
                ticks: {
                    stepSize: step,
                },
            },
        },
    };
};

const settingGraph = (tableId) => {
    // グラフを出力する
    if (tableId === "table1") {
        setGraphData(loadData(tableId));
        setGraphOptions(0, 10, 1);
        return drawGraph(graphData, graphOptions, "graph1");
    }
    if (tableId === "table2") {
        setGraphData(loadData("table2"));
        setGraphOptions(-20, 40, 10);
        return drawGraph(graphData, graphOptions, "graph2");
    }
    if (tableId === "table3") {
        setGraphData(loadData("table3"));
        setGraphOptions(0, 7000, 1000);
        return drawGraph(graphData, graphOptions, "graph3");
    }
};

const drawGraph = (data, options, graphType) => {
    // グラフを描画する
    const context = document.getElementById(graphType).getContext("2d");
    return new Chart(context, {
        type: "line",
        data: data,
        options: options,
    });
};

const inputTestData = () => {
    //ランダムなテストデータをテーブルに入力する
    for (let i = 0; i <= 3; i++) {
        document.getElementById(`A${i}`).value = random(9.9);
        document.getElementById(`B${i}`).value = random(9.9);
        document.getElementById(`C${i}`).value = random(9.9);
        document.getElementById(`D${i}`).value = random(9.9);
        document.getElementById(`E${i}`).value = random(39.9);
        document.getElementById(`F${i}`).value = random(39.9);
        document.getElementById(`G${i}`).value = random(39.9);
        document.getElementById(`H${i}`).value = random(39.9);
        document.getElementById(`I${i}`).value = random(7000);
        document.getElementById(`J${i}`).value = random(7000);
        document.getElementById(`K${i}`).value = random(7000);
        document.getElementById(`L${i}`).value = random(7000);
    }
};

const random = (max) => {
    // 引数が整数か小数点ありかを判断しそれに応じたランダム値を返す
    if (Number.isInteger(max)) {
        return Math.floor(Math.random() * max);
    } else {
        let result = Math.random() * max;
        return result.toFixed(2);
    }
};

const saveTableDataToLocalStorage = (tableId) => {
    //テーブルの値をローカルストレージに保存する
    let table = document.getElementById(tableId);
    const tableData = { col1: [], col2: [], col3: [], col4: [] };

    for (let rowIndex = 1; rowIndex < table.rows.length; rowIndex++) {
        // 各行のループ処理(trタグ)
        const tr = table.rows[rowIndex];
        for (let colIndex = 1; colIndex < tr.cells.length; colIndex++) {
            // 各列のループ処理(tdタグ)
            const td = tr.cells[colIndex];
            const input = td.querySelector("input");
            if (input) {
                // input要素がある場合は配列に追加
                switch (colIndex) {
                    case 1:
                        tableData.col1.push(input.value);
                        break;
                    case 2:
                        tableData.col2.push(input.value);
                        break;
                    case 3:
                        tableData.col3.push(input.value);
                        break;
                    case 4:
                        tableData.col4.push(input.value);
                        break;
                    default:
                        break;
                }
            }
        }
    }
    const data = Object.values(tableData);
    const json = JSON.stringify(data, undefined, 1);
    localStorage.setItem(tableId, json);
};

const loadData = (obj) => {
    // ローカルストレージを読み込む
    const json = localStorage.getItem(obj);
    // ローカルストレージのJSONを配列で返す
    return JSON.parse(json);
};

const myGraphExists = (array) => {
    array.forEach((element) => {
        if (element) {
            element.destroy();
        }
    });
};

const inputTableData = () => {
    // ローカルストレージの値をテーブルに入力する
    if ("table1" in localStorage) {
        let arrayA = loadData("table1")[0];
        let arrayB = loadData("table1")[1];
        let arrayC = loadData("table1")[2];
        let arrayD = loadData("table1")[3];
        arrayA.forEach((element, index) => {
            document.getElementById(`A${index}`).value = element;
        });
        arrayB.forEach((element, index) => {
            document.getElementById(`B${index}`).value = element;
        });
        arrayC.forEach((element, index) => {
            document.getElementById(`C${index}`).value = element;
        });
        arrayD.forEach((element, index) => {
            document.getElementById(`D${index}`).value = element;
        });
    }

    if ("table2" in localStorage) {
        let arrayE = loadData("table2")[0];
        let arrayF = loadData("table2")[1];
        let arrayG = loadData("table2")[2];
        let arrayH = loadData("table2")[3];
        arrayE.forEach((element, index) => {
            document.getElementById(`E${index}`).value = element;
        });
        arrayF.forEach((element, index) => {
            document.getElementById(`F${index}`).value = element;
        });
        arrayG.forEach((element, index) => {
            document.getElementById(`G${index}`).value = element;
        });
        arrayH.forEach((element, index) => {
            document.getElementById(`H${index}`).value = element;
        });
    }

    if ("table3" in localStorage) {
        let arrayE = loadData("table3")[0];
        let arrayF = loadData("table3")[1];
        let arrayG = loadData("table3")[2];
        let arrayH = loadData("table3")[3];
        arrayE.forEach((element, index) => {
            document.getElementById(`I${index}`).value = element;
        });
        arrayF.forEach((element, index) => {
            document.getElementById(`J${index}`).value = element;
        });
        arrayG.forEach((element, index) => {
            document.getElementById(`K${index}`).value = element;
        });
        arrayH.forEach((element, index) => {
            document.getElementById(`L${index}`).value = element;
        });
    }
};

// 👇変数宣言
const inputAllElements = document.querySelectorAll("table input");
const inputAllElementsArray = Array.from(inputAllElements);
const inputTable1Elements = document.querySelectorAll("#table1 input");
const inputTable1ElementsArray = Array.from(inputTable1Elements);
const inputTable2Elements = document.querySelectorAll("#table2 input");
const inputTable2ElementsArray = Array.from(inputTable2Elements);
const inputTable3Elements = document.querySelectorAll("#table3 input");
const inputTable3ElementsArray = Array.from(inputTable3Elements);
let graphData;
let graphOptions;
let myGraph_table1, myGraph_table2, myGraph_table3;
let graphLineIsVisible = [true, true, true, true];

// 👇ページ読み込み時の処理
inputTableData();
myGraph_table1 = settingGraph("table1");
myGraph_table2 = settingGraph("table2");
myGraph_table3 = settingGraph("table3");

// 👇ランダム入力ボタン処理
function pushTestButton() {
    inputTestData();
    saveTableDataToLocalStorage("table1");
    saveTableDataToLocalStorage("table2");
    saveTableDataToLocalStorage("table3");
}

// 👇グラフ更新ボタン処理
function pushNewDataButton() {
    // すでにグラフが生成されている場合は、グラフを破棄する
    myGraphExists([myGraph_table1, myGraph_table2, myGraph_table3]);
    // テーブルデータをローカルストレージに保存する
    saveTableDataToLocalStorage("table1");
    saveTableDataToLocalStorage("table2");
    saveTableDataToLocalStorage("table3");
    // グラフを更新する
    myGraph_table1 = settingGraph("table1");
    myGraph_table2 = settingGraph("table2");
    myGraph_table3 = settingGraph("table3");
}

// 👇オールクリアボタン処理
function pushClearButton() {
    if (!confirm("本当にデータをクリアしますか？")) {
        return;
    }
    // テーブルの値を消去する
    inputAllElementsArray.forEach((element) => (element.value = ""));
    // テーブルデータをローカルストレージに保存する
    saveTableDataToLocalStorage("table1");
    saveTableDataToLocalStorage("table2");
    saveTableDataToLocalStorage("table3");
    // グラフ更新ボタン
    pushNewDataButton();
}

// 👇トグルボタン処理
let switches = document.querySelectorAll('[id^="switch"]');

switches.forEach((element) => {
    element.addEventListener("change", () => {
        switches.forEach((element, index) => {
            graphLineIsVisible[index] = !element.checked;
        });
        pushNewDataButton();
    });
});

// 👇入力値の変換処理
let convertToHalfWidth = (event) => {
    let input = event.target;
    let inputValue = input.value;

    // 全角のハイフンを半角のハイフンに変換する
    let hyphenReplaced = inputValue.replace(/ー/g, "-");

    // 全角数字を半角数字に変換する
    let digitReplaced = hyphenReplaced.replace(/[０-９]/g, (s) => {
        return String.fromCharCode(s.charCodeAt(0) - 65248);
    });

    if (digitReplaced !== inputValue) {
        input.value = digitReplaced;
    }
};
// 入力欄にイベントリスナーを追加
let inputs = document.querySelectorAll("input[type='text']");
for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("input", convertToHalfWidth);
}
