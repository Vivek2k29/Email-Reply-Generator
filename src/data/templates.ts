import { TemplateCollection } from '../types';

export const templates: TemplateCollection = {
  'Inquiry': {
    description: 'Response to general inquiries about products, services, or information',
    template: `Dear {sender},

Thank you for your inquiry about {topic}. I appreciate your interest.

{customResponse}

If you have any further questions, please don't hesitate to reach out. I'm happy to provide any additional information you might need.

Best regards,
{yourName}`,
    keywords: ['information', 'interested in', 'inquiry', 'question about', 'wondering if', 'details about', 'learn more']
  },
  
  'Meeting Request': {
    description: 'Response to requests for meetings or appointments',
    template: `Dear {sender},

Thank you for your request to schedule a meeting to discuss {topic}.

I would be happy to meet with you. {acceptanceOrAlternative}

Please let me know if this works for you, or if you would prefer an alternative time.

Looking forward to our conversation.

Best regards,
{yourName}`,
    keywords: ['schedule', 'meeting', 'appointment', 'discuss', 'call', 'available', 'availability', 'meet']
  },
  
  'Follow Up': {
    description: 'Response to follow-up emails regarding previous conversations or commitments',
    template: `Dear {sender},

Thank you for following up regarding {topic}.

{statusUpdate}

I appreciate your patience and continued interest. Please let me know if you need any further information.

Best regards,
{yourName}`,
    keywords: ['follow up', 'checking in', 'update', 'progress', 'status', 'wanted to see', 'touch base']
  },
  
  'Thank You': {
    description: 'Response to thank you emails',
    template: `Dear {sender},

You're very welcome! It was my pleasure to {action}.

{additionalComments}

I look forward to the opportunity to work with you again in the future.

Best regards,
{yourName}`,
    keywords: ['thank you', 'thanks', 'appreciate', 'grateful', 'helped', 'assistance']
  },
  
  'Complaint': {
    description: 'Response to complaints or expressions of dissatisfaction',
    template: `Dear {sender},

I sincerely apologize for the inconvenience you've experienced regarding {issue}. I understand your frustration and want to assure you that we take this matter very seriously.

{resolutionSteps}

Thank you for bringing this to our attention. Your feedback is valuable and helps us improve our services.

Sincerely,
{yourName}`,
    keywords: ['complaint', 'issue', 'problem', 'disappointed', 'dissatisfied', 'unhappy', 'not working', 'failed', 'error']
  },
  
  'Support Request': {
    description: 'Response to technical support or assistance requests',
    template: `Dear {sender},

Thank you for contacting our support team about {issue}.

{troubleshootingSteps}

If these steps don't resolve the issue, please reply with any error messages you receive, and I'll be happy to provide further assistance.

Best regards,
{yourName}
Support Team`,
    keywords: ['help', 'support', 'assistance', 'not working', 'error', 'problem', 'fix', 'trouble', 'technical', 'broken']
  },
  
  'Introduction': {
    description: 'Response to introductory emails or new connections',
    template: `Dear {sender},

Thank you for reaching out and introducing yourself. It's a pleasure to connect with you.

{responseToIntroduction}

I look forward to the possibility of {potentialCollaboration}.

Best regards,
{yourName}`,
    keywords: ['introduction', 'introduce', 'connect', 'network', 'pleasure to meet', 'referred by']
  },
  
  'Feedback': {
    description: 'Response to feedback or suggestions',
    template: `Dear {sender},

Thank you for taking the time to provide your feedback regarding {topic}. We greatly value your input.

{responseToFeedback}

Your insights help us improve, and we appreciate your contribution to making our products/services better.

Best regards,
{yourName}`,
    keywords: ['feedback', 'suggestion', 'improve', 'opinion', 'thoughts', 'review', 'recommend']
  },
  
  'Unknown': {
    description: 'Generic response when the email type cannot be determined',
    template: `Dear {sender},

Thank you for your email. I have received your message regarding {topic}.

I will review the details you've provided and get back to you with a more specific response shortly.

Best regards,
{yourName}`,
    keywords: []
  }
};