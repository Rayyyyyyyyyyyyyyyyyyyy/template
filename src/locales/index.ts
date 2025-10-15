import zhTW from './zh-TW.json'
import enUS from './en-US.json'

export const messages = {
  'zh-TW': zhTW,
  'en-US': enUS,
}

export type LocaleType = keyof typeof messages

export { zhTW, enUS }

