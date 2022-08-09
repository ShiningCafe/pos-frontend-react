import React, {
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import { Modal} from "flowbite-react";

const SpecCommonModal = forwardRef((props, ref) => {
  const [show, setShow] = useState(false)
  useImperativeHandle(ref, () => ({
    open () {
      setShow(true)
    }
  }))

  function close () {
    setShow(false)
  }

  return (
    <React.Fragment>
      <Modal show={show} onClose={close}></Modal>
    </React.Fragment>
  )
})

SpecCommonModal.displayName = 'SpecCommonModal'

export default SpecCommonModal