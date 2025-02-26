const ConsoleGrid = require('console-grid');
const CGS = ConsoleGrid.Style;
const grid = new ConsoleGrid();
const { debounce } = require('./utils')
const fs = require('fs');
let total = 0;
const propsTable = {
	option: { sortField: 'name' },
	columns: [{
		id: 'component',
		name: '组件',
		type: 'string',
		maxWidth: 40
	},
	{
		id: 'testedProps',
		name: CGS.green('已覆盖props'),
		type: 'string',
		maxWidth: 50,
		formatter: (v, row, column) => v
	},
	{
		id: 'noTestedProps',
		name: CGS.red('未覆盖的props'),
		type: 'string',
		maxWidth: 60,
		formatter: (v, row, column) => v
	},
	{
		id: 'coverage',
		name: '覆盖率',
		type: 'string',
		maxWidth: 6,
		formatter: (v, row, column) => v
	}
	],
	rows: []
};
const generateHtml = (trDatas) => {
	let coverageTrs = '';
	let coverageArr = 0;
	let unCoverageArr = 0;
	trDatas.forEach((tdDatas) => {
		let coverageTds = ''
		tdDatas.forEach((tdData, index) => {
			if (index === 1 && tdData !== '-') coverageArr += tdData.match(/\s/g) ? tdData.match(/\s/g).length + 1 : 1
			if (index === 2 && tdData && tdData !== '-') unCoverageArr += tdData.match(/\s/g) ? tdData.match(/\s/g).length + 1 : 1
			let className = '';
			if (index === 1) {
				className += 'td-green'
			} else if (index === 2) {
				className += 'td-red'
			} else if (index === 3) {
				className += +(`${tdData}`.split('%')[0]) >= 0.8 ? 'td-green' : 'td-red'
			}
			coverageTds += `<td class=${className}>${tdData}</td>`
		})
		coverageTrs += `<tr>${coverageTds}</tr>`
	});
	// 计算百分比平均值
	const average = (total / trDatas.length) * 100; // 这里采用将每个组件的百分比进行平均
	// const average = (coverageArr / (unCoverageArr + coverageArr)) * 100;
	const averageWithTwoDecimals = average.toFixed(2);

	const html = `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>Title</title>
      <style>
        td,th {
          border: 1px solid #dddddd;
          text-align: left;
          padding: 8px;
        }
        .td-green {
          color:green;
        }
        .td-red {
          color:red;
        }
      </style>
    </head>
    <body>
      <div>
        <table>
          <tr>
            <th>组件</th>
            <th>已覆盖props</th>
            <th>未覆盖的props</th>
            <th>coverage</th>
          </tr>
          ${coverageTrs}
          <tr>
            <th>合计</th>
            <th>${coverageArr}</th>
            <th>${unCoverageArr}</th>
            <th>${averageWithTwoDecimals}%</th>
          </tr>
        </table>
      </div>
    </body>
  </html>`;
	if (!fs.existsSync('coverage')) {
		fs.mkdirSync('coverage');
	}
	fs.writeFile('coverage/test-props-coverage.html', html, error => {
		if (error) {
			console.log(error);
		}
	});
}
const htmlData = [];
const debounceRender = debounce((data) => {
	grid.render(data.propsTable);
	generateHtml(data.htmlData)
});
const coverageLog = (component, testedProps, noTestedProps) => {
	total += testedProps.length / (noTestedProps.length + testedProps.length);
	propsTable.rows.push(
		{
			component,
			testedProps: CGS.green(testedProps.length ? testedProps.join(' ') : '-'),
			noTestedProps: CGS.red(noTestedProps.length ? noTestedProps.join(' ') : '-'),
			coverage: testedProps[0] === '-' ? 0 : `${(testedProps.length / (noTestedProps.length + testedProps.length)).toFixed(2) * 100}%`
		}
	)
	htmlData.push([component, testedProps.length ? testedProps.join(' ') : '-',
		noTestedProps.length ? noTestedProps.join(' ') : '-',
		testedProps[0] === '-' ? 0 : `${(testedProps.length / (noTestedProps.length + testedProps.length)).toFixed(2) * 100}%`])
	debounceRender({ propsTable, htmlData });
}
module.exports = {
	coverageLog,
	propsTable
}
