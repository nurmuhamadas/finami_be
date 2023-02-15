export type RegisterSettingType = {
  id: string
  user_id: string
  currency_id: string
  date_format:
    | 'yyyy/mm/dd'
    | 'dd/mm/yyyy'
    | 'mm/dd/yyyy'
    | 'yyyy/dd/mm'
    | 'yyyy-mm-dd'
    | 'dd-mm-yyyy'
    | 'mm-dd-yyyy'
    | 'yyyy-dd-mm'
  created_at: Date
  updated_at: Date
  deleted_at?: Date
}
