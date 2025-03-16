import React, { useState, useRef, type ChangeEvent, useEffect } from 'react';
import { handleLLMRequest, handleSubmit} from '~/controller';
import 'bootstrap/dist/css/bootstrap.min.css';
import { setGlobalResponseData, setGlobalSchema, getGlobalSchema, setGlobalFile, getGlobalFile } from '~/globalState';

interface StepOneProps {
    onSuccess: (data: { file: File, initialSchema: string }) => void;
}
const StepOne: React.FC<StepOneProps> = ({ onSuccess }) => {
    const [selectedOption, setSelectedOption] = useState<string>('Per Person');
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [status, setStatus] = useState<string>('');  
    const [isClient, setIsClient] = useState(false); // Client check state
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Only run on client-side
    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value);
    };

    const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setUploadedFile(event.target.files[0]);
        }
    };

    const handleCancel = () => {
        setUploadedFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const onSubmitClick = async () => {
        setStatus('pending');
        try {
            // Ensure this is only called after the component has mounted
            if (!isClient || !uploadedFile) return;  // Prevent running before client-side hydration

            // Your LLM model logic
            const firstPrompt = `
            Given the following transactional data in CSV format, suggest a star schema with a fact table. The data is provided below:

            **Requirements:**
            1. **Fact Table**: Must include the following columns:
            - CustomerID (Foreign Key referencing Customer_Dim)
            - ProductID (Foreign Key referencing Product_Dim)
            - Index (Preserved unique ID for the transaction)
            - InvoiceNo (Invoice number for the transaction)
            - Quantity (Quantity of the product sold)

            2. **Dimension Tables**: Make 4 dimensions tables:
            - **Time_Dim**
            - **Product_Dim**
            - **Customer_Dim**
            - **Geography_Dim**

            **Output Format**:
            Please provide the schema in the following format:
            - Fact Table: [fact table columns]
            - Dimension Tables: [dimension table columns]
            `;  
            const response = await handleLLMRequest(uploadedFile, firstPrompt);
            const initialSchema = response.schema;
            console.log("Initial Schema:", initialSchema);
            setGlobalSchema(initialSchema);
            if (uploadedFile) {
                onSuccess({
                    file: uploadedFile,
                    initialSchema: JSON.stringify(initialSchema),
                });
            }

            setGlobalFile(uploadedFile);
            setStatus('successful');

        } catch (error) {
            setStatus('failed');
        }
    };

    return (
        <div className="step-container">
            <h2>User Specification Upload</h2>

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    value="Per Person"
                    checked={selectedOption === 'Per Person'}
                    onChange={handleOptionChange}
                />
                <label className="form-check-label">Per Person</label>
            </div>

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    value="Per Customer"
                    checked={selectedOption === 'Per Customer'}
                    onChange={handleOptionChange}
                />
                <label className="form-check-label">Per Customer</label>
            </div>

            <div className="mb-3">
                <input ref={fileInputRef} className="form-control" type="file" onChange={handleFileUpload} />
            </div>

            {uploadedFile && (
                <div className="alert alert-info d-flex justify-content-between align-items-center">
                    <span><strong>File Selected:</strong> {uploadedFile.name}</span>
                    <button className="btn btn-danger btn-sm" onClick={handleCancel}>Cancel</button>
                </div>
            )}

            {/* Status container */}
            <div className="status-container mt-3">
                {status === 'pending' && (
                    <div className="alert alert-warning" role="alert">
                        <strong>Request is pending...</strong> Please wait while we process your data.
                    </div>
                )}
                {status === 'successful' && (
                    <div className="alert alert-success" role="alert">
                        <strong>Success!</strong> Your data has been processed successfully.
                    </div>
                )}
                {status === 'failed' && (
                    <div className="alert alert-danger" role="alert">
                        <strong>Failed!</strong> There was an error processing your request. Please try again.
                    </div>
                )}
            </div>

            <button className="btn btn-primary" onClick={onSubmitClick}>Submit Selection</button>
        </div>
    );
};

export default StepOne;
