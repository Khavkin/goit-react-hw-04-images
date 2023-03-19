import { Button } from './Button.styled';
import PropTypes from 'prop-types';

const TextButton = ({ caption, disabled, onClick }) => {
  return (
    <Button type="button" onClick={onClick} disabled={disabled}>
      {caption}
    </Button>
  );
};

TextButton.propTypes = {
  caption: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default TextButton;
