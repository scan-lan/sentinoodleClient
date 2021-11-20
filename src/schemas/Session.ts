export default interface Session {
  id: number,
  device_id: string,
  datetime_started: Date,
  medication_name?: string,
  medication_dosage?: string,
  dosage_frequency?: number,
  message_index?: number,
  message_wait_period_minutes?: number,
  doses_taken_today?: number,
}
