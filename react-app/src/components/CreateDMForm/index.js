import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Redirect } from "react-router-dom";

import { createChannel, loadChannels } from "../../store/channels";

const CreateDMForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const channels = useSelector((state) => Object.values(state.channels));
  const [errors, setErrors] = useState([]);
  const [title, setTitle] = useState("");
  const [showModal, setShowModal] = useState(false)
  const owner_id = useSelector((state) => state.session.user).id;
  const is_dm = true;

  useEffect(() => {
    dispatch(loadChannels(owner_id));
  }, [dispatch]);


  const updateTitle = (e) => setTitle(e.target.value);

  useEffect(() => {
    const validationErrors = [];

    if (title.length > 50)
      validationErrors.push("Title must be 50 characters or less");
    setErrors(validationErrors);
  }, [title]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      owner_id,
      title,
      is_dm,
    };

    let newChannel;

    try {
      newChannel = await dispatch(createChannel(payload));
    } catch (error) {

    }
    if (newChannel) {
      setErrors([]);
    }
  };

  return (
    <>
      <section>
        <form onSubmit={handleSubmit}>
          <div>
            <ul>
              {errors && errors.map((error) => <li key={error}>{error}</li>)}
            </ul>
          </div>
          <input type="hidden" value={owner_id} />
          <input type="hidden" value={is_dm} />
          <div>
            <label>Channel Title</label>
            <textarea
              type="text"
              required
              placeholder="Send a message"
              value={title}
              onChange={updateTitle}
            />
          </div>
          <div>
            <button type="submit" disabled={errors.length > 0}>
              Create Channel
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default CreateDMForm;
