import express from 'express';
import Bootstrap from './app/bootstrap/Bootstrap.js';
import dotenv from 'dotenv';
import '../src/app/utils/CpuMonitor.js';
import uploadRoutes from '../src/app/routes/UploadRoutes.js';
import policyRoutes from '../src/app/routes/PolicyRoutes.js';
import postRoutes from '../src/app/routes/PostRoutes.js';
import './scheduler.js';


const app = express();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use('/api', uploadRoutes);
app.use('/api', policyRoutes);
app.use('/api', postRoutes);

Promise.all(Bootstrap.intializeServices()).then(() => {
  const PORT = process.env.APP_PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server connected in ${PORT} Port`);
  });
}).catch((error) => {
  console.error(error);
});