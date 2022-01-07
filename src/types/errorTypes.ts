export enum EErrorCode {
  authFailed,
  internalError = 1,
  refreshFailed,
  accessDenied,
  blocked,
  serverSideError,
  unexpectedOperation,
  verificationNeeded,

  /** server 傳來 json decode 錯誤，可能是 payload 上傳時沒有 JSON.stringify */
  inValidOperation = 100,
  /** 方法不支援 */
  methodNotAllowed = 100,
  /** 可能為payload格式錯誤 1) 多key 2) 格式不合,如validation error*/
  payloadError = 108,
  /** 找不到key, 可能結構包錯*/
  payloadMissingKey = 109,
  needAuthToken = 300,
  tokenExpired = 302,
  userNameExists = 305,
  userNotExistsOrWrongPassword = 307,
  frontEndError = 10000
}
