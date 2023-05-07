"use strict";

// 😊変数宣言
let chartData;
let chartOptions;
let myChart_table1;
let myChart_table2;
let myChart_table3;

const loadData = (obj) => {
    // ローカルストレージを読み込む
    let json = localStorage.getItem(obj); // ローカルストレージのJSONを配列で返す
    return JSON.parse(json);
};

const setChartData = (array) => {
    // グラフデータ設定
    chartData = {
        labels: ["Pアイドル", "Dアイドル", "1000rpm", "1300rpm"],
        datasets: [
            {
                label: "正常",
                data: array[0],
                borderColor: "#9a8d79",
                backgroundColor: "#9a8d79",
            },
            {
                label: "エアフロ特性ずれ",
                data: array[1],
                borderColor: "#56c278",
                backgroundColor: "#56c278",
            },
            {
                label: "エア吸い",
                data: array[2],
                borderColor: "#66dfe5",
                backgroundColor: "#66dfe5",
            },
            {
                label: "燃料ライン詰まり",
                data: array[3],
                borderColor: "#dd0902",
                backgroundColor: "#dd0902",
            },
        ],
    };
};

const setChartOptions = (max, step) => {
    // グラフオプション設定
    chartOptions = {
        responsive: false,
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            y: {
                min: 0,
                max: max,
                ticks: {
                    stepSize: step,
                },
            },
        },
    };
};

const settingChart = (tableType) => {
    // グラフを出力する
    if (tableType === "table1") {
        setChartData(loadData(tableType));
        setChartOptions(1.2, 0.1);
        return drawChart(chartData, chartOptions, "chart1");
    }
    if (tableType === "table2") {
        setChartData(loadData("table2"));
        setChartOptions(40, 5);
        return drawChart(chartData, chartOptions, "chart2");
    }
    if (tableType === "table3") {
        setChartData(loadData("table3"));
        setChartOptions(10000, 1000);
        return drawChart(chartData, chartOptions, "chart3");
    }
};

const drawChart = (data, options, chartType) => {
    // グラフを描画する
    let context = document.getElementById(chartType).getContext("2d");
    window.myChart = new Chart(context, {
        type: "line",
        data: data,
        options: options,
    });
    return window.myChart;
};

const inputTestData = () => {
    //ランダムなテストデータをテーブルに入力する
    for (let i = 0; i <= 3; i++) {
        document.getElementById(`A${i}`).value = random(1.2);
        document.getElementById(`B${i}`).value = random(1.2);
        document.getElementById(`C${i}`).value = random(1.2);
        document.getElementById(`D${i}`).value = random(1.2);
        document.getElementById(`E${i}`).value = random(40);
        document.getElementById(`F${i}`).value = random(40);
        document.getElementById(`G${i}`).value = random(40);
        document.getElementById(`H${i}`).value = random(40);
        document.getElementById(`I${i}`).value = random(10000);
        document.getElementById(`J${i}`).value = random(10000);
        document.getElementById(`K${i}`).value = random(10000);
        document.getElementById(`L${i}`).value = random(10000);
    }
};

const random = (max) => {
    // 引数が整数か小数点ありかを判断しそれに応じたランダム値を返す
    if (Number.isInteger(max)) {
        return Math.floor(Math.random() * max);
    } else {
        return Math.random() * max;
    }
};

const getTableDataToSave = (tableType) => {
    //テーブルの値をローカルストレージに保存する
    let data = [];
    let table = document.getElementById(tableType);
    let tableRow = table.querySelectorAll("tr");

    tableRow.forEach((tr) => {
        // テーブルの1行(trタグ)毎に処理
        let cells = tr.querySelectorAll("td"); // セル(td)のNodeListを取得
        if (cells.length != 0) {
            // テーブルのヘッダー部分は飛ばす
            let d = []; // テーブルの行(tr)のデータを格納する配列
            cells.forEach((td, index) => {
                // セル(td)毎に処理
                if (td.innerHTML.indexOf("input") != -1) {
                    // セルがinputだった場合
                    d.push(td.firstElementChild.value);
                } else {
                    d.push("");
                }
            });
            data.push(d);
        }
    });
    let json = JSON.stringify(data, undefined, 1);
    localStorage.setItem(tableType, json);
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

const myChartExists = (obj) => {
    if (obj) {
        obj.destroy();
    }
};

// 👇ページ更新処理
inputTableData();
myChart_table1 = settingChart("table1");
myChart_table2 = settingChart("table2");
myChart_table3 = settingChart("table3");

// 👇テスト入力ボタン処理
function pushTestButton() {
    inputTestData();
    getTableDataToSave("table1");
    getTableDataToSave("table2");
    getTableDataToSave("table3");
}

// 👇グラフ出力ボタン処理
function pushNewDataButton() {
    // すでにグラフが生成されている場合は、グラフを破棄する
    myChartExists(myChart_table1);
    myChartExists(myChart_table2);
    myChartExists(myChart_table3);

    // テーブルデータをローカルストレージに保存する
    getTableDataToSave("table1");
    getTableDataToSave("table2");
    getTableDataToSave("table3");

    // グラフを更新する
    myChart_table1 = settingChart("table1");
    myChart_table2 = settingChart("table2");
    myChart_table3 = settingChart("table3");
}
