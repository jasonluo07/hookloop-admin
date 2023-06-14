import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

import { IOption } from '@/types';

export const DateRangePresets: IOption<[Dayjs, Dayjs]>[] = [
  { label: '今天', value: [dayjs().startOf('day'), dayjs().endOf('day')] },
  {
    label: '昨天',
    value: [dayjs().subtract(1, 'day').startOf('day'), dayjs().subtract(1, 'day').endOf('day')],
  },
  {
    label: '本週',
    value: [dayjs().startOf('week'), dayjs().endOf('week')],
  },
  {
    label: '上週',
    value: [dayjs().subtract(1, 'week').startOf('week'), dayjs().subtract(1, 'week').endOf('week')],
  },
  {
    label: '本月',
    value: [dayjs().startOf('month'), dayjs().endOf('month')],
  },
  {
    label: '上月',
    value: [dayjs().subtract(1, 'month').startOf('month'), dayjs().subtract(1, 'month').endOf('month')],
  },
];
