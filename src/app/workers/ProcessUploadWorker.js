import { parentPort, workerData } from 'worker_threads';
import xlsx from 'xlsx';
import fs from 'fs';
import Bootstrap from '../bootstrap/Bootstrap.js';
import mongoose from 'mongoose';

// Load models
import Agent from '../models/Agent.js';
import User from '../models/User.js';
import Account from '../models/Account.js';
import PolicyCategory from '../models/PolicyCategory.js';
import PolicyCarrier from '../models/PolicyCarrier.js';
import PolicyInfo from '../models/PolicyInfo.js';

(async () => {

    console.log('Worker: Initializing services...');
    await Promise.all(Bootstrap.intializeServices());
    console.log('Worker: MongoDB connected');
    console.log('mongoose models', mongoose.modelNames());

    const filePath = workerData.filePath;
    const ext = filePath.endsWith('.csv') ? 'csv' : 'xlsx';
    let jsonData = [];

    if (ext === 'xlsx') {
      const workbook = xlsx.readFile(filePath);
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      jsonData = xlsx.utils.sheet_to_json(sheet);
    } else {
      const csv = (await import('csv-parser')).default;
      jsonData = [];
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => jsonData.push(row))
        .on('end', async () => await processData(jsonData));
      return;
    }

    await processData(jsonData);
})();

async function processData(data) {
  for (const row of data) {
    // Extract and insert Agent
    const agent = await Agent.findOneAndUpdate(
      { agentName: row.agent },
      { agentName: row.agent },
      { upsert: true, new: true }
    );

    // Extract and insert User
    const user = await User.findOneAndUpdate(
      { email: row.email },
      {
        firstName: row.firstname,
        dob: new Date(row.dob),
        address: row.address,
        phoneNumber: row.phone,
        state: row.state,
        zipCode: row.zip,
        gender: row.gender,
        userType: row.userType
      },
      { upsert: true, new: true }
    );

    // Extract and insert Account
    await Account.findOneAndUpdate(
      { account_name: row.account_name },
      { account_name: row.account_name, userId: user._id },
      { upsert: true, new: true }
    );

    // Extract and insert LOB
    const lob = await PolicyCategory.findOneAndUpdate(
      { category_name: row.category_name },
      { category_name: row.category_name },
      { upsert: true, new: true }
    );

    // Extract and insert Carrier
    const carrier = await PolicyCarrier.findOneAndUpdate(
      { company_name: row.company_name },
      { company_name: row.company_name },
      { upsert: true, new: true }
    );

    // Extract and insert Policy
    await PolicyInfo.findOneAndUpdate(
      { policy_number: row.policy_number },
      {
        policy_start_date: new Date(row.policy_start_date),
        policy_end_date: new Date(row.policy_end_date),
        categoryId: lob._id,
        carrierId: carrier._id,
        userId: user._id
      },
      { upsert: true, new: true }
    );
  }

  parentPort.postMessage({ status: 'success' });
}
