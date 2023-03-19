import PropTypes from 'prop-types';
import { ErrorMessage, InfoMessage } from './Message.styled';

const Message = ({ message, messageType }) => {
  if (messageType === 'error') return <ErrorMessage>{message}</ErrorMessage>;
  if (messageType === 'info') return <InfoMessage>{message}</InfoMessage>;
};

Message.propTypes = {
  message: PropTypes.string.isRequired,
  messageType: PropTypes.string.isRequired,
};

export default Message;
