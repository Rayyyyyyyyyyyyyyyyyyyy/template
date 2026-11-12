// ==================== 表格相關常量配置 ====================

// 常量定義
export const DEMO_CONSTANTS = {
  LOADING_DURATION: 2000,
  STATUS_CONFIG: {
    active: { icon: '●', text: '啟用', class: 'text-green-500 text-lg' },
    inactive: { icon: '●', text: '停用', class: 'text-red-500 text-lg' },
    pending: { icon: '○', text: '待處理', class: 'text-yellow-500 text-lg' },
  },
} as const

// 用戶狀態類型
export type UserStatus = 'active' | 'inactive' | 'pending'

// 用戶介面定義
export interface User extends Record<string, unknown> {
  id: number
  name: string
  email: string
  age: number
  department: string
  salary: number
  status: UserStatus
  joinDate: string
}

// 測試用戶數據
export const DEMO_USER_DATA: User[] = [
  {
    id: 1,
    name: '張小明',
    email: 'zhang@example.com',
    age: 28,
    department: '工程部',
    salary: 45000,
    status: 'active',
    joinDate: '2023-01-15',
  },
  {
    id: 2,
    name: '李小華',
    email: 'li@example.com',
    age: 32,
    department: '設計部',
    salary: 52000,
    status: 'active',
    joinDate: '2022-08-20',
  },
  {
    id: 3,
    name: '王小美',
    email: 'wang@example.com',
    age: 25,
    department: '行銷部',
    salary: 38000,
    status: 'pending',
    joinDate: '2024-03-10',
  },
  {
    id: 4,
    name: '陳大強',
    email: 'chen@example.com',
    age: 35,
    department: '工程部',
    salary: 60000,
    status: 'active',
    joinDate: '2021-12-01',
  },
  {
    id: 5,
    name: '林小芳',
    email: 'lin@example.com',
    age: 29,
    department: '設計部',
    salary: 48000,
    status: 'inactive',
    joinDate: '2023-06-15',
  },
]
