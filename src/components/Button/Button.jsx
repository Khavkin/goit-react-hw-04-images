import { Button } from './Button.styled';
import PropTypes from 'prop-types';
import { forwardRef } from 'react';

const TextButton = forwardRef(({ caption, disabled, onClick }, ref) => {
  return (
    <Button ref={ref} type="button" onClick={onClick} disabled={disabled}>
      {caption}
    </Button>
  );
});

TextButton.propTypes = {
  caption: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default TextButton;
