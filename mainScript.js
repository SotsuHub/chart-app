"use strict";

// 😊変数宣言
let chartData;
let chartOptions;
let myChart_table1;
let myChart_table2;
let myChart_table3;

const setChartData = (array) => {
    chartData = {
        labels: ["Pアイドル", "Dアイドル", "1000rpm", "1300rpm"],
        datasets: [
            {
                label: "正常",
                data: array[0],
                borderColor: "#c0b097",
                backgroundColor: "#c0b097",
            },
            {
                label: "エアフロ特性ずれ",
                data: array[1],
                borderColor: "#5fda86",
                backgroundColor: "#5fda86",
            },
            {
                label: "エア吸い",
                data: array[2],
                borderColor: "#71eeff",
                backgroundColor: "#71eeff",
            },
            {
                label: "燃料ライン詰まり",
                data: array[3],
                borderColor: "#ff7364",
                backgroundColor: "#ff7364",
            },
        ],
    };
};

const setChartOptions = (min, max, step) => {
    chartOptions = {
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

const settingChart = (tableId) => {
    // グラフを出力する
    if (tableId === "table1") {
        setChartData(loadData(tableId));
        setChartOptions(0, 10, 1);
        return drawChart(chartData, chartOptions, "chart1");
    }
    if (tableId === "table2") {
        setChartData(loadData("table2"));
        setChartOptions(-10, 50, 10);
        return drawChart(chartData, chartOptions, "chart2");
    }
    if (tableId === "table3") {
        setChartData(loadData("table3"));
        setChartOptions(0, 7000, 1000);
        return drawChart(chartData, chartOptions, "chart3");
    }
};

const loadData = (obj) => {
    // ローカルストレージを読み込む
    const json = localStorage.getItem(obj);
    // ローカルストレージのJSONを配列で返す
    return JSON.parse(json);
};

const drawChart = (data, options, chartType) => {
    // グラフを描画する
    const context = document.getElementById(chartType).getContext("2d");
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
        document.getElementById(`E${i}`).value = random(49.9);
        document.getElementById(`F${i}`).value = random(49.9);
        document.getElementById(`G${i}`).value = random(49.9);
        document.getElementById(`H${i}`).value = random(49.9);
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

const myChartExists = (array) => {
    array.forEach((element) => {
        if (element) {
            element.destroy();
        }
    });
};

// 👇ページ更新処理
inputTableData();
myChart_table1 = settingChart("table1");
myChart_table2 = settingChart("table2");
myChart_table3 = settingChart("table3");

// 👇ランダム入力ボタン処理
function pushTestButton() {
    inputTestData();
    saveTableDataToLocalStorage("table1");
    saveTableDataToLocalStorage("table2");
    saveTableDataToLocalStorage("table3");
}

// 👇新しいグラフボタン処理
function pushNewDataButton() {
    // すでにグラフが生成されている場合は、グラフを破棄する
    myChartExists([myChart_table1, myChart_table2, myChart_table3]);
    // テーブルデータをローカルストレージに保存する
    saveTableDataToLocalStorage("table1");
    saveTableDataToLocalStorage("table2");
    saveTableDataToLocalStorage("table3");
    // グラフを更新する
    myChart_table1 = settingChart("table1");
    myChart_table2 = settingChart("table2");
    myChart_table3 = settingChart("table3");
}

// 👇消去ボタン処理
function pushClearButton() {
    // テーブルの値を消去する
    inputAllElementsArray.forEach((element) => (element.value = ""));
    // テーブルデータをローカルストレージに保存する
    saveTableDataToLocalStorage("table1");
    saveTableDataToLocalStorage("table2");
    saveTableDataToLocalStorage("table3");
    // 新しいグラフボタン処理
    pushNewDataButton();
}
