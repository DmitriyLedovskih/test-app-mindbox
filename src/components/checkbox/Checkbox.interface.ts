export interface ICheckbox {
  isChecked: boolean;
  onChange: (checked: boolean) => void;
  text: string;
}
