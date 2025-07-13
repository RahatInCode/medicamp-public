import { useForm } from 'react-hook-form';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../features/auth/AuthContext';
import axios from '../../../api/axiosSecure';
import { toast } from 'react-hot-toast';
import { Loader2, UploadCloud } from 'lucide-react';
import { useNavigate } from 'react-router';

const AddCamp = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const campData = {
        ...data,
        organizerEmail: user.email,
        participantCount: 0,
      };
      await axios.post('/camps', campData);
      toast.success('✅ Camp added successfully!');
      reset();
      setPreview(null);
      navigate('/organizer/dashboard');
    } catch (err) {
  toast.error(err.message) 
} finally {
      setLoading(false);
    }
  };

  return (
<div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-2xl shadow-xl mt-10">
  <h2 className="text-3xl font-bold text-center mb-6">📋 Add a New Camp</h2>
  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="font-semibold">Camp Name</label>
          <input
            type="text"
            {...register('campName', { required: 'Camp name is required' })}
            className="input input-bordered w-full mt-1"
            placeholder="Example: Blood Donation Camp"
          />
          {errors.campName && <p className="text-red-500 text-sm">{errors.campName.message}</p>}
        </div>

        <div>
          <label className="font-semibold">Camp Fees</label>
          <input
            type="number"
            {...register('campFees', { required: 'Camp fee is required' })}
            className="input input-bordered w-full mt-1"
            placeholder="Ex: 500"
          />
          {errors.campFees && <p className="text-red-500 text-sm">{errors.campFees.message}</p>}
        </div>

        <div>
          <label className="font-semibold">Date & Time</label>
          <input
            type="datetime-local"
            {...register('dateTime', { required: 'Date & time is required' })}
            className="input input-bordered w-full mt-1"
          />
          {errors.dateTime && <p className="text-red-500 text-sm">{errors.dateTime.message}</p>}
        </div>

        <div>
          <label className="font-semibold">Location</label>
          <input
            type="text"
            {...register('location', { required: 'Location is required' })}
            className="input input-bordered w-full mt-1"
            placeholder="Example: Dhanmondi, Dhaka"
          />
          {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
        </div>

        <div>
          <label className="font-semibold">Healthcare Professional</label>
          <input
            type="text"
            {...register('healthcareProfessional', {
              required: 'Healthcare professional is required',
            })}
            className="input input-bordered w-full mt-1"
            placeholder="Ex: Dr. Raihan Islam"
          />
          {errors.healthcareProfessional && (
            <p className="text-red-500 text-sm">{errors.healthcareProfessional.message}</p>
          )}
        </div>

        <div>
          <label className="font-semibold">Description</label>
          <textarea
            {...register('description', { required: 'Description is required' })}
            className="textarea textarea-bordered w-full mt-1"
            placeholder="Describe the purpose and process of the camp"
          ></textarea>
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>

        <div>
          <label className="font-semibold">Camp Image</label>
          <input
            type="text"
            {...register('image', { required: 'Image URL is required' })}
            onChange={(e) => setPreview(e.target.value)}
            className="input input-bordered w-full mt-1"
            placeholder="Paste image URL or upload image"
          />
          {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
          {preview && (
            <img
              src={preview}
              alt="Camp Preview"
              className="h-40 mt-2 rounded-lg border shadow-md object-cover"
            />
          )}
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full flex items-center justify-center"
          disabled={loading}
        >
          {loading ? <Loader2 className="animate-spin" /> : <UploadCloud className="mr-2" />} Add Camp
        </button>
      </form>
    </div>
  );
};

export default AddCamp;