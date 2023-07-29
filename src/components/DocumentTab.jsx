import { useState } from "react"

import { useStore } from "../store"
import { renameTimetable } from "../timetable"
import ExpandingNewBox from "./ExpandingNewBox"
import Confirm from "./Confirm"

const DocumentTab = ({ timetable, i }) => {
  const [selectedTtIdx, selectTimetable, deleteTimetable, updateTt] = useStore(
    (st) => [st.selectedTtIdx, st.selectTt, st.deleteTimetable, st.updateTt]
  )

  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const onChoose = (choice) => {
    if (choice) {
      deleteTimetable(i)
    }
    setShowDeleteModal(false)
  }

  const onEdit = (name) => {
    updateTt(renameTimetable(timetable, name), i)
  }

  return (
    <div
      className={
        "inline-block border border-black border-b-[0px] px-2 " +
        (i === selectedTtIdx ? "bg-purple-500 text-white" : "")
      }
    >
      <label>
        <input
          type="radio"
          checked={i === selectedTtIdx}
          onChange={() => selectTimetable(i)}
          className={"hidden"}
        />
        <ExpandingNewBox
          onNew={onEdit}
          iconTarget={true}
          className="max-w-[14ch]"
        >
          <span className="px-1">{timetable.name}</span>
        </ExpandingNewBox>
      </label>
      <button type="button" onClick={() => setShowDeleteModal(true)}>
        <i className="bi-x-square-fill"></i>
      </button>
      <Confirm
        energised={showDeleteModal}
        onChoose={onChoose}
        message="do you really want to delete this timetable? everything about it will go."
      />
    </div>
  )
}

export default DocumentTab
