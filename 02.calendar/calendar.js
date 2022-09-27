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
const firstWday = new Date(year, month - 1, 1).getDay()
let wday = firstWday
// 月末
const lastDay = new Date(year, month, 0)
const lastDayNum = lastDay.getDate()

const title = `      ${year}年${month}月`
console.log(title)
console.log(' 日 月 火 水 木 金 土')

// 初日の曜日になるまで空白で調整
for (let count = 0; firstWday > count; count++) {
  process.stdout.write('   ')
}

for (let day = firstDay; day <= lastDayNum; day++) {
  wday++
  process.stdout.write(day.toString(10).padStart(3, ' '))
  if (wday % 7 === 0) {
    process.stdout.write('\n')
  }
}
