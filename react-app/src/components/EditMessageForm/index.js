import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideModal } from "../../store/modal";

import { loadChannel, editMessage, deleteMessage } from "../../store/channels";

const EditMessageForm = () => {
  const dispatch = useDispatch();

  const [errors, setErrors] = useState([]);
  const channel_id = useSelector((state) => state.modals.id);
  const user_id = useSelector((state) => state.session.user).id;
  const id = useSelector((state) => state.modals.messageId);

  useEffect(() => {
    dispatch(loadChannel(channel_id));
  }, [dispatch, channel_id]);

  const messageToEdit = useSelector(
    (state) => state.channels[channel_id].messages[id]
  );
  const [content, setContent] = useState(messageToEdit?.content);

  const updateContent = (e) => setContent(e.target.value);

  useEffect(() => {
    const validationErrors = [];

    if (content?.length > 12000)
      validationErrors.push("Your message is too long.");

    setErrors(validationErrors);
  }, [content]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let editedMessage = {
      id,
      user_id,
      channel_id,
      content,
    };

    if (editedMessage) {
      await dispatch(editMessage(editedMessage)).then(() =>
        dispatch(loadChannel(channel_id))
      );
      setErrors([]);
      dispatch(hideModal());
    }
  };

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
              Update
            </button>
            <button
              onClick={async () => {
                await dispatch(deleteMessage(channel_id, id)).then(() =>
                  dispatch(loadChannel(channel_id))
                );
              }}
            >
              Delete
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default EditMessageForm;
