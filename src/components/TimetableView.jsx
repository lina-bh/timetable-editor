import TimeTableHeader from "./TimeTableHeader"
import TimeTableTimes from "./TimeTableTimes"
import ExpandingNewBox from "./ExpandingNewBox"
import { useCurrentTt, useStore } from "../store"
import { addStop, appendService } from "../timetable"
import { ConfirmProvider } from "./ConfirmCtx"

const TimetableView = () => {
  const timetable = useCurrentTt()
  const updateThisTt = useStore((st) => st.updateThisTt)

  const onAddService = () => {
    updateThisTt(appendService(timetable))
  }

  const onExport = () => {
    const exported = JSON.stringify(timetable)
    const anchor = document.createElement("a")
    anchor.href = URL.createObjectURL(
      new Blob([exported], { type: "text/json" })
    )
    anchor.download = timetable.name + ".json"
    anchor.click()
  }

  return (
    <>
      <ConfirmProvider message="really delete? this will delete all times for this stop as well.">
        <div className="border-r border-black timetable-table">
          <TimeTableHeader />
          <TimeTableTimes />
        </div>
      </ConfirmProvider>
      <div className="flex gap-x-1">
        <ExpandingNewBox
          onNew={(name) => updateThisTt(addStop(timetable, name))}
        >
          <span className="text-blue-600">
            <i className="bi-pin-map-fill"></i> add stop
          </span>
        </ExpandingNewBox>
        <button type="button" onClick={onAddService} className="text-blue-600">
          <i className="bi-clock"></i> add service
        </button>
        <button type="button" onClick={onExport} className="text-blue-600">
          <i className="bi-download"></i> export to JSON
        </button>
      </div>
    </>
  )
}

export default TimetableView
