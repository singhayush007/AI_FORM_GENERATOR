export type Fields = {
  name?: string;
  label?: string;
  placeholder?: string;
  type?: string;
  options?: string[];
};

export type FormContent = {
  formTitle?: string;
  formFields?: Fields[];
};

export type Form = {
  id: number;
  ownerId: string;
  published: boolean;
  shareUrl: string | null;
  submissions: number;
  createdAt: Date;
  content: FormContent;
};
