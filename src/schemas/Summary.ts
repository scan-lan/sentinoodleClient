export default interface Summary {
  last_room_entered: {
    room: string,
    time: string
  },
  time_woke_up: string,
  messages_received_today: string[],
  last_ate: string
}
