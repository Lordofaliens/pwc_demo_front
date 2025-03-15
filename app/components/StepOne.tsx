import React, { useState, useRef, type ChangeEvent } from 'react';
import { handleSubmit } from '~/controller';
import 'bootstrap/dist/css/bootstrap.min.css';
import { setGlobalResponseData } from '~/globalState';

const StepOne: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState<string>('Per Person');
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [status, setStatus] = useState<string>(''); // State to track request status
    const fileInputRef = useRef<HTMLInputElement>(null);

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
        // Set status to 'pending' before sending the request
        setStatus('pending');

        try {
            const response = await handleSubmit({ uploadedFile, selectedOption });
            console.log("RESPONSE FROM SERVER:", response);

            // Set status to 'successful' if response is successful
            setStatus('successful');
            setGlobalResponseData(response);
        } catch (error) {
            console.error("Error during request:", error);

            // Set status to 'failed' if there was an error
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