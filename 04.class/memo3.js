const fs = require('fs')
const { Select } = require('enquirer')
const argv = require('minimist')(process.argv.slice(2))

function main () {
  const memoFile = new MemoFile()
  if (argv.l) {
    memoFile.showMemos()
  }
}

class MemoFile {
  constructor () {
    this.memos = JSON.parse(fs.readFileSync('./memos.json', 'utf8'))
  }

  showMemos () {
    this.memos.forEach(memo => {
      console.log(memo.title)
    })
  }
}

main()
