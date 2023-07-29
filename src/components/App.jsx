import { useEffect, useRef } from "react"

import TimetableView from "./TimetableView"
import DocumentTab from "./DocumentTab"
import { useStore } from "../store"
import ExpandingNewBox from "./ExpandingNewBox"

const App = () => {
  const [timetables, selectTt, selectedTtIdx, newTt, loadTimetable] = useStore(
    (st) => [
      st.timetables,
      st.selectTt,
      st.selectedTtIdx,
      st.newTt,
      st.loadTimetable,
    ]
  )

  const inputFileRef = useRef(null)

  const onLoadFile = async () => {
    if (!inputFileRef.current) {
      return
    }
    const inputFileEl = inputFileRef.current
    if (inputFileEl.files.length == 0) {
      return
    }
    try {
      const imported = JSON.parse(await inputFileRef.current.files[0].text())
      loadTimetable(imported)
    } catch (e) {
      console.error("invalid file")
    }
    inputFileEl.value = ""
  }

  useEffect(() => {
    if (timetables.length !== 0 && selectedTtIdx === null) {
      selectTt(0)
    }
  }, [timetables, selectTt, selectedTtIdx])

  return (
    <>
      <div className="flex flex-wrap gap-4 px-4 pt-1">
        <label className="inline-block cursor-pointer">
          <input
            ref={inputFileRef}
            type="file"
            accept="text/json,.json"
            onChange={onLoadFile}
            className="sr-only"
          />
          <i className="bi-folder2"></i> open
        </label>
        <ExpandingNewBox
          onNew={(name) => newTt(name)}
          className={"w-full"}
          iconTarget={false}
        >
          <i className="bi-plus-square-fill"></i> new
        </ExpandingNewBox>
      </div>

      <div className="flex flex-wrap px-1 pt-1 border-b border-black gap-x-1">
        {timetables.map((tt, i) => (
          <DocumentTab timetable={tt} i={i} key={i} />
        ))}
      </div>
      {selectedTtIdx != null ? <TimetableView /> : null}
    </>
  )
}

export default App
