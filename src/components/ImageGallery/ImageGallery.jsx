import ImageGalleryItem from 'components/ImageGalleryItem';
import PropTypes from 'prop-types';
import { Imagegallery } from './ImageGallery.styled';

const ImageGallery = ({ pictures, onPictureClick }) => {
  return (
    <Imagegallery>
      {pictures.map(picture => (
        <ImageGalleryItem
          key={picture.id}
          picture={picture}
          onPictureClick={() => onPictureClick(picture.largeImageURL)}
        ></ImageGalleryItem>
      ))}
    </Imagegallery>
  );
};

ImageGallery.propTypes = {
  pictures: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
  onPictureClick: PropTypes.func.isRequired,
};

export default ImageGallery;
