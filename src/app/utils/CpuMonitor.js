import os from 'os';

function getCPUUsagePercent() {
  const cpus = os.cpus();
  let idle = 0;
  let total = 0;

  cpus.forEach((core) => {
    for (const type in core.times) {
      total += core.times[type];
    }
    idle += core.times.idle;
  });

  const idlePercent = idle / cpus.length;
  const totalPercent = total / cpus.length;

  const usage = 100 - Math.floor((idlePercent / totalPercent) * 100);
  return usage;
}

setInterval(() => {
  const usage = getCPUUsagePercent();
  console.log(`CPU Usage: ${usage}%`);

  if (usage > 70) {
    console.warn('CPU over 70%. Exiting to trigger restart...');
    process.exit(1);
  }
}, 5000);
