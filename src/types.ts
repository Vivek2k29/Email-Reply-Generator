export type EmailType = 
  | 'Inquiry' 
  | 'Meeting Request' 
  | 'Follow Up' 
  | 'Thank You' 
  | 'Complaint' 
  | 'Support Request'
  | 'Introduction'
  | 'Feedback'
  | 'Unknown';

export interface ReplyTemplate {
  description: string;
  template: string;
  keywords: string[];
}

export interface TemplateCollection {
  [key: string]: ReplyTemplate;
}