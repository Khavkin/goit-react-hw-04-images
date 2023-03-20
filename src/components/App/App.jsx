import { GetPictures } from 'api/pixabay-api';
import TextButton from 'components/Button/Button';
import ImageGallery from 'components/ImageGallery';
import Loader from 'components/Loader';
import Message from 'components/Message';
import Modal from 'components/Modal';
import SearchBar from 'components/SearchBar';

import { useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import { MainContainer } from './App.styled';
const appStatus = {
  IDLE: 0,
  PENDING: 1,
  RESOLVED: 2,
  REJECTED: 4,
};

const App = () => {
  const [pictures, setPictures] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(appStatus.IDLE);
  const [error, setError] = useState(null);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [totalHits, setTotalHits] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (searchQuery === '') return;
    setStatus(appStatus.PENDING);

    GetPictures({ searchQuery, page })
      .then(result => {
        flushSync(() => {
          setPictures(oldPictures => {
            return page === 1
              ? [...result.data]
              : [...oldPictures, ...result.data];
          });
          setStatus(appStatus.RESOLVED);
        });

        window.scrollTo({
          top: window.scrollY + 260 * 3 + 16 * 3,
          behavior: 'smooth',
        });

        if (totalHits !== result.totalHits) setTotalHits(result.totalHits);
      })
      .catch(error => {
        setError(error);
        setStatus(appStatus.REJECTED);
      });
  }, [searchQuery, page, totalHits]);

  const handleOnSubmit = newSearchQuery => {
    if (searchQuery !== newSearchQuery) {
      setSearchQuery(newSearchQuery);
      setPage(1);
      setPictures([]);
    }
  };

  const handleOnLoadMoreClick = () => {
    setPage(oldPage => oldPage + 1);
  };

  const handleOnPictureClick = newLargeImageURL => {
    setShowModal(true);
    setLargeImageURL(newLargeImageURL);
  };

  const closeModal = () => {
    setShowModal(false);
    setLargeImageURL('');
  };

  return (
    <MainContainer className="App">
      <SearchBar onSubmit={handleOnSubmit}></SearchBar>
      {pictures.length !== 0 && (
        <ImageGallery
          pictures={pictures}
          onPictureClick={handleOnPictureClick}
        ></ImageGallery>
      )}

      {status === appStatus.PENDING && <Loader></Loader>}
      {error && <Message message={error.message} messageType="error"></Message>}
      {pictures.length === 0 && status === appStatus.RESOLVED && (
        <Message message="Images not found" messageType="info"></Message>
      )}
      {pictures.length !== 0 && status !== appStatus.PENDING && (
        <TextButton
          caption={pictures.length < totalHits ? 'Load more' : 'No more images'}
          disabled={pictures.length >= totalHits}
          onClick={handleOnLoadMoreClick}
        ></TextButton>
      )}

      {showModal && (
        <Modal pictureURL={largeImageURL} closeModal={closeModal}></Modal>
      )}
    </MainContainer>
  );
};

export default App;
