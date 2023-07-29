import { useCurrentTt, useStore } from "../store"
import { deleteService, getTime, insertTime } from "../timetable"
import ExpandingNewBox from "./ExpandingNewBox"

const TimeTableTimes = () => {
  const timetable = useCurrentTt()
  const updateThisTt = useStore((st) => st.updateThisTt)

  const onEdit = (serviceIdx, stopIdx, time) => {
    updateThisTt(insertTime(timetable, { timeIdx: serviceIdx, stopIdx, time }))
  }

  const onDeleteService = (i) => {
    updateThisTt(deleteService(timetable, i))
  }

  return (
    <div className="table-row-group">
      {timetable.services.map((times, i) => (
        <div key={i} className="table-row">
          <div className="table-cell font-mono">
            {i}
            <button type="button" onClick={() => onDeleteService(i)}>
              <i className="bi-x-square-fill"></i>
            </button>
          </div>
          {timetable.stops.map((stop, j) => (
            <div key={`i=${i}j=${j}`} className="table-cell max-w-[5ch]">
              <ExpandingNewBox onNew={(time) => onEdit(i, j, time)}>
                {String(getTime(timetable, i, j))}
              </ExpandingNewBox>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default TimeTableTimes
