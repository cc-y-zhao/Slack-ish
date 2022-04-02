import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams, Redirect } from 'react-router-dom';

// import { ValidationError } from '../../utils/ValidationError';
// import ErrorMessage from '../ErrorMessage/ErrorMessage';

import { createChannel } from '../../store/channels';

// import './CreateReviewForm.css';

const CreateChannelForm = () => {

  const dispatch = useDispatch();
  const history = useHistory();

  const [errors, setErrors] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const owner_id = useSelector(state => state.session.user).id
  const is_dm = false;

  const updateTitle = (e) => setTitle(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);

  useEffect(() => {
    const validationErrors = [];

    if (title.length === 0) validationErrors.push('Please provide a name for your channel');

    setErrors(validationErrors);
  }, [title])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      owner_id,
      title,
      is_dm,
      description
    };

    let newChannel;

    try {

      newChannel = await dispatch(createChannel(payload));
    } catch (error) {
      // if (error instanceof ValidationError) setErrors(error.errors);
      // // If error is not a ValidationError, add slice at the end to remove extra
      // // "Error: "
      // else setErrors({ overall: error.toString().slice(7) })
    }
    if (newChannel) {
      setErrors([]);
      // dispatch(getReviewsByCar(carId));
      // setShowModal(false);
      // return history.push(`/cars/${carId}`);
    }
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
            <ul>
              {errors &&
                errors.map(error => (
                  <li key={error}>{error}</li>
                ))
              }
            </ul>
          </div>
          <input
            type="hidden"
            value={owner_id}
          />
          <input
            type="hidden"
            value={is_dm}
          />
          <div>
            <label>Channel Title</label>
            <textarea
              type="text"
              required
              placeholder='Channel name'
              value={title}
              onChange={updateTitle} />
          </div>
          <div>
            <label>Description</label>
            <textarea
              type="text"
              placeholder='Channel description'
              value={description}
              onChange={updateDescription} />
          </div>
          <div>
            <button
              type="submit"
              disabled={errors.length > 0}
            >
              Create Channel
            </button>
            {/* <button className='btn-in-form' type="button" onClick={handleCancelClick}>Cancel</button> */}
          </div>
        </form>
      </section>
    </>
  );
};

export default CreateReviewForm;
