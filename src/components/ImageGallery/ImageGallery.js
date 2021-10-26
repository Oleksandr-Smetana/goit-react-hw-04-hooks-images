import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import s from './ImageGallery.module.css';
import fetchImages from '../../apiServises/PixabayAPI';
import ImageGalleryItem from '../ImageGalleryItem/';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';

export default function ImageGallery({ imageQuery }) {
  const [imageName, setImageName] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [moreButton, setMoreButton] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalUrl, setModalUrl] = useState(null);
  const [modalAlt, setModalAlt] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!imageQuery) {
      return;
    }
    setStatus('pending');

    // фетч галереи по условиям
    fetchImages(imageQuery, page)
      .then(({ hits, total }) => {
        setStatus('resolved');

        if (!total) {
          setImages([]);
          setPage(1);
          setMoreButton(false);
          toast.error(
            `No images with query: "${imageQuery}".`,
          );
          return;
        }

        if (page === 1) {
          setImageName(imageQuery);
          setImages([...hits]);
          setMoreButton(true);
        } else {
          if (imageQuery === imageName) {
            setImages(prevImages => [
              ...prevImages,
              ...hits,
            ]);
            scrollToEndPage();
          } else {
            setPage(1);
            setImages([...hits]);
          }
          if (hits.length < 12) {
            setMoreButton(false);
            toast.success(
              `All images with query "${imageQuery}" were downloaded.`,
            );
            return;
          }
        }
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
        setMoreButton(false);
      });
  }, [imageQuery, imageName, page]);

  // перемещение viewport вниз галереи
  const scrollToEndPage = () => {
    return window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  // увеличение значения page на 1 при клике на кнопку Load More
  const incrementPageNumber = () => {
    setPage(page => page + 1);
  };

  // закрытие модального окна
  const closeModal = () => {
    setShowModal(false);
    setModalAlt(null);
    setModalUrl(null);
  };

  // открытие модального окна
  const openModal = e => {
    setShowModal(true);
    setModalAlt(e.target.alt);
    setModalUrl(e.target.dataset.source);
  };

  if (status === 'idle') {
    return (
      <h2 className={s.message}>
        What are we looking for?
      </h2>
    );
  }

  if (status === 'pending') {
    return <Loader />;
  }

  if (status === 'rejected') {
    return <h2 className={s.message}>{error.message}</h2>;
  }

  if (status === 'resolved') {
    return (
      <>
        <ul className={s.ImageGallery}>
          {images.map(image => (
            <ImageGalleryItem
              key={image.id}
              tags={image.tags}
              smallImage={image.webformatURL}
              largeImage={image.largeImageURL}
              openModal={openModal}
            />
          ))}
        </ul>
        {moreButton && (
          <Button onClick={incrementPageNumber} />
        )}
        {showModal && (
          <Modal
            closeModal={closeModal}
            url={modalUrl}
            alt={modalAlt}
          />
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  imageQuery: PropTypes.string.isRequired,
};
