import {
  ImageGalleryItemImage,
  ImageGalleryListItem,
} from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ picture, onPictureClick }) => {
  return (
    <ImageGalleryListItem ImageGalleryItem onClick={onPictureClick}>
      <ImageGalleryItemImage
        className="ImageGalleryItem-image"
        src={picture.webformatURL}
        alt=""
      />
    </ImageGalleryListItem>
  );
};

ImageGalleryItem.propTypes = {
  picture: PropTypes.shape({ webformatURL: PropTypes.string.isRequired }),
  onPictureClick: PropTypes.func.isRequired,
};
export default ImageGalleryItem;
