import fs from 'fs';
import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

const generateData = userCount => {
  const users = [];

  const baseDate = new Date('2023-05-08 15:23:42');

  for (let i = 1; i <= userCount; i++) {
    const user = {
      _id: uuidv4(),
      email: `user${i}@ex.com`,
      username: `user${i}`,
      plan: i % 3,
      isArchived: Boolean(i % 2),
      createdAt: format(new Date(baseDate.getTime() + (i - 1) * 24 * 60 * 60 * 1000), 'yyyy-MM-dd HH:mm:ss'),
    };
    users.push(user);
  }

  const data = { users };

  fs.writeFileSync('db.json', JSON.stringify(data, null, 2));
};

generateData(40);
