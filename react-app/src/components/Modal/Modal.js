import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactDOM from 'react-dom';

import {hideModal} from '../../store/modal';

import './Modal.css';

export const Modal = () => {

  const dispatch = useDispatch();

  const mount = useSelector(state => state.modals.modalMount);
  const display = useSelector(state => state.modals.display);
  const Current = useSelector(state => state.modals.currentModal);
  const AddMembersToChannel = useSelector(state => state.modals.currentAddMembersToChannelModal);

  const closeModal = () => {
    dispatch(hideModal());
  }

  return display && mount && ReactDOM.createPortal(
    <div className='modal-background' onClick={closeModal}>
      <div className='modal-content' onClick={(e) => e.stopPropagation()}>
        <Current />
        <AddMembersToChannel />
      </div>
    </div>
    , mount)

}

export default Modal;
