const fs = require("fs");

const members = [
    '李芸芸',
    '马俊超',
    '邵海龙',
    '江卫星'
];
// 放假日期
const holidays = [
    '2024-01-01',
    '2024-02-10',
    '2024-02-11',
    '2024-02-12',
    '2024-02-13',
    '2024-02-14',
    '2024-02-15',
    '2024-02-16',
    '2024-02-17',
    '2024-04-04',
    '2024-04-05',
    '2024-04-06',
    '2024-05-01',
    '2024-05-02',
    '2024-05-03',
    '2024-05-04',
    '2024-05-05',
    '2024-06-08',
    '2024-06-09',
    '2024-06-10',
    '2024-09-15',
    '2024-09-16',
    '2024-09-17',
    '2024-10-01',
    '2024-10-02',
    '2024-10-03',
    '2024-10-04',
    '2024-10-05',
    '2024-10-06',
    '2024-10-07',
];
// 周末额外排班
const extraWork = [
    '2024-02-04',
    '2024-02-18',
    '2024-04-07',
    '2024-04-28',
    '2024-05-11',
    '2024-09-14',
    '2024-09-29',
    '2024-10-12',
];
// 定义起始日期
const startDate = new Date('2024-01-01');

// 定义结束日期
const endDate = new Date('2024-12-31');

// 循环遍历日期
let currentDate = startDate;
const filePath = '/Users/liyunyun/Desktop/2024.txt';
let num = 0;

const fileStream = fs.createWriteStream(filePath);

while (currentDate <= endDate) {
    const dateStr = currentDate.toISOString().split('T')[0];

    // 星期6 且不是节假日 且不是加班
    if(currentDate.getDay() == 6 && !extraWork.includes(dateStr) && !holidays.includes(dateStr)) {
        // 输出当前日期
        console.log(dateStr);
        if(num === 4) {
            num = 0;
        }
        let dataToWrite = `${dateStr}: ${members[num]}`;
        try {
            // fs.writeFileSync(filePath, dataToWrite);
            fileStream.write(dataToWrite + '\n');
            num = num + 1;

        }catch(err) {
            console.log('err====', err)
        }
    }
    

  // 将当前日期增加一天
  currentDate.setDate(currentDate.getDate() + 1);
}