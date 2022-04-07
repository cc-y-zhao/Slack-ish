import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactDOM from "react-dom";

import { hideSearchModal } from "../../store/modal";

import "./Modal.css";

export const SearchModal = () => {
  const dispatch = useDispatch();

  const mount = useSelector((state) => state.modals.searchModalMount);
  const display = useSelector((state) => state.modals.searchDisplay);
  const Current = useSelector((state) => state.modals.currentSearchModal);

  const closeModal = () => {
    dispatch(hideSearchModal());
  };

  return (
    display &&
    mount &&
    ReactDOM.createPortal(
      <div className="modal-background" onClick={closeModal}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <Current />
        </div>
      </div>,
      mount
    )
  );
};

export default SearchModal;
