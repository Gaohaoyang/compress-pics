const readline = require('readline')
const fs = require('fs')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  completer: completer,
})

function completer(line) {
  const completions = getDirectoryCompletions(line)
  const hits = completions.filter((c) => c.startsWith(line))

  // 如果只有一个匹配项，则自动补全
  return [hits.length ? hits : completions, line]
}

function getDirectoryCompletions(line) {
  // 获取当前目录下的所有文件和目录
  const files = fs.readdirSync(line)

  // 过滤出目录
  const directories = files.filter((file) => fs.statSync(file).isDirectory())

  // 添加路径分隔符，以便于自动补全
  return directories.map((dir) => dir + '/')
}

rl.on('line', (input) => {
  // 捕捉 Tab 键按下事件
  if (input.endsWith('\t')) {
    rl.write(null, { ctrl: true, name: 'e' }) // 触发 Tab 键事件
  }
})

rl.question('请输入目录路径：', (answer) => {
  console.log('您输入的目录是：', answer)
  rl.close()
})
