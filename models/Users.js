import mongoose from 'mongoose';
class User  extends mongoose.Schema {
  constructor() {
    super({
        username: {
            type: String,
            unique: true,
            required: true,
          },
          password: {
            type: String,
            minlength: 6,
            required: true,
          }
    })
  }
}

export default mongoose.model('User ', new User ());
