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
      await dispatch(createMessage(channel_id, newMessage)).then(() => dispatch(loadChannel(channel_id)));
      setErrors([]);
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

  // const handleCancelClick = (e) => {
  //   e.preventDefault();
  //   setErrors([]);
  //   setShowModal(false);
  // };

  return (
    <>
      <section>
        <form onSubmit={handleSubmit}>
          <div>
            <div>{errors}</div>
          </div>
          <input type="hidden" value={user_id} />
          <input type="hidden" value={channel_id} />
          <div>
            <label>Message</label>
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
              Send
            </button>
            {/* <button className='btn-in-form' type="button" onClick={handleCancelClick}>Cancel</button> */}
          </div>
        </form>
      </section>
    </>
  );
};

export default CreateMessageForm;
