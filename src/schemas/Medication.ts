export default interface Medication {
  id: number,
  name: string,
  dosage: number,
  dosage_frequency: number,
  doses_taken_today?: number
}
