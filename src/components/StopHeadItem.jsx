import { useContext } from "react"

import { useCurrentTt, useStore } from "../store"
import { deleteStop, renameStop } from "../timetable"
import { ConfirmCtx } from "./ConfirmCtx"
import ExpandingNewBox from "./ExpandingNewBox"

const StopHeadItem = ({ idx, children }) => {
  const timetable = useCurrentTt()
  const updateThisTt = useStore((st) => st.updateThisTt)

  const confirmCtx = useContext(ConfirmCtx)

  const onSubmit = (name) => {
    updateThisTt(renameStop(timetable, idx, name))
  }

  const onDelete = (choice) => {
    if (choice) updateThisTt(deleteStop(timetable, idx))
    confirmCtx.closeModal()
  }

  return (
    <div className="table-cell px-[1ch]">
      <>
        <ExpandingNewBox onNew={onSubmit}>
          {children}
          <i className="bi-pencil-square"></i>
        </ExpandingNewBox>
        <button
          type="button"
          onClick={() => confirmCtx.openModal({ onChoose: onDelete })}
        >
          <i className="bi-x-square-fill"></i>
        </button>
      </>
    </div>
  )
}

export default StopHeadItem
