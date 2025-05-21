import dotenv from 'dotenv';
import mongoose from 'mongoose';

export default class Mongo {
  constructor() {
    dotenv.config();
    const proto = Object.getPrototypeOf(this);
    if (!proto.connection) {
      proto.connection = mongoose.connect(process.env.DATABASE_HOST);
    }
  }
}