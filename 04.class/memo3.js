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
    console.log('文字を入力してください。１行目がタイトル、２行目以降が内容として保存されます')
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
    const inputContent = input.split('\n')
    inputContent.shift()
    const Content = inputContent.join('\n')
    const newMemo = {
      title: inputTitle,
      content: Content
    }

    memos.push(newMemo)
    fs.writeFileSync('./memos.json', JSON.stringify(memos))
  }

  // 全て表示
  showMemos () {
    this.memos.forEach(memo => { console.log(memo.title) })
  }

  // 特定のメモ削除
  async deleteMemo () {
    const message = 'Choose a note you want to delete:'
    const memos = this.memos
    const prompt = this.#selectPrompt(message, memos)

    // answer(選択したデータ)以外抽出してmemos.jsonに書き込み
    try {
      const selectDataTitle = await prompt.run()
      const availableMemos = memos.filter(memo => memo.title !== selectDataTitle)
      fs.writeFileSync('./memos.json', JSON.stringify(availableMemos))
    } catch (error) {
      console.log(error)
    }
  }

  // 特定のメモ参照
  async referenceMemo () {
    const message = 'Choose a note you want to see:'
    const memos = this.memos
    const prompt = this.#selectPrompt(message, memos)

    try {
      const selectData = await prompt.run()
      const targetMemo = memos.find(memo => memo.title === selectData)
      console.log(targetMemo.content)
    } catch (error) {
      console.log(error)
    }
  }

  #selectPrompt (message, memos) {
    return new Select({
      type: 'select',
      message,
      choices: memos
    })
  }
}

main()
