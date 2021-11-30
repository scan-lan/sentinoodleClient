export default interface AlertState {
  text: string,
  type: "error" | "success"
  open: boolean
}
