export class NullTtError extends Error {
  constructor(
    message: string = "cannot access timetable when none was selected"
  ) {
    super(message)
    this.name = "NullTtError"
  }
}
