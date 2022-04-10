import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { editChannel, deleteChannel, loadChannel } from "../../store/channels";
import { hideModal } from "../../store/modal";
import "../CreateChannelForm/CreateChannelForm.css";

const EditChannelForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [errors, setErrors] = useState([]);

  const editId = useSelector((state) => state.modals.id);
  const channelToEdit = useSelector((state) => state.channels[editId]);
  const id = channelToEdit?.id;
  const is_dm = false;

  let descriptionCheck = channelToEdit?.description
    ? channelToEdit?.description
    : "";

  const [title, setTitle] = useState(channelToEdit?.title);
  const [description, setDescription] = useState(descriptionCheck);

  const updateTitle = (e) => setTitle(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);

  useEffect(() => {
    const validationErrors = [];

    if (title?.length > 50)
      validationErrors.push("Title must be 50 characters or less");
    if (description?.length > 150)
      validationErrors.push("Description must be 150 characters or less");

    setErrors(validationErrors);
  }, [title, description]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const editedChannel = {
      id,
      title,
      is_dm,
      description,
    };

    let editedChannelSuccess;

    editedChannelSuccess = await dispatch(editChannel(editedChannel));

    if (editedChannelSuccess) {
      setErrors([]);
      await dispatch(loadChannel(editedChannel.id));
      await dispatch(hideModal());
      history.push(`/channels/${editedChannel.id}`);
    }
  };

  const handleDelete = async (e, id) => {
    e.preventDefault();
    let deletedChannel;
    if (
      window.confirm(
        "Are you sure you want to delete this channel and all of its contents?"
      )
    ) {
      deletedChannel = await dispatch(deleteChannel(id));

      if (deletedChannel) {
        await dispatch(hideModal());
        await dispatch(loadChannel(1));
        return <Redirect to="/channels/1" />;
      }
    }
  };

  return (
    <div className="CreateChannelFormWrapper">
      <div className="CreateChannelFormHeader">
        <h1>Edit Channel</h1>
      </div>
      <div className="CreatChannelFormBody">
        <form onSubmit={handleSubmit}>
          <div className="CreateChannelFormErrors">
            <ul>
              {errors && errors.map((error) => <li key={error}>{error}</li>)}
            </ul>
          </div>
          <input type="hidden" value={id} />
          <input type="hidden" value={is_dm} />
          <div className="CreateChannelTitle">
            <input type="title" required value={title} onChange={updateTitle} />
          </div>
          <div className="CreateChannelDescription">
            <textarea
              type="description"
              value={description}
              onChange={updateDescription}
            />
          </div>
          <div className="EditMessageButtonContainer">
            <div className="UpdateMessageButton">
              <button type="submit" disabled={errors.length > 0}>
                Update
              </button>
            </div>
            <div className="DeleteMessageButton">
              <button onClick={(e) => handleDelete(e, channelToEdit?.id)}>
                Delete
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditChannelForm;
