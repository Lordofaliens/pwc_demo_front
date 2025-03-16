import React, { useState } from 'react';
import { handleLLMRequest, handleSubmit } from '~/controller';
import { setGlobalResponseData, getGlobalFile } from '~/globalState';

interface StepOnePointFiveProps {
    initialSchema?: string;
    file: File | null;
    selectedOption: string;
    onFinalizeSchema: () => void;
  }
interface SubmitParams {
    uploadedFile: File;
    selectedOption: string;
}
  const StepOne_Point_five: React.FC<StepOnePointFiveProps> = ({ onFinalizeSchema: finalizeSchemaProp, initialSchema, file, selectedOption }) => {
    const [messages, setMessages] = useState<Array<{ content: string, isUser: boolean }>>([]);
    const [inputMessage, setInputMessage] = useState('');
    const [schema, setSchema] = useState(initialSchema);
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<string>(''); 
    const [conversationHistory, setConversationHistory] = useState(initialSchema || '');


    const finalizeSchema = async () => {
        setStatus('pending');
    
        try {
            file = getGlobalFile();
            if (!file) {
                throw new Error("File is required");
            }
            const response = await handleSubmit(file, selectedOption);
            console.log("RESPONSE FROM SERVER:", response);
    
            setStatus('successful');
            setGlobalResponseData(response);
            finalizeSchemaProp();
        } catch (error) {
            console.error("Error during request:", error);
            setStatus('failed');
        }
    }
  
    const handleSendMessage = async () => {
      if (!inputMessage.trim() || isLoading) return;
  
      const newMessages = [...messages, { content: inputMessage, isUser: true }];
      setMessages(newMessages);
      setInputMessage('');
      setIsLoading(true);
  
      try {
        const updatedPrompt = `${conversationHistory}\n User: ${inputMessage}`;
        if (!file) {
          throw new Error("File is required");
        }
        const response = await handleLLMRequest(file, updatedPrompt);
        const responseString = JSON.stringify(response.schema);
        // Correctly uses response.schema
        setConversationHistory(`${updatedPrompt}\nAssistant: ${response.schema}`);
        setMessages([...newMessages, { 
            content : "Ok, I have genrated the schema for you.",
            isUser: false 
        }]);
        setSchema(responseString);
      } catch (error) {
        setMessages([...newMessages, {
          content: "Error processing request",
          isUser: false
        }]);
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
      <div className="step-container">
        <h2 className="text-2xl font-bold mb-6">Schema Design Assistant</h2>
  
        {/* Schema Display Section */}
        <div className="schema-preview mb-6">
          <h4 className="text-lg font-semibold mb-3">Generated Schema:</h4>
          {schema ? (
            <pre className="p-3 bg-gray-100 rounded" style={{ whiteSpace: 'pre-wrap' }}>
              {schema}
            </pre>
          ) : (
            <div className="text-gray-500">No schema generated yet...</div>
          )}
        </div>
  
        {/* Chat Interface */}
        <div className="chat-interface border rounded p-3 mb-3">
          <div className="message-history mb-3" style={{ height: '200px', overflowY: 'auto' }}>
            {messages.map((msg, index) => (
              <div key={index} className={`mb-2 ${msg.isUser ? 'text-end' : ''}`}>
                <div className={`d-inline-block p-2 rounded ${msg.isUser ? 'bg-primary text-white' : 'bg-light'}`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && <div className="text-muted">Processing...</div>}
          </div>
  
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask to modify the schema..."
            />
            <button
              className="btn btn-primary"
              onClick={handleSendMessage}
              disabled={isLoading}
            >
              Send
            </button>
          </div>
        </div>
  
        <button
          className="btn btn-success mt-3"
          onClick={finalizeSchema}
          disabled={!schema}
        >
          Finalize Schema and Continue
        </button>
      </div>
    );
  };
  

export default StepOne_Point_five;