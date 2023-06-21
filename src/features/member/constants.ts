export enum EPlanType {
  Free = 'Free',
  Standard = 'Standard',
  Premium = 'Premium',
}

export const PLAN_TYPE: Array<{
  value: EPlanType;
  label: string;
}> = [
  {
    value: EPlanType.Free,
    label: 'Free',
  },
  {
    value: EPlanType.Standard,
    label: 'Standard',
  },
  {
    value: EPlanType.Premium,
    label: 'Premium',
  },
];

export enum EIsArchived {
  'Active',
  'Archived',
}

export const IS_ARCHIVED_TYPE: Array<{
  value: number;
  label: string;
}> = [
  {
    value: EIsArchived.Active,
    label: 'Active',
  },
  {
    value: EIsArchived.Archived,
    label: 'Archived',
  },
];

export enum EStatus {
  NONE = 'NONE',
  UN_PAID = 'UN-PAID',
  PAY_SUCCESS = 'PAY-SUCCESS',
  PAY_FAIL = 'PAY-FAIL',
}
export const Status_TYPE: Array<{
  value: EStatus;
  label: string;
}> = [
  {
    value: EStatus.NONE,
    label: EStatus.NONE,
  },
  {
    value: EStatus.UN_PAID,
    label: EStatus.UN_PAID,
  },
  {
    value: EStatus.PAY_SUCCESS,
    label: EStatus.PAY_SUCCESS,
  },
  {
    value: EStatus.PAY_FAIL,
    label: EStatus.PAY_FAIL,
  },
];
