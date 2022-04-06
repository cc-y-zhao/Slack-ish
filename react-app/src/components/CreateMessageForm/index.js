import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Redirect } from "react-router-dom";

// import { ValidationError } from '../../utils/ValidationError';
// import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { loadChannel } from "../../store/channels";
import { createMessage } from "../../store/channels";

import { hideModal, setCurrentModal } from "../../store/modal";

import "./CreateMessageForm.css";

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
      setContent("");
    }

    // const payload = {
    //   user_id,
    //   channel_id,
    //   content,
    // };

    // let newMessage;

    // try {
    //   newMessage = await dispatch(createMessage(channel_id, payload));
    // } catch (error) {
    //   // if (error instanceof ValidationError) setErrors(error.errors);
    //   // // If error is not a ValidationError, add slice at the end to remove extra
    //   // // "Error: "
    //   // else setErrors({ overall: error.toString().slice(7) })
    // }
    // if (newMessage) {
    //   setErrors([]);
    //   // dispatch(getReviewsByCar(carId));
    //   // setShowModal(false);
    //   // return history.push(`/cars/${carId}`);
    // }
  };

  return (
    <>
      <div className="CreateMessageFormDiv">
        <form onSubmit={handleSubmit}>
          <div className="CreateMessageErrors">{errors}</div>
          <input type="hidden" value={user_id} />
          <input type="hidden" value={channel_id} />
          <div className="MessageTextBoxArea">
            <textarea
              type="text"
              required
              placeholder="Message"
              value={content}
              onChange={updateContent}
            />
            <button type="submit" disabled={errors.length > 0}>
              Send
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateMessageForm;
