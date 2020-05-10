export interface FormInterface {
  title?: string;
  name?: string;
  placeHolder?: string;
  setData?: any;
  field?: string;
  errors?: any;
  type?: any;
  value?: any;
  mode?: any;
  optionList?: OptionList[];
  required?: boolean;
  style?: any;
  disabled?: boolean;
}

interface MsgError {
  message: string;
}

export interface OptionList {
  label: string | number;
  value: any;
}
