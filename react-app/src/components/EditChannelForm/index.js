import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editChannel, deleteChannel, loadChannel } from "../../store/channels";
import { hideModal } from "../../store/modal";

//add deletechannel to edit form
//need to do loadOneChannel and create single channel page and pass in as prop
const EditChannelForm = ({ channelToEdit }) => {
  const history = useHistory();

  const user = useSelector((state) => state.session.user);
  const id = channelToEdit?.id;
  const is_dm = false;

  // console.log('channelToEdit----------', channelToEdit)
  // console.log('channelToEdit title----------', channelToEdit.title)

  const dispatch = useDispatch();
  const params = useParams();

  const [title, setTitle] = useState(channelToEdit?.title);
  const [description, setDescription] = useState(channelToEdit?.description);
  const [errors, setErrors] = useState([]);

  const updateTitle = (e) => setTitle(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);

  useEffect(() => {
    const validationErrors = [];

    if (title?.length > 50)
      validationErrors.push("Title must be 50 characters or less");
    if (description?.length > 1000)
      validationErrors.push("Description must be 1000 characters or less");
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
    <>
      <form onSubmit={handleSubmit}>
        <ul>{errors}</ul>
        <input type="hidden" value={id} />
        <input type="hidden" value={is_dm} />
        <label>
          Title
          <input type="title" required value={title} onChange={updateTitle} />
        </label>
        <label>
          Add a description (optional)
          <textarea
            type="description"
            value={description}
            onChange={updateDescription}
          />
        </label>
        <button type="submit" disabled={errors.length > 0}>
          Update Channel
        </button>
      </form>
    </>
  );
};

export default EditChannelForm;
