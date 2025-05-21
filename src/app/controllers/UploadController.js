import path from 'path';
import { Worker } from 'worker_threads';
import User from '../models/User.js';
import { findPoliciesByUserId } from '../repositories/PolicyRepository.js';

export async function fileUpload(req, res){
    try {
        if (!req.file) {
            return res.status(400).json({ status: false, message: 'No file uploaded. Please attach a file.' });
        }
        const filePath = path.resolve(req.file.path);
        const worker = new Worker(path.resolve(__dirname, '../workers/processUploadWorker.js'), {
            workerData: { filePath }
        });

        worker.on('message', (message) => {
            if (message.status === 'success') {
            res.status(200).json({ message: 'Data imported successfully!' });
            }
        });

        worker.on('error', (err) => {
            res.status(500).json({ message: 'Worker failed.', error: err.message });
        });

        worker.on('exit', (code) => {
            if (code !== 0) {
            console.error(`Worker stopped with exit code ${code}`);
            }
        });
        
    } catch (error) {
        return res.status(500).send({status:false, message: error.message});
    }
}


export async function policyInfoByUserName(req, res){
    try {
          const { username } = req.query;
          if (!username) {
             return res.status(400).json({ error: 'username query param is required' });
          }
            const user = await User.findOne({
            $or: [
                { email: username },
                { firstName: username }
            ]
            });

            if (!user) {
            return res.status(404).json({ error: 'User not found' });
            }
            let policies = await findPoliciesByUserId({ userId: user._id});

            return res.status(200).send({status: true, message: "Get Policy Info By User", user, policies});
            
    } catch (error) {
        return res.status(500).send({status: false, message: error.message});
    }
}