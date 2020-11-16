import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  handle: {
    type: String,
    required: true,
  },
});

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;
