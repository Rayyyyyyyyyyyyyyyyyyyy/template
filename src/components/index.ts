import { withInstall } from './withInstall'
import BaseTableSfc from './tables/BaseTable.vue'
import BaseBtnSfc from './items/BaseBtn.vue'
import BaseInputSfc from './form/BaseInput.vue'
import BaseSelectorSfc from './form/BaseSelector.vue'
import BaseDialogSfc from './items/BaseDialog.vue'
import BaseWaringDialogSfc from './items/BaseWaringDialog.vue'
import SortTableSfc from './tables/SortTable.vue'
import TitleTableSfc from './tables/TitleTable.vue'
import SearchBarSfc from './items/SearchBar.vue'
import TransferDialogSfc from './transfer/TransferDialog.vue'
import TransferItemSfc from './transfer/transferItem.vue'
import FunctionHeaderSfc from './layout/FunctionHeader.vue'
import MainPanelSfc from './layout/MainPanel.vue'
import SearchableListPanelSfc from './layout/SearchableListPanel.vue'
import DetailLayoutSfc from './layout/DetailLayout.vue'
import FilterLayoutSfc from './layout/FilterLayout.vue'

export const BaseTable = /*#__PURE__*/ withInstall(BaseTableSfc, 'BaseTable')
export const BaseBtn = /*#__PURE__*/ withInstall(BaseBtnSfc, 'BaseBtn')
export const BaseInput = /*#__PURE__*/ withInstall(BaseInputSfc, 'BaseInput')
export const BaseSelector = /*#__PURE__*/ withInstall(BaseSelectorSfc, 'BaseSelector')
export const BaseDialog = /*#__PURE__*/ withInstall(BaseDialogSfc, 'BaseDialog')
export const BaseWaringDialog = /*#__PURE__*/ withInstall(BaseWaringDialogSfc, 'BaseWaringDialog')
export const SortTable = /*#__PURE__*/ withInstall(SortTableSfc, 'SortTable')
export const TitleTable = /*#__PURE__*/ withInstall(TitleTableSfc, 'TitleTable')
export const SearchBar = /*#__PURE__*/ withInstall(SearchBarSfc, 'SearchBar')
export const TransferDialog = /*#__PURE__*/ withInstall(TransferDialogSfc, 'TransferDialog')
export const TransferItem = /*#__PURE__*/ withInstall(TransferItemSfc, 'TransferItem')
export const FunctionHeader = /*#__PURE__*/ withInstall(FunctionHeaderSfc, 'FunctionHeader')
export const MainPanel = /*#__PURE__*/ withInstall(MainPanelSfc, 'MainPanel')
export const SearchableListPanel = /*#__PURE__*/ withInstall(SearchableListPanelSfc, 'SearchableListPanel')
export const DetailLayout = /*#__PURE__*/ withInstall(DetailLayoutSfc, 'DetailLayout')
export const FilterLayout = /*#__PURE__*/ withInstall(FilterLayoutSfc, 'FilterLayout')

// 導出組件類型
export type {
  // BaseTable 組件類型
  BaseTableProps,
  BaseTableEmits,
  BaseTableInstance,
  BaseTableSlots,
  // BaseBtn 組件類型
  BaseBtnProps,
  BaseBtnEmits,
  BaseBtnInstance,
  // BaseDialog 組件類型
  BaseDialogProps,
  BaseDialogEmits,
  BaseDialogInstance,
  // BaseWaringDialog 組件類型
  BaseWaringDialogProps,
  BaseWaringDialogEmits,
  BaseWaringDialogInstance,
  // BaseInput 組件類型
  BaseInputProps,
  BaseInputEmits,
  BaseInputInstance,
  // SortTable 組件類型
  SortTableProps,
  SortTableEmits,
  SortTableInstance,
  SortTableSlots,
  // TitleTable 組件類型
  TitleTableProps,
  TitleTableEmits,
  TitleTableInstance,
  TitleTableSlots,
  // SearchBar 組件類型
  SearchBarProps,
  SearchBarEmits,
  SearchBarInstance,
  SearchBarSlots,
  // TransferDialog 組件類型
  TransferDialogProps,
  TransferDialogEmits,
  TransferDialogInstance,
  // TransferItem 組件類型
  TransferItemProps,
  TransferItemEmits,
  TransferItemInstance,
  // MainPanel 組件類型
  MainPanelProps,
  MainPanelEmits,
  MainPanelInstance,
  // SearchableListPanel 組件類型
  SearchableListPanelProps,
  SearchableListPanelEmits,
  SearchableListPanelInstance,
  SearchableListPanelSlots,
  // FunctionHeader 組件類型
  FunctionHeaderProps,
  FunctionHeaderEmits,
  FunctionHeaderInstance,
  // DetailLayout 組件類型
  DetailLayoutProps,
  DetailLayoutEmits,
  DetailLayoutInstance,
  // FilterLayout 組件類型
  FilterLayoutProps,
  FilterLayoutEmits,
  FilterLayoutInstance,
  // 插件類型
  PluginOptions,
  VueTableComponentsPlugin
} from '../types/components'

// 重新導出組件定義類型
export type { default as BaseTableType } from './tables/BaseTable.vue'
export type { default as BaseBtnType } from './items/BaseBtn.vue'
export type { default as BaseInputType } from './form/BaseInput.vue'
export type { default as BaseSelectorType } from './form/BaseSelector.vue'
export type { default as BaseDialogType } from './items/BaseDialog.vue'
export type { default as BaseWaringDialogType } from './items/BaseWaringDialog.vue'
export type { default as SortTableType } from './tables/SortTable.vue'
export type { default as TitleTableType } from './tables/TitleTable.vue'
export type { default as SearchBarType } from './items/SearchBar.vue'
export type { default as TransferDialogType } from './transfer/TransferDialog.vue'
export type { default as TransferItemType } from './transfer/transferItem.vue'
export type { default as SearchableListPanelType } from './layout/SearchableListPanel.vue'
export type { default as FunctionHeaderType } from './layout/FunctionHeader.vue'
export type { default as MainPanelType } from './layout/MainPanel.vue'
export type { default as DetailLayoutType } from './layout/DetailLayout.vue'
export type { default as FilterLayoutType } from './layout/FilterLayout.vue'
