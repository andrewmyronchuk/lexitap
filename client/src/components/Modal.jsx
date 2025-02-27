import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline'

const Modal = ({ children, closeModalHandler }) => {
  return (
    <div className="modal-background">
      <div className="modal-container">
        <button className="btn-close-modal" onClick={closeModalHandler}>
          <XMarkIcon className="size-6 text-blue-500" />
        </button>
        {children}
      </div>
    </div>
  )
};

export default Modal;