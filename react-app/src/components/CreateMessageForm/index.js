import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadChannel } from "../../store/channels";
import { createMessage } from "../../store/channels";

import "./CreateMessageForm.css";

const CreateMessageForm = ({
  channelId,
  chatInput,
  setChatInput,
  // sendChat,
}) => {
  const dispatch = useDispatch();

  const [errors, setErrors] = useState([]);
  // const [content, setContent] = useState("");
  const channel_id = channelId;
  const user_id = useSelector((state) => state.session?.user).id;

  const updateContent = (e) => {
    // setContent(e.target.value);
    setChatInput(e.target.value);
  };

  useEffect(() => {
    const validationErrors = [];

    if (chatInput.length === 0) validationErrors.push("");

    if (chatInput.length > 12000)
      validationErrors.push("Your message is too long.");

    setErrors(validationErrors);
  }, [chatInput]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newMessage = {
      user_id,
      channel_id,
      content: chatInput,
    };

    if (newMessage) {
      // await dispatch(createMessage(channel_id, newMessage)).then(() =>
      //   sendChat(e)
      // );
      // await sendChat(newMessage);
      // .then(() => dispatch(loadChannel(channel_id)));
      setErrors([]);
      setChatInput("");
      // setContent("");
    }
  };

  return (
    <>
      <div className="CreateMessageFormDiv">
        <form onSubmit={handleSubmit}>
          <div className="CreateMessageErrors">
            <ul>
              {errors && errors.map((error) => <li key={error}>{error}</li>)}
            </ul>
          </div>
          <input type="hidden" value={user_id} />
          <input type="hidden" value={channel_id} />
          <div className="MessageTextBoxArea">
            <textarea
              type="text"
              required
              placeholder="Message"
              value={chatInput}
              onChange={updateContent}
            />
            <button type="submit" disabled={errors.length > 0}>
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateMessageForm;
