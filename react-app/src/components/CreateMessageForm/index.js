import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Redirect } from "react-router-dom";

// import { ValidationError } from '../../utils/ValidationError';
// import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { loadChannel } from "../../store/channels";
import { createMessage } from "../../store/channels";

// import './CreateReviewForm.css';

const CreateMessageForm = ({ channelId }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [errors, setErrors] = useState([]);
  const [content, setContent] = useState("");
  const channel_id = channelId;
  const user_id = useSelector((state) => state.session.user).id;

  const updateContent = (e) => setContent(e.target.value);

  useEffect(() => {
    const validationErrors = [];

    if (content.length > 12000)
      validationErrors.push("Your message is too long.");

    setErrors(validationErrors);
  }, [content]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newMessage = {
      user_id,
      channel_id,
      content,
    };

    if (newMessage) {
      await dispatch(createMessage(channel_id, newMessage)).then(() =>
        dispatch(loadChannel(channel_id))
      );
      setErrors([]);
    }
  };

  return (
    <div className="chat__input">
      <div className="chat_iconsTop">
        <i class="fa-solid fa-bold"></i>
        <i class="fa-solid fa-italic"></i>
        <i class="fa-solid fa-strikethrough"></i>
        <i class="fa-solid fa-link"></i>
        <i class="fa-solid fa-list"></i>
        <i class="fa-solid fa-list-ol"></i>
        <i class="fa-solid fa-bars"></i>
        <i class="fa-solid fa-code"></i>
        <i class="fa-solid fa-laptop-code"></i>
      </div>
      <div className="create_message_form">
        <form onSubmit={handleSubmit}>
          <div>
            <div>{errors}</div>
          </div>
          <input type="hidden" value={user_id} />
          <input type="hidden" value={channel_id} />
          <div>
            <textarea
              type="text"
              required
              placeholder="Message"
              value={content}
              onChange={updateContent}
            />
          </div>
          <div>
            <button type="submit" disabled={errors.length > 0}>
              <i class="fa-solid fa-paper-plane"></i>
            </button>
          </div>
        </form>
      </div>
      <div className="chat_iconsBottom">
        <i class="fa-solid fa-circle-plus"></i>
        <i class="fa-solid fa-video"></i>
        <i class="fa-solid fa-microphone-lines"></i>
        <i class="fa-solid fa-face-smile"></i>
        <i class="fa-solid fa-at"></i>
      </div>
    </div>
  );
};

export default CreateMessageForm;
