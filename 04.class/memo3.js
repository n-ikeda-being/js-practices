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
    console.log('文字を入力してください。１行目がタイトル、２行目の文字が内容として保存されます')
    const input = fs.readFileSync('/dev/stdin', 'utf8')
    memoFile.addMemo(input)
  }
}
class MemoFile {
  constructor () {
    this.memos = JSON.parse(fs.readFileSync('./memos.json', 'utf8'))
  }

  // 新規作成
  addMemo (input) {
    const memos = this.memos
    const inputTitle = input.split('\n')[0]
    const inputContent = input.split('\n')[1]
    const newMemo = {
      title: inputTitle,
      content: inputContent
    }

    memos.push(newMemo)
    fs.writeFileSync('./memos.json', JSON.stringify(memos))
  }

  // 全て表示
  showMemos () {
    this.memos.forEach(memo => { console.log(memo.title) })
  }

  // 特定のメモ削除
  deleteMemo () {
    const message = 'Choose a note you want to delete:'
    const memos = this.memos
    const prompt = this.#selectPrompt(message, memos)

    // answer(選択したデータ)以外抽出してmemos.jsonに書き込み
    prompt.run()
      .then((answer) => {
        const notdeletedmemo = memos.filter(memo => memo.title !== answer)
        fs.writeFileSync('./memos.json', JSON.stringify(notdeletedmemo))
      })
      .catch(console.error)
  }

  // 特定のメモ参照
  referenceMemo () {
    const message = 'Choose a note you want to see:'
    const memos = this.memos
    const prompt = this.#selectPrompt(message, memos)

    prompt.run()
      .then((answer) => {
        const memo = memos.find(memo => memo.title === answer)
        const content = memo.content
        console.log(content)
      })
      .catch(console.error)
  }

  #selectPrompt (message, memos) {
    return new Select({
      type: 'select',
      message: message,
      choices: memos
    })
  }
}

main()
