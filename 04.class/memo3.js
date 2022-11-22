#! /usr/bin/env nodememoFile
const fs = require('fs')
const { Select } = require('enquirer')
const argv = require('minimist')(process.argv.slice(2))

function main () {
  const memoFile = new MemoFile()
  if (argv.l) {
    memoFile.showMemos()
  } else if (argv.r) {
    memoFile.insideMemos()
  } else if (argv.d) {
    memoFile.deleteMemo()
  } else {
    const input = fs.readFileSync('/dev/stdin', 'utf8')
    memoFile.addMemo(input)
  }
}
class MemoFile {
  constructor () {
    this.memos = JSON.parse(fs.readFileSync('./memos.json', 'utf8'))
  }

  addMemo (input) {
    console.log(input)
    const memos = this.memos
    console.log(input)

    const newMemo = {
      title: input,
      content: input
    }

    memos.push(newMemo)
    fs.writeFileSync('./memos.json', JSON.stringify(memos))
  }

  showMemos () {
    this.memos.forEach(memo => { console.log(memo.title) })
  }
}

main()
