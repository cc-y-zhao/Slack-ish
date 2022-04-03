import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { editChannel, deleteChannel } from "../../store/channels";
//add deletechannel to edit form
//need to do loadOneChannel and create single channel page and pass in as prop
const EditChannelForm = ({ channelToEdit }) => {
  // const channelToEdit = useSelector(() => channel);
  // const channelToEdit = useSelector((state) => state.channels[channel_id]);

  // console.log("channelToEdit in EditChannelForm--------", channelToEdit);
  const user = useSelector((state) => state.session.user);

  const dispatch = useDispatch();
  const params = useParams();

  const [title, setTitle] = useState(channelToEdit?.title);
  const [description, setDescription] = useState(channelToEdit?.description);
  const [errors, setErrors] = useState([]);

  const updatedTitle = (e) => setTitle(e.target.value);
  const updatedDescription = (e) => setDescription(e.target.value);

  // useEffect(() => {
  //   const validationErrors = [];

  //   if (title.length > 50)
  //     validationErrors.push("Title must be 50 characters or less");
  //   if (description.length > 1000)
  //     validationErrors.push("Description must be 1000 characters or less");
  // }, [title, description]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let editedChannel = {
      id: channelToEdit.id,
      title,
      description,
    };

    dispatch(editChannel(channelToEdit.id, editedChannel)).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });

    // dispatch(editChannel(params.id, editedChannel)).catch(async (res) => {
    //   const data = await res.json();
    //   if (data && data.errors) setErrors(data.errors);
    // });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <ul>{errors}</ul>
        <label>
          Title
          <input type="title" required value={title} onChange={updatedTitle} />
        </label>
        <label>
          Add a description (optional)
          <textarea
            type="description"
            value={description}
            onChange={updatedDescription}
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
