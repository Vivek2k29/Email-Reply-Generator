import { EmailType } from '../types';
import { templates } from '../data/templates';

/**
 * Analyzes the content of an email to determine its type
 * @param emailContent The content of the email to analyze
 * @returns The determined email type
 */
export function analyzeEmail(emailContent: string): EmailType {
  const content = emailContent.toLowerCase();
  
  // Check each template's keywords against the email content
  for (const [type, template] of Object.entries(templates)) {
    if (type === 'Unknown') continue; // Skip the unknown type for now
    
    // Check if any keywords from this template appear in the email
    const matchesKeyword = template.keywords.some(keyword => 
      content.includes(keyword.toLowerCase())
    );
    
    if (matchesKeyword) {
      return type as EmailType;
    }
  }
  
  // Additional heuristics for common email types
  if (content.includes('meet') || content.includes('schedule') || content.includes('availability')) {
    return 'Meeting Request';
  }
  
  if (content.includes('thank') || content.includes('appreciate')) {
    return 'Thank You';
  }
  
  if (content.includes('issue') || content.includes('problem') || content.includes('not working')) {
    return 'Support Request';
  }
  
  // If no specific type is determined, return Unknown
  return 'Unknown';
}

/**
 * Extracts the sender's name from the email content
 * @param emailContent The content of the email
 * @returns The extracted sender name or a default value
 */
function extractSenderName(emailContent: string): string {
  // Look for common signature patterns
  const signatureMatch = emailContent.match(/(?:regards|sincerely|best|thanks),?\s*\n*([A-Za-z\s]+)/i);
  if (signatureMatch && signatureMatch[1]) {
    return signatureMatch[1].trim();
  }
  
  // Look for email format like "From: Name"
  const fromMatch = emailContent.match(/from:?\s*([A-Za-z\s]+)/i);
  if (fromMatch && fromMatch[1]) {
    return fromMatch[1].trim();
  }
  
  return 'Sender'; // Default fallback
}

/**
 * Extracts the main topic from the email content
 * @param emailContent The content of the email
 * @returns The extracted topic or a default value
 */
function extractTopic(emailContent: string): string {
  // Look for subject line
  const subjectMatch = emailContent.match(/subject:?\s*([^\n]+)/i);
  if (subjectMatch && subjectMatch[1]) {
    return subjectMatch[1].trim();
  }
  
  // Extract first sentence as topic
  const firstSentence = emailContent.split(/[.!?](\s|$)/)[0];
  if (firstSentence && firstSentence.length > 10 && firstSentence.length < 100) {
    return firstSentence.trim();
  }
  
  return 'your recent email'; // Default fallback
}

/**
 * Generates a custom response based on email type and content
 * @param emailContent The content of the email
 * @param emailType The determined type of the email
 * @returns A custom response paragraph
 */
function generateCustomResponse(emailContent: string, emailType: EmailType): string {
  const content = emailContent.toLowerCase();
  
  switch(emailType) {
    case 'Inquiry':
      return "I've reviewed your inquiry and would like to provide you with the information you requested. Our team specializes in this area, and we're committed to providing comprehensive solutions tailored to your specific needs.";
      
    case 'Meeting Request':
      return "I am available this Thursday at 2:00 PM or Friday at 10:00 AM (Eastern Time). Alternatively, I could arrange a meeting early next week if that would be more convenient for you.";
      
    case 'Follow Up':
      return "We have made significant progress on the project since our last communication. The team has completed the initial phase and we are now moving forward with the next steps as outlined in our project plan.";
      
    case 'Thank You':
      return "It was my pleasure to assist you. Your satisfaction is important to us, and I'm glad we were able to meet your expectations.";
      
    case 'Complaint':
      return "I have escalated this issue to our senior management team. We will be conducting a thorough investigation to identify the root cause and implement corrective measures. As an immediate step, I have arranged for a replacement to be sent to you, which you should receive within 2-3 business days.";
      
    case 'Support Request':
      return "Based on your description, I recommend trying the following steps:\n\n1. Clear your browser cache and cookies\n2. Restart the application\n3. Ensure you are using the latest version of our software\n\nThese steps resolve similar issues in most cases.";
      
    case 'Introduction':
      return "It's great to learn about your background and interests. Our organization is always looking to connect with professionals in your field, and I believe there could be some interesting opportunities for collaboration.";
      
    case 'Feedback':
      return "We greatly appreciate your thoughtful feedback. Your suggestions align with some improvements we've been considering, and your perspective provides valuable validation. I've shared your comments with our product team, who will take them into account in our next development cycle.";
      
    case 'Unknown':
      return "I've received your message and will review it carefully. If I need any additional information to properly address your email, I'll be sure to reach out.";
      
    default:
      return "I've reviewed your message and appreciate you taking the time to reach out. Our team is dedicated to providing excellent service, and we value your communication.";
  }
}

/**
 * Generates a reply based on the email content and determined type
 * @param emailContent The content of the email
 * @param emailType The determined type of the email
 * @returns A generated reply
 */
export function generateReply(emailContent: string, emailType: EmailType): string {
  // Get the template for the email type
  const template = templates[emailType] || templates['Unknown'];
  
  // Extract information from the email
  const sender = extractSenderName(emailContent);
  const topic = extractTopic(emailContent);
  
  // Generate custom response based on email type
  const customResponse = generateCustomResponse(emailContent, emailType);
  
  // Replace placeholders in the template
  let reply = template.template
    .replace('{sender}', sender)
    .replace('{topic}', topic)
    .replace('{yourName}', 'Your Name');
  
  // Replace specific placeholders based on email type
  switch(emailType) {
    case 'Meeting Request':
      reply = reply.replace('{acceptanceOrAlternative}', 'I am available this Thursday at 2:00 PM or Friday at 10:00 AM (Eastern Time).');
      break;
    case 'Follow Up':
      reply = reply.replace('{statusUpdate}', 'We have made significant progress on the project since our last communication.');
      break;
    case 'Thank You':
      reply = reply.replace('{action}', 'assist you with your request')
                  .replace('{additionalComments}', "Your satisfaction is important to us, and I'm glad we were able to meet your expectations.");
      break;
    case 'Complaint':
      reply = reply.replace('{issue}', topic)
                  .replace('{resolutionSteps}', 'I have escalated this issue to our senior management team. We will be conducting a thorough investigation and will get back to you within 24 hours with a resolution.');
      break;
    case 'Support Request':
      reply = reply.replace('{issue}', topic)
                  .replace('{troubleshootingSteps}', customResponse);
      break;
    case 'Introduction':
      reply = reply.replace('{responseToIntroduction}', customResponse)
                  .replace('{potentialCollaboration}', 'working together in the future');
      break;
    case 'Feedback':
      reply = reply.replace('{responseToFeedback}', customResponse);
      break;
    default:
      reply = reply.replace('{customResponse}', customResponse);
  }
  
  return reply;
}