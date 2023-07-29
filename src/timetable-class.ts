import { immerable } from "immer"

import alphanumeric from "./alphanumeric.js"

export default class Timetable {
  [immerable] = true

  name: string
  #stops: string[]
  #services: string[][]

  constructor(name: string) {
    for (const c of name) {
      if (!alphanumeric(c)) {
        throw new Error("invalid name")
      }
    }
    this.name = name
    this.#stops = []
    this.#services = []
  }

  addStop(name: string) {
    this.#stops.push(name)
  }

  renameStop(i: number, name: string) {
    this.#stops[i] = name
  }

  deleteStop(i: number) {
    this.#stops.splice(i, 1)
    for (const service of this.#services) {
      service.splice(i, 1)
    }
  }

  insertService({
    serviceIndex,
    stopIndex,
    time,
  }: {
    serviceIndex: number
    stopIndex: number
    time: string
  }) {
    if (time.length != 4) {
      throw new Error("invalid time")
    }
    if (this.#services.length < serviceIndex + 1) {
      this.#services.length = serviceIndex + 1
    }
    if (this.#services[serviceIndex] === undefined) {
      this.#services[serviceIndex] = Array<string>(this.#stops.length)
    }
    this.#services[serviceIndex][stopIndex] = time
  }

  deleteService(serviceIndex: number) {
    this.#services.splice(serviceIndex, 1)
  }

  getTime(serviceIndex: number, stopIndex: number) {
    const service = this.#services[serviceIndex]
    if (!service) {
      return undefined
    }
    const time = service[stopIndex]
    if (time) {
      return time
    }
    return undefined
  }

  mapStops(f: (item: string, i: number) => unknown) {
    return this.#stops.map(f)
  }

  mapServices(f: (item: string[], i: number) => unknown) {
    return this.#services.map(f)
  }

  toJSON() {
    return { name: this.name, stops: this.#stops, services: this.#services }
  }
}
