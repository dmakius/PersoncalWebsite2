import mongoose from 'mongoose';
class HighScore extends mongoose.Schema {
  constructor() {
    super({
      name: String,
      score: Number,
      game: String
    })
  }
}

export default mongoose.model('HighScore', new HighScore());
