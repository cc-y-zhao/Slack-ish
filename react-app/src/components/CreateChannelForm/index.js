import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { hideModal } from "../../store/modal";

import { createChannel, loadChannel } from "../../store/channels";

import "./CreateChannelForm.css";

const CreateChannelForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [errors, setErrors] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const owner_id = useSelector((state) => state.session.user).id;
  const is_dm = false;

  const updateTitle = (e) => setTitle(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);

  useEffect(() => {
    const validationErrors = [];
    if (title.length === 0) validationErrors.push("");
    if (title.length > 50)
      validationErrors.push("Title must be 50 characters or less");
    if (description.length > 150)
      validationErrors.push("Description must be 150 characters or less");

    setErrors(validationErrors);
  }, [title, description]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      owner_id,
      title,
      is_dm,
      description,
    };

    let newChannel;

    newChannel = await dispatch(createChannel(payload));

    if (newChannel) {
      setErrors([]);
      await dispatch(loadChannel(newChannel.id));
      await dispatch(hideModal());
      history.push(`/channels/${newChannel.id}`);
    }
  };

  return (
    <div className="CreateChannelFormWrapper">
      <div className="CreateChannelFormHeader">
        <h1>Create Channel</h1>
      </div>
      <div className="CreatChannelFormBody">
        <form onSubmit={handleSubmit}>
          <div className="CreateChannelFormErrors">
            <ul>
              {errors && errors.map((error) => <li key={error}>{error}</li>)}
            </ul>
          </div>
          <input type="hidden" value={owner_id} />
          <input type="hidden" value={is_dm} />
          <input
            type="text"
            required
            placeholder="Channel name"
            value={title}
            onChange={updateTitle}
          />
          <textarea
            type="text"
            placeholder="Channel description (optional)"
            value={description}
            onChange={updateDescription}
          />
          <div className="CreateChannelButton">
            <button type="submit" disabled={errors.length > 0}>
              Create Channel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateChannelForm;
