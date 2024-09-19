export interface FormField {
    name: string;
    label: string;
    type: string; // e.g., 'text', 'number', 'checkbox', etc.
    value?: any;
    options?: { key: string; value: any }[]; // for select options
    validators?: any[]; // Added for validation rules
  }
  