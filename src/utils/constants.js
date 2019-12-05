import { format } from 'date-fns';
export const ISO_FORMAT = 'yyyy-MM-dd';
export const DEFAULT_DATE = format(new Date(), ISO_FORMAT);
export const DEFAULT_ACTION_LABELS = {
  apply: 'Apply',
  cancel: 'Cancel',
  reset: 'Reset'
};
