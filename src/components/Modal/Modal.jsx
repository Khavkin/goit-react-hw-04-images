import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { ModalWrap, Overlay } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ pictureURL, closeModal }) => {
  useEffect(() => {
    const handlerOnKeyDown = ({ code }) => {
      if (code === 'Escape') closeModal();
    };
    const handlerOnClick = ({ target }) => {
      if (target.nodeName === 'DIV') closeModal();
    };

    window.addEventListener('keydown', handlerOnKeyDown);
    window.addEventListener('click', handlerOnClick);
    return () => {
      window.removeEventListener('keydown', handlerOnKeyDown);
      window.removeEventListener('click', handlerOnClick);
    };
  }, [closeModal]);

  return createPortal(
    <Overlay>
      <ModalWrap>
        <img src={pictureURL} alt="" />
      </ModalWrap>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  pictureURL: PropTypes.string.isRequired,
};

export default Modal;
