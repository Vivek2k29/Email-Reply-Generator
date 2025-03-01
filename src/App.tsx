import React, { useState } from 'react';
import { Mail, Send, RefreshCw, Copy, Check } from 'lucide-react';
import { analyzeEmail, generateReply } from './utils/emailProcessor';
import { EmailType, ReplyTemplate } from './types';
import { templates } from './data/templates';

function App() {
  const [inputEmail, setInputEmail] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [emailType, setEmailType] = useState<EmailType | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<EmailType | null>(null);

  const handleGenerate = () => {
    if (!inputEmail.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate processing time
    setTimeout(() => {
      // If a template is manually selected, use that instead of analyzing
      const type = selectedTemplate || analyzeEmail(inputEmail);
      setEmailType(type);
      
      const reply = generateReply(inputEmail, type);
      setGeneratedReply(reply);
      
      setIsGenerating(false);
    }, 800);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(generatedReply);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInputEmail('');
    setGeneratedReply('');
    setEmailType(null);
    setSelectedTemplate(null);
  };

  const handleTemplateSelect = (type: EmailType) => {
    setSelectedTemplate(type);
    // If there's already input, generate a reply with the new template
    if (inputEmail.trim()) {
      setIsGenerating(true);
      setTimeout(() => {
        setEmailType(type);
        const reply = generateReply(inputEmail, type);
        setGeneratedReply(reply);
        setIsGenerating(false);
      }, 800);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <Mail className="w-8 h-8 text-indigo-600 mr-2" />
            <h1 className="text-3xl font-bold text-gray-800">Email Reply Generator</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Generate contextually appropriate replies to emails based on content analysis and predefined templates.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
              <Mail className="w-5 h-5 mr-2 text-indigo-500" />
              Input Email
            </h2>
            <textarea
              className="w-full h-64 p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
              placeholder="Paste the email you received here..."
              value={inputEmail}
              onChange={(e) => setInputEmail(e.target.value)}
            ></textarea>
            <div className="mt-4 flex justify-between">
              <button
                onClick={handleClear}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
              >
                Clear
              </button>
              <button
                onClick={handleGenerate}
                disabled={!inputEmail.trim() || isGenerating}
                className={`px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors flex items-center ${
                  !inputEmail.trim() || isGenerating ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Generate Reply
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <Send className="w-5 h-5 mr-2 text-indigo-500" />
                Generated Reply
              </h2>
              {emailType && (
                <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm font-medium rounded-full">
                  {emailType}
                </span>
              )}
            </div>
            <div className="w-full h-64 p-4 border border-gray-300 rounded-md bg-gray-50 overflow-auto">
              {generatedReply ? (
                <div className="whitespace-pre-line">{generatedReply}</div>
              ) : (
                <div className="text-gray-400 italic h-full flex items-center justify-center">
                  Your generated reply will appear here...
                </div>
              )}
            </div>
            <div className="mt-4 flex justify-end">
              {generatedReply && (
                <button
                  onClick={handleCopyToClipboard}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors flex items-center"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy to Clipboard
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Available Templates</h2>
          <p className="text-gray-600 mb-4">
            Click on a template to use it for your reply. The system will use this template instead of auto-detecting the email type.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(templates).map(([type, template]) => (
              <div 
                key={type} 
                className={`border rounded-md p-4 transition-colors cursor-pointer ${
                  selectedTemplate === type 
                    ? 'border-indigo-500 bg-indigo-50' 
                    : 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/50'
                }`}
                onClick={() => handleTemplateSelect(type as EmailType)}
              >
                <h3 className="font-medium text-indigo-600 mb-2">{type}</h3>
                <p className="text-sm text-gray-600 line-clamp-3">{template.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;