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
