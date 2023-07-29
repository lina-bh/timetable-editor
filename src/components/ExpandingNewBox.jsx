import { useState, useRef, useEffect } from "react"

const ExpandingNewBox = ({ onNew, children, className, iconTarget, icon }) => {
  const [enterState, setEnterState] = useState(false)
  const inputRef = useRef(null)

  const onCancel = () => {
    if (inputRef.current) {
      inputRef.current.value = ""
    }
    setEnterState(false)
  }

  const onSubmit = (ev) => {
    ev.preventDefault()
    onNew(inputRef.current.value)
    onCancel()
  }

  const onKeyDown = (ev) => {
    if (ev.keyCode === 27) {
      ev.preventDefault()
      onCancel()
    }
  }

  const onEnterEdit = () => {
    setEnterState(true)
  }

  useEffect(() => {
    if (inputRef.current && enterState) {
      inputRef.current.focus()
    }
  }, [enterState])

  return (
    <>
      {!enterState ? (
        iconTarget ? (
          <>
            {children}
            <button type="button" onClick={onEnterEdit}>
              <i className={icon ?? "bi-pencil-square"}></i>
            </button>
          </>
        ) : (
          <button type="button" onClick={onEnterEdit}>
            {children ?? <i className={icon ?? "bi-plus-square-fill"}></i>}
          </button>
        )
      ) : (
        <form
          onSubmit={onSubmit}
          className={`inline-flex outline outline-1 ${className}`}
        >
          <div>
            <input
              type="text"
              ref={inputRef}
              onKeyDown={onKeyDown}
              className="w-full"
            />
          </div>
          <button type="submit">
            <i className="bi-arrow-return-left"></i>
          </button>
          <button type="button" onClick={onCancel}>
            <i className="bi-x-square-fill"></i>
          </button>
        </form>
      )}
    </>
  )
}

export default ExpandingNewBox
