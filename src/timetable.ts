import { produce } from "immer"

import alphanumeric from "./alphanumeric.js"
import { deleteElement, update } from "./replace.js"

interface Timetable {
  readonly name: string
  readonly stops: string[]
  readonly services: string[][]
}

const createTimetable = (name: string): Timetable => {
  for (const c of name) {
    if (!alphanumeric(c)) {
      throw new Error("out of alphanumeric space")
    }
  }
  return {
    name,
    stops: [],
    services: [],
  }
}

const renameTimetable = (timetable: Timetable, name: string) => {
  return { ...timetable, name }
  /*
  return produce(timetable, (newTimetable: Timetable) => {
    newTimetable.name = name
  })
  */
}

const addStop = (timetable: Timetable, stopName: string): Timetable => {
  return { ...timetable, stops: [...timetable.stops, stopName] }
  /*
  return produce(timetable, (newTimetable) => {
    newTimetable.stops.push(stopName)
  })
  */
}

const renameStop = (
  timetable: Timetable,
  index: number,
  newName: string
): Timetable => {
  return {
    ...timetable,
    stops: update(timetable.stops, index, newName),
  }
  // return produce(timetable, (newTimetable) => {
  //   newTimetable.stops[i] = newName
  // })
}

const deleteStop = (timetable: Timetable, i: number): Timetable => {
  return { ...timetable, stops: deleteElement(timetable.stops, i) }
  // return produce(timetable, (newTimetable: Timetable) => {
  //   newTimetable.stops.splice(i, 1)
  // })
}

const insertTime = (
  timetable: Timetable,
  { timeIdx, stopIdx, time }: { timeIdx: number; stopIdx: number; time: string }
) => {
  if (time.length != 4) {
    throw new Error("invalid time")
  }
  return produce(timetable, (newTimetable: Timetable) => {
    if (newTimetable.services.length < timeIdx + 1) {
      newTimetable.services.length = timeIdx + 1
    }
    if (newTimetable.services[timeIdx] === undefined) {
      newTimetable.services[timeIdx] = Array<string>(newTimetable.stops.length)
    }
    newTimetable.services[timeIdx][stopIdx] = time
  })
}

const appendService = (timetable: Timetable) => {
  return produce(timetable, (newTimetable: Timetable) => {
    newTimetable.services.push([])
  })
}

const deleteService = (timetable: Timetable, i: number) => {
  return produce(timetable, (newTimetable: Timetable) => {
    newTimetable.services.splice(i, 1)
  })
}

const getTime = (timetable: Timetable, timeIdx: number, stopIdx: number) => {
  const service = timetable.services[timeIdx]
  if (!service) {
    return undefined
  }
  const time = service[stopIdx]
  if (time) {
    return time
  }
  return undefined
}

export {
  type Timetable,
  createTimetable,
  renameTimetable,
  addStop,
  renameStop,
  deleteStop,
  insertTime,
  appendService,
  deleteService,
  getTime,
}
