const argv = require('minimist')(process.argv.slice(2))
const date = new Date()

// 今年もしくは引数の年
let year = date.getFullYear()
if (argv.y != null) {
  year = argv.y
}

// 今月もしくは引数の月
let month = date.getMonth() + 1
if (argv.m != null) {
  month = argv.m
}

// 月初
const firstDay = 1
// 月初の曜日
let firstWday = new Date(year, month - 1, 1).getDay()
// 月末
const lastDay = new Date(year, month, 0)
const lastDayNum = lastDay.getDate()

const title = `      ${year}` + '年' + `${month}` + '月'
console.log(title)
console.log(' 日 月 火 水 木 金 土')

// 初日の曜日になるまで空白で調整する
for (let count = 0; firstWday > count; count++) {
  process.stdout.write('   ')
}

// 1日~月末まで1ずつ加算しながらループ
// 10進数の文字列に変換して、引数の文字列の長さ(3)まで' 'で埋める
// 7の倍数（土曜日)で改行
for (let day = firstDay; day <= lastDayNum; day++) {
  firstWday++
  process.stdout.write(day.toString(10).padStart(3, ' '))
  if (firstWday % 7 === 0) {
    process.stdout.write('\n')
  }
}
