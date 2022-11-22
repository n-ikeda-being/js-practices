#! /usr/bin/env nodememoFile
const fs = require('fs')
const { Select } = require('enquirer')
const argv = require('minimist')(process.argv.slice(2))

function main () {
  const memoFile = new MemoFile()
  if (argv.l) {
    memoFile.showMemos()
  } else if (argv.r) {
    memoFile.referenceMemo()
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

  // 作成
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

  // 全て表示
  showMemos () {
    this.memos.forEach(memo => { console.log(memo.title) })
  }

  // 削除
  deleteMemo () {
    const memos = this.memos
    const message = 'Choose a note you want to delete:'
    this.#selectPrompt(message, memos)
  }

  // 特定のメモ参照
  referenceMemo () {
    const memos = this.memos
    const message = 'Choose a note you want to see:'
    this.#selectPrompt(message, memos)
  }

  #selectPrompt (message, memos) {
    return new Select({
      type: 'select',
      choices: memos,
      message: message
    }).run()
  }
}

main()
