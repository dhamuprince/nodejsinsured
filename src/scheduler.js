import cron from 'node-cron';
import ScheduledMessage from '../src/app/models/ScheduleMessage.js';
import Message from '../src/app/models/Message.js';

// Runs every minute
cron.schedule('* * * * *', async () => {
  const now = new Date();

  try {
    const dueMessages = await ScheduledMessage.find({ scheduledFor: { $lte: now } });

    for (const msg of dueMessages) {
      await Message.create({ message: msg.message });
      await ScheduledMessage.findByIdAndDelete(msg._id);
      console.log(`Inserted message: ${msg.message} at ${now.toISOString()}`);
    }
  } catch (error) {
    console.error('Cron error:', error.message);
  }
});
