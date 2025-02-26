const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const spawn = require('cross-spawn');
const axios = require('axios');
const Base64 = require('js-base64');
const env = Object.assign({}, process.env);
const CWD = process.cwd();
console.log('process.env', process.env);
const stdio = [
	process.stdin,
	process.stdout,
	process.stderr,
];
const user = [
	
]
const child = spawn('npm', ['run', 'test:prod'], {
	env,
	cwd: CWD,
	stdio,
});
const email = ({to, subject, text, html}) => {
	const transport = nodemailer.createTransport(smtpTransport({
		host: "smtp.qq.com", // 主机
		secure: true, // 使用 SSL
		secureConnection: true, // 使用 SSL
		port: 465, // SMTP 端口
		auth: {
			user: "2529188543@qq.com", // 账号
			pass: "qkrruyaakmsddhif" // 密码
		}
	}));

// 设置邮件内容
	const arr = []
	to.map(item => {
		const mailOptions = {
			from: "2529188543@qq.com", // 发件地址
			to: item,
			subject,
			// text,
			html,
		}
		arr.push(new Promise((reslove, reject) => {
			transport.sendMail(mailOptions, function (error, response) {
				if (error) {
					reject(error)
				} else {
					reslove(response)
				}
				transport.close(); // 如果没用，关闭连接池
			});
		}))
	})
	return Promise.all(arr)
}
child.on('exit', async code => {
	if (code !== 0) {
		const {CI_PIPELINE_ID, CI_BUILD_REF_NAME, CI_JOB_ID} = process.env;
		const href = 'h' + CI_JOB_ID
		await email({
			to: user,
			subject: `【TinperNext-Test】${CI_PIPELINE_ID}|单元测试失败提醒`,
			html: `<h2>
					有单元测试未通过，请注意检查!
					</h2>
					<p>分支：${CI_BUILD_REF_NAME}，pipeline编号：${CI_PIPELINE_ID}，Job编号：${CI_JOB_ID}</p>
					<p>请点击下面的链接访问报错详情：</p>
					<p><a href='${href}'>${href}</a></p>
					`,
		})
		async function send() {
			try {
				const content = `【单元测试异常提醒】：
---------------------------------
【分   支】${CI_BUILD_REF_NAME}
【Job编号】${CI_JOB_ID}
【访问地址】${href}
---------------------------------
`
				const res = await axios({
					url: '',
					method: 'post',
					data: {
						"timestamp": new Date().getTime(),
						"content": Base64.toBase64(content)
					}
				})
			} catch (e) {
				console.log(e)
			}

		}
		await send()
		//
	}
	process.exit(code);
});
