import Mongo from './connections/Mongo.js';

export default class Bootstrap {
  static intializeServices() {
    const promiseStack = [];
    if (process.env.IS_MONGO === 'true') {
      const mongoPromise = new Promise((resolve, reject) => {
        try {
          const mongo = new Mongo();
          resolve(mongo.connection);
        } catch (error) {
          reject(new Error('Unable to create connection with mongo, please make sure mongo server is running.'));
        }
      });
      promiseStack.push(mongoPromise);
    }
    return promiseStack;
  }
}