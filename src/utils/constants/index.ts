import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

import { IOption } from '@/types';

export const DateRangePresets: IOption<[Dayjs, Dayjs]>[] = [
  { label: 'Today', value: [dayjs().startOf('day'), dayjs().endOf('day')] },
  {
    label: 'Yesterday',
    value: [dayjs().subtract(1, 'day').startOf('day'), dayjs().subtract(1, 'day').endOf('day')],
  },
  {
    label: 'This Week',
    value: [dayjs().startOf('week'), dayjs().endOf('week')],
  },
  {
    label: 'Last Week',
    value: [dayjs().subtract(1, 'week').startOf('week'), dayjs().subtract(1, 'week').endOf('week')],
  },
  {
    label: 'This Month',
    value: [dayjs().startOf('month'), dayjs().endOf('month')],
  },
  {
    label: 'Last Month',
    value: [dayjs().subtract(1, 'month').startOf('month'), dayjs().subtract(1, 'month').endOf('month')],
  },
];
