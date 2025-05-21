import { getAggregatedPoliciesByUser } from '../repositories/PolicyRepository.js';

export async function getPolicyCountByUser(req, res) {
  try {
    const data = await getAggregatedPoliciesByUser();
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}