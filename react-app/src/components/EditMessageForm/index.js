import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideModal } from "../../store/modal";

import { loadChannel, editMessage, deleteMessage } from "../../store/channels";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import "./EditMessageForm.css";

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

  // const updateContent = (e) => setContent(e.target.value);
  const updateContent = (e, editor) => {
    const richText = editor.getData();
    setContent(richText);
  };

  useEffect(() => {
    const validationErrors = [];

    if (content?.length === 0) validationErrors.push("");
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
    <div className="EditMessageFormWrapper">
      <div className="EditMessageFormHeader">
        <h1>Edit Message</h1>
      </div>
      <div className="EditMessageFormBody">
        <form onSubmit={handleSubmit}>
          <div className="EditMessageFormErrors">{errors}</div>
          <input type="hidden" value={user_id} />
          <input type="hidden" value={channel_id} />
          {/* <textarea
            type="text"
            required
            placeholder="Message"
            value={content}
            onChange={updateContent}
          /> */}
          <CKEditor
            id="EditMessage"
            editor={ClassicEditor}
            onChange={updateContent}
            data={content}
            config={{
              toolbar: [
                // "heading",
                // "|",
                "bold",
                "italic",
                "|",
                "link",
                "|",
                "bulletedList",
                "numberedList",
                "|",
                "indent",
                "outdent",
                // "|",
                // "blockQuote",
                // "insertTable",
                // "undo",
                // "redo",
              ],
            }}
          />
          <div className="EditMessageButtonContainer">
            <div className="UpdateMessageButton">
              <button type="submit" disabled={errors.length > 0}>
                Update
              </button>
            </div>
            <div className="DeleteMessageButton">
              <button
                onClick={async (e) => {
                  e.preventDefault();
                  if (
                    window.confirm(
                      "Are you sure you want to delete this message?"
                    )
                  ) {
                    await dispatch(deleteMessage(channel_id, id))
                      .then(() => dispatch(hideModal()))
                      .then(() => dispatch(loadChannel(channel_id)));
                  }
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMessageForm;
