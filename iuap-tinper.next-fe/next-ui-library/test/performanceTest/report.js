export default function generateReport(data) {
    data.sort((a, b) => b.totalTime - a.totalTime);
    const fs = require('fs');
    const cssStyle = `
    <style>
        body{
            font-family: Times;
        }
        h2 {
        text-align: center;
        }
        table {
        border-collapse: collapse;
        width: 100%;
        margin: 20px 0;
        }
        th, td {
        border: 1px solid black;
        padding: 8px;
        text-align: left;
        }
        th {
        background-color: #4CAF50;
        color: white;
        font-weight: bold;
        }
        tr:nth-child(even) {
        background-color: #f2f2f2;
        }
        tr:hover {
        background-color: #ddd;
        }
        th[colspan="2"],
        th[colspan="3"] {
            text-align: center;
        }
    </style>
    `;

    const tableHtml = `
<table>
    <thead>
        <tr>
            <th rowspan="2">组件</th>
            <th colspan="2">Render</th>
            <th colspan="3">其他方法</th>
            <th rowspan="2">总时间</th>
        </tr>
        <tr>
            <th>执行次数</th>
            <th>执行时间</th>
            <th>方法名</th>
            <th>执行次数</th>
            <th>平均时间</th>
        </tr>
    </thead>
    <tbody>
        ${data.map(({ compName, execution, totalTime }) => {
        // 将执行数据按方法名进行分类
        const methods = execution.reduce((acc, curr) => {
            if (acc[curr.methodName]) {
                acc[curr.methodName].push(curr.time);
            } else {
                acc[curr.methodName] = [curr.time];
            }
            return acc;
        }, {});

        // 计算每个方法的执行次数和平均执行时间
        const processedData = Object.entries(methods).reduce(
            (acc, [methodName, times]) => {
                const count = times.length;
                const totalTime = times.reduce((total, time) => {
                    const num = parseFloat(time);
                    return total + num;
                }, 0);
                const avgTime = (totalTime / count).toFixed(4);
                acc.methods += `${methodName}<br>`;
                acc.counts += `${count}<br>`;
                acc.avgTimes += `${avgTime}<br>`;
                return acc;
            },
            { methods: "", counts: "", avgTimes: "" }
        );

        const Record = execution.filter(data => data.methodName === "render").reduce((acc, data) => ({
            count: acc.count + 1,
            time: acc.time + data.time + "<br>",
        }), { count: 0, time: "" });

        const result = `
            <tr>
            <td>${compName}</td>
            <td>${Record.count}</td>
            <td>${Record.time}</td>
            <td>${processedData.methods}</td>
            <td>${processedData.counts}</td>
            <td>${processedData.avgTimes}</td>
            <td>${totalTime}ms</td>
            </tr>
            `;
        return result
    }).join('')}
    </tbody>
</table>`;


    const html = `
<html>
    <head>
    <meta charset="utf-8">
    <title>组件性能测试报告</title>
    ${cssStyle}
    </head>
    <body>
    <h2>Performance Report</h3>
    ${tableHtml}
    </body>
</html>
`;
    fs.writeFile('./coverage/performanceReport.html', html, (err) => {
        if (err) throw err;
    });

    console.log('The performance test report has been created!');
}
