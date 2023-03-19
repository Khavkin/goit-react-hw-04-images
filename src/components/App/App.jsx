import { GetPictures } from 'api/pixabay-api';
import TextButton from 'components/Button/Button';
import ImageGallery from 'components/ImageGallery';
import Loader from 'components/Loader';
import Modal from 'components/Modal';
import SearchBar from 'components/SearchBar';

import { Component } from 'react';
import { flushSync } from 'react-dom';
import { MainContainer } from './App.styled';
const appStatus = {
  IDLE: 0,
  PENDING: 1,
  RESOLVED: 2,
  REJECTED: 4,
};

class App extends Component {
  state = {
    pictures: [],
    searchQuery: '',
    page: 1,
    // isLoading: false,
    status: appStatus.IDLE,
    error: null,
    largeImageURL: '',
    totalHits: 0,
  };

  componentDidUpdate(_, prevState) {
    const { searchQuery, page } = this.state;
    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.setState({ status: appStatus.PENDING });

      GetPictures({ searchQuery, page })
        .then(result => {
          flushSync(() => {
            this.setState(oldState => {
              return {
                pictures:
                  page === 1
                    ? [...result.data]
                    : [...oldState.pictures, ...result.data],
                status: appStatus.RESOLVED,
              };
            });
          });

          window.scrollTo({
            top: window.scrollY + 260 * 3 + 16 * 3,
            behavior: 'smooth',
          });

          if (prevState.totalHits !== result.totalHits)
            this.setState({ totalHits: result.totalHits });
        })
        .catch(error => {
          this.setState({ error, status: appStatus.REJECTED });
        });
    }
  }

  handleOnSubmit = searchQuery => {
    if (this.state.searchQuery !== searchQuery)
      this.setState({ searchQuery, page: 1, pictures: [] });
  };

  handleOnLoadMoreClick = () => {
    this.setState(oldState => ({ page: oldState.page + 1 }));
  };

  handleOnPictureClick = largeImageURL => {
    this.setState({ showModal: true, largeImageURL });
  };

  closeModal = () => {
    this.setState({ showModal: false, largeImageURL: '' });
  };

  render() {
    const { largeImageURL, pictures, status, showModal, totalHits } =
      this.state;
    return (
      <MainContainer className="App">
        <SearchBar onSubmit={this.handleOnSubmit}></SearchBar>
        {pictures.length !== 0 && (
          <ImageGallery
            pictures={pictures}
            onPictureClick={this.handleOnPictureClick}
          ></ImageGallery>
        )}

        {status === appStatus.PENDING && <Loader></Loader>}
        {pictures.length !== 0 && status !== appStatus.PENDING && (
          <TextButton
            caption={
              pictures.length < totalHits ? 'Load more' : 'No more images'
            }
            disabled={pictures.length >= totalHits}
            onClick={this.handleOnLoadMoreClick}
          ></TextButton>
        )}
        {showModal && (
          <Modal
            pictureURL={largeImageURL}
            closeModal={this.closeModal}
          ></Modal>
        )}
      </MainContainer>
    );
  }
}

export default App;
