import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Redirect } from "react-router-dom";

// import { ValidationError } from '../../utils/ValidationError';
// import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { loadChannel, editMessage } from "../../store/channels";

// import './CreateReviewForm.css';

const EditMessageForm = ({ channelId, messageToEdit }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  console.log('channelId in EDitMessageForm-------', channelId)
  console.log('messageToEdit in EDitMessageForm-------', messageToEdit)

  const [errors, setErrors] = useState([]);
  const [content, setContent] = useState(messageToEdit.content);
  const channel_id = channelId;
  const user_id = useSelector((state) => state.session.user).id;
  const id = messageToEdit.id;

  const updateContent = (e) => setContent(e.target.value);

  useEffect(() => {
    const validationErrors = [];

    if (content.length > 12000)
      validationErrors.push("Your message is too long.");

    setErrors(validationErrors);
  }, [content]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('IM IN THE HANDLE SUBMIT------------')

    let editedMessage = {
      id,
      user_id,
      channel_id,
      content,
    };

    console.log('editedMessage in EditMessageForm---------', editedMessage)

    if (editedMessage) {
      await dispatch(editMessage(editedMessage)).then(() => dispatch(loadChannel(channel_id)));
      setErrors([]);
    }

    // const payload = {
    //   user_id,
    //   channel_id,
    //   content,
    // };

    // let editedMessage;

    // try {
    //   editedMessage = await dispatch(createMessage(channel_id, payload));
    // } catch (error) {
    //   // if (error instanceof ValidationError) setErrors(error.errors);
    //   // // If error is not a ValidationError, add slice at the end to remove extra
    //   // // "Error: "
    //   // else setErrors({ overall: error.toString().slice(7) })
    // }
    // if (editedMessage) {
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
          <input type="hidden" value={channelId} />
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
              Update
            </button>
            {/* <button className='btn-in-form' type="button" onClick={handleCancelClick}>Cancel</button> */}
          </div>
        </form>
      </section>
    </>
  );
};

export default EditMessageForm;
