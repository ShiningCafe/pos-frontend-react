import React from "react";
import { Toast } from "flowbite-react";
import { HiCheck, HiX, HiExclamation } from "react-icons/hi";
import { useState } from "react";
import { getNotify, cancelNotify } from "./notifySlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const ToastPop = () => {
  const dispatch = useDispatch();
  const notify = useSelector(getNotify);
  //
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [show, setShow] = useState(false);
  //

  function open() {
    setShow(true);
    setTimeout(() => setShow(false), 3000);
  }

  useEffect(() => {
    if (notify.active) {
      open();
      setMessage(notify.message);
      switch (notify.type) {
        case "success":
          setType(
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
              <HiCheck className="h-5 w-5" />
            </div>
          );
          break;
        case "danger":
          setType(
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
              <HiX className="h-5 w-5" />
            </div>
          );
          break;
        case "warning": 
          setType(
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200">
              <HiExclamation className="h-5 w-5" />
            </div>
          );
          break;
      }
      dispatch(cancelNotify());
    }
  }, [notify]);

  return (
    <div className="fixed bottom-0 right-0 mx-4 mb-6 z-50" style={{'minWidth': '240px'}}>
      {show ? (
        <Toast>
          {type}
          <div className="ml-3 text-sm font-normal">{message}</div>
        </Toast>
      ) : (
        ""
      )}
    </div>
  );
};

// ToastPop.propTypes = {}

export default ToastPop;
