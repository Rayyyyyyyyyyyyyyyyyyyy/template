import fs from 'fs'

const SHEET_API_URL =
  'https://script.google.com/macros/s/AKfycbyKKFU4uXSOlq2xAcfmfjuaMA6Aa8kqlR3iwAbNB1xlC94aef76EJ7W12HeNYG9JYTDyg/exec' // google sheet API 網址
const I18N_DIR = './src/locales' // 存放 JSON 的資料夾

fetch(SHEET_API_URL, { method: 'GET', redirect: 'follow' })
  .then((response) => {
    console.log('🚀 API 內容類型:', response.headers.get('content-type'))
    return response.json()
  })
  .then((data) => {
    console.log('🎉 取得資料:', data)
    if (!fs.existsSync(I18N_DIR)) {
      fs.mkdirSync(I18N_DIR)
    }
    Object.keys(data).forEach((lang) => {
      const filePath = `${I18N_DIR}/${lang}.json`
      fs.writeFileSync(filePath, JSON.stringify(data[lang], null, 2))
      console.log(`✅ 更新 ${filePath}`)
    })

    console.log('📦 JSON 檔案已儲存')
  })
  .catch((error) => console.error('❌ 錯誤:', error))
