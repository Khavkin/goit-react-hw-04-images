import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { ModalWrap, Overlay } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    pictureURL: PropTypes.string.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handlerOnKeyDown);
    window.addEventListener('click', this.handlerOnClick);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handlerOnKeyDown);
    window.removeEventListener('click', this.handlerOnClick);
  }
  handlerOnKeyDown = ({ code }) => {
    if (code === 'Escape') this.props.closeModal();
  };
  handlerOnClick = ({ target }) => {
    if (target.nodeName === 'DIV') this.props.closeModal();
  };

  render() {
    return createPortal(
      <Overlay>
        <ModalWrap>
          <img src={this.props.pictureURL} alt="" />
        </ModalWrap>
      </Overlay>,
      modalRoot
    );
  }
}

export default Modal;
