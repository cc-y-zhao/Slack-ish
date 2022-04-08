import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { editChannel, deleteChannel, loadChannel } from "../../store/channels";
import { hideModal } from "../../store/modal";
import "../CreateChannelForm/CreateChannelForm.css";

//add deletechannel to edit form
//need to do loadOneChannel and create single channel page and pass in as prop
const EditChannelForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [errors, setErrors] = useState([]);

  const editId = useSelector((state) => state.modals.id);
  const channelToEdit = useSelector((state) => state.channels[editId]);
  const id = channelToEdit?.id;
  const is_dm = false;

  const [title, setTitle] = useState(channelToEdit?.title);
  const [description, setDescription] = useState(channelToEdit?.description);

  const updateTitle = (e) => setTitle(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);

  useEffect(() => {
    const validationErrors = [];

    if (title.length > 50)
      validationErrors.push("Title must be 50 characters or less");
    if (description.length > 150)
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

    editedChannelSuccess = await dispatch(editChannel(editedChannel)).then(() =>
      dispatch(loadChannel(editedChannel.id))
    );

    if (editedChannelSuccess) {
      setErrors([]);
      dispatch(hideModal());
      history.push(`/channels/${editedChannel.id}`);
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
          <button type="submit" disabled={errors.length > 0}>
            Update Channel
          </button>
        </form>
        <button
          onClick={async () => {
            await dispatch(deleteChannel(channelToEdit?.id))
              .then(() => dispatch(loadChannel(1)))
              .then(() => dispatch(hideModal()))
              .then(() => history.push(`/channels/1`));
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default EditChannelForm;
