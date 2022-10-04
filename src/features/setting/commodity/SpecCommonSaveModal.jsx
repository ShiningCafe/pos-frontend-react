import React, {
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import { Modal, TextInput, Button } from "flowbite-react";
import { useEffect } from "react";
import { HiX } from 'react-icons/hi'
import propTypes from "prop-types";
import { useDispatch } from "react-redux";
import { activeNotify } from '../../../layouts/notifySlice'

const SpecCommonSaveModal = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false)
  const [name, setName] = useState('')
  const [existData, setExistData] = useState([])
  const [data, setData] = useState([])

  useEffect(() => {
    const d = JSON.parse(localStorage.getItem('specCommon'))
    if (d) setExistData(d)
  }, [])

  useImperativeHandle(ref, () => ({
    open (val) {
      setData(val)
      setShow(true)
    }
  }))

  function close () {
    setShow(false)
  }

  function submit (e) {
    e.preventDefault();
    let newData = []
    if (existData) newData = existData
    newData.push({ name: name, spec: data })
    localStorage.setItem('specCommon', JSON.stringify(newData))
    dispatch(activeNotify({ type: 'success', message: '資料已儲存'}))
    close()
  }

  function loadSpec (idx) {
    const target = existData[idx].spec
    props.select(target)
    close()
  }
  
  function deleteSpec (idx) {
    const data = [...existData]
    data.splice(idx, 1)
    setExistData(data)
    localStorage.setItem('specCommon', JSON.stringify(data))
  }

  return (
    <React.Fragment>
      <Modal show={show} onClose={close} size="md">
        <Modal.Header>
          常用組合
        </Modal.Header>
        <Modal.Body>
          {existData.map((e, idx) => {
            return (
              <div className="flex flex-row mb-2 py-2 border-b" key={`list_${idx}`}>
                <div className="basis-4/5" onClick={() => loadSpec(idx)}>
                  <span className="text-lg font-medium">{e?.name ? e.name : ''}</span>
                </div>
                <div className="basis-1/5 text-right">
                  <div className="inline-flex gap-1">
                    <Button color="light" size="xs" onClick={() => deleteSpec(idx)}><HiX className="w-4 h-4"/></Button>
                  </div>
                </div>
              </div>
            )
          })}
          <form onSubmit={submit} className="mt-4">
            <div>
              <div className="my-2 block">
                <span>儲存 - 常用組合名稱</span>
              </div>
              <TextInput required={true} onChange={e => setName(e.target.value)}/>
            </div>
            <div className="w-full mt-4 text-center">
              <div className="inline-flex">
                <Button type="submit">儲存</Button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  )
})

SpecCommonSaveModal.propTypes = {
  select: propTypes.func
}
SpecCommonSaveModal.displayName = 'SpecCommonSaveModal'

export default SpecCommonSaveModal