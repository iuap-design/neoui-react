import { Precision } from '@components/date-picker/src/DatePickerUtils';
import { useConfig } from '@components/config-provider/src';
import { useMemoizedFn } from 'tne-fw-fe/hooks'


export function useRenderLabel() {
  const { locale } = useConfig();
  return useMemoizedFn((type: Precision, data: number) => {

    if (['zh-CN', 'zh-TW'].includes(locale.locale)) {
      const label =
        locale.DateTimePicker[type as keyof typeof locale.DateTimePicker] ?? '';
      return `${data}${label}`;
    }

    const labelMap = {
      [type]: data,
      week: `W${data}`,
      quarter: `Q${data}`,
      month: locale.Calendar.months[data - 1],
    }

    return labelMap[type] ?? data;
  });

}
