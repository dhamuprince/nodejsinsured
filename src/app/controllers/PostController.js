import ScheduledMessage from '../models/ScheduleMessage.js';

export async function PostMessage(req, res){
    try {
                const { message, day, time } = req.body;
                if (!message || !day || !time) {
                return res.status(400).json({ error: 'Message, day, and time are required.' });
                }
                const scheduledFor = new Date(`${day}T${time}`);
                if (isNaN(scheduledFor.getTime())) {
                return res.status(400).json({ error: 'Invalid day or time format.' });
                }
                const scheduled = await ScheduledMessage.create({
                message,
                scheduledFor
                });
                return res.status(200).json({ success: true, data: scheduled });
        
    } catch (error) {
        return res.status(500).send({status: false, message: error.message});
    }
}