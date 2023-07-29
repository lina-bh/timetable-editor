const Confirm = ({ energised, message, onChoose }) => {
  if (!energised) {
    return
  }

  return (
    <>
      <div className="fixed top-0 left-0 z-10 w-full h-full bg-slate-300 opacity-90"></div>
      <div className="fixed top-0 left-0 z-20 p-3">
        <div className="p-2 text-black bg-white border border-black w-fit">
          <p>{message}</p>
          <div className="flex gap-x-2">
            <button
              type="button"
              onClick={() => onChoose(true)}
              className="px-1 border border-black"
            >
              Yes
            </button>
            <button
              type="button"
              onClick={() => onChoose(false)}
              className="px-1 border border-black"
            >
              No
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Confirm
