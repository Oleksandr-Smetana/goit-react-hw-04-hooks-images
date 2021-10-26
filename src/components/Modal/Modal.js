import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ closeModal, url, alt }) {
  useEffect(() => {
    // закрытие модалки при нажатии на Esc
    const closeModalOnEsc = e => {
      if (e.code === 'Escape') {
        closeModal();
      }
    };

    // добавление слушателя на Esc
    window.addEventListener('keydown', closeModalOnEsc);

    // снятие слушателя с Esc
    return () => {
      window.removeEventListener(
        'keydown',
        closeModalOnEsc,
      );
    };
  }, [closeModal]);

  // закрытие модалки при клике на backdrop
  const closeModalOnBackdropClick = e => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return createPortal(
    <div
      className={s.Overlay}
      onClick={closeModalOnBackdropClick}
    >
      <div className={s.Modal}>
        <img src={url} alt={alt} />
      </div>
    </div>,
    modalRoot,
  );
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
