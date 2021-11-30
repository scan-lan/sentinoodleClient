export default interface Session {
  id: number,
  device_id: string,
  medication_id: number,
  datetime_started: string,
  message_index?: number,
  message_wait_period_minutes?: number
}
