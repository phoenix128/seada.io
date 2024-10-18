import { IValueType } from '@seada.io/core/spi/tw/get-tw-classes';

export type ILocalizableValue<TData = IValueType | IValueType[]> =
    | {
          [key: string]: TData;
      }
    | TData;
