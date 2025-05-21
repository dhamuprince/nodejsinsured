import PolicyInfo from '../models/PolicyInfo.js';
import '../models/User.js';
import '../models/PolicyCarrier.js';
import '../models/PolicyCategory.js';

export async function findPoliciesByUserId(obj) {
  try {
    const policies = await PolicyInfo.find(obj)
      .populate({ path: 'categoryId', ref: 'PolicyCategory' })
      .populate({ path: 'carrierId', ref: 'PolicyCarrier' })
      .populate({ path: 'userId', ref: 'User' })
      .exec();

    return policies;
  } catch (err) {
    console.error('[PolicyRepository] Error fetching policies:', err);
    throw err;
  }
}


export async function getAggregatedPoliciesByUser() {
  return await PolicyInfo.aggregate([
    {
      $group: {
        _id: "$userId",
        policyCount: { $sum: 1 },
        latestPolicyDate: { $max: "$policy_end_date" },
      }
    },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "user"
      }
    },
    {
      $unwind: "$user"
    },
    {
      $project: {
        _id: 0,
        userId: "$_id",
        policyCount: 1,
        latestPolicyDate: 1,
        userName: "$user.firstName",
        email: "$user.email"
      }
    }
  ]);
}

