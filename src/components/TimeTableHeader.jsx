import ExpandingNewBox from "./ExpandingNewBox"
import StopHeadItem from "./StopHeadItem"
import { useCurrentTt, useStore } from "../store"
import { addStop } from "../timetable"

const TimeTableHeader = () => {
  const timetable = useCurrentTt()
  const updateThisTt = useStore((st) => st.updateThisTt)

  const stops = timetable.stops

  return (
    <div className="table-header-group">
      <div className="table-row">
        <div className="invisible table-cell"></div>
        {stops.length != 0 ? (
          stops.map((stop, i) => (
            <StopHeadItem key={i} idx={i}>
              {stop}
            </StopHeadItem>
          ))
        ) : (
          <div className="table-cell">no stops yet</div>
        )}
      </div>
    </div>
  )
}

export default TimeTableHeader
