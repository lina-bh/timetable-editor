import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"
import { devtools } from "zustand/middleware"

import { createTimetable, Timetable } from "./timetable"

interface EditorStore {
  timetables: Timetable[]
  newTt: (name: string) => void
  updateTt: (tt: Timetable, index: number) => void
  updateThisTt: (timetable: Timetable) => void
  selectedTtIdx: number | null
  selectTt: (index: number) => void
  deleteTimetable: (i: number) => void
  loadTimetable: (timetable: Timetable) => void
}

const useStore = create<EditorStore>()(
  devtools(
    persist(
      immer((set) => ({
        timetables: [] as Array<Timetable>,
        newTt: (name) => {
          const newTt = createTimetable(name)
          set((state) => {
            state.timetables.push(newTt)
          })
        },
        updateTt: (tt, index) => {
          set((state) => {
            state.timetables[index] = tt
          })
        },
        updateThisTt: (timetable) => {
          set((s) => {
            if (s.selectedTtIdx === null) {
              throw new Error("no selected timetable")
            }
            s.timetables[s.selectedTtIdx] = timetable
          })
        },
        selectedTtIdx: null as number | null,
        selectTt: (i) => {
          set((state) => {
            state.selectedTtIdx = i
          })
        },
        deleteTimetable: (i) => {
          set((st) => {
            st.timetables.splice(i, 1)
            st.selectedTtIdx = null
          })
        },
        loadTimetable: (timetable) => {
          set((st) => {
            st.timetables.push(timetable)
          })
        },
      })),
      {
        name: "editor-store",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
)

const useCurrentTt = (): Timetable => {
  return useStore((st) => {
    if (st.selectedTtIdx === null) {
      throw new Error("no selected timetable")
    }
    return st.timetables[st.selectedTtIdx]
  })
}

export { useStore, useCurrentTt }
