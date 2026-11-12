export const themeTokens = [
  { name: '--rvtc-panel-max-height', fallback: 'calc(100vh - 180px)', usage: 'MainPanel 內容區最大高度' },
  { name: '--rvtc-detail-min-height', fallback: 'calc(100vh - 200px)', usage: 'DetailLayout 容器最小高度' },
  { name: '--rvtc-detail-content-max-height', fallback: 'calc(100vh - 100px)', usage: 'DetailLayout 內容區最大高度' },
  { name: '--rvtc-toolbar-bg', fallback: 'var(--el-fill-color)', usage: 'SortTable／TitleTable 工具列背景' },
  { name: '--rvtc-header-bg', fallback: 'var(--el-fill-color-light)', usage: 'FunctionHeader 背景' },
  { name: '--rvtc-text', fallback: 'var(--el-text-color-primary)', usage: 'FunctionHeader 返回鈕文字色' },
  { name: '--rvtc-on-fill', fallback: 'var(--el-color-white)', usage: 'BaseBtn 填充樣式禁用狀態文字色' },
  { name: '--rvtc-control-min-size', fallback: '44px', usage: '圖示按鈕最小點擊尺寸' },
  { name: '--rvtc-table-header-bg', fallback: '#f5f7fa', usage: 'BaseTable／SortTable／TitleTable 表頭背景（深色：var(--el-fill-color-light)）' },
  { name: '--rvtc-table-header-text', fallback: '#333', usage: '表頭文字色（深色：var(--el-text-color-primary)）' },
  { name: '--rvtc-dialog-header-bg', fallback: '#f5f7fa', usage: 'BaseDialog 系列標題列背景（深色：var(--el-fill-color-light)）' },
  { name: '--rvtc-link-text', fallback: '#256fc0', usage: '表格內 `.blue-text` 連結色（深色：#79bbff）' },
]
