import React, { useState, useRef, ChangeEvent } from 'react';
import { handleSubmit } from '../controller';
import 'bootstrap/dist/css/bootstrap.min.css';

const StepOne: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState<string>('Per Person');
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
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

    const onSubmitClick = () => {
        handleSubmit({ uploadedFile, selectedOption });
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
            <button className="btn btn-primary" onClick={onSubmitClick}>Submit Selection</button>
        </div>
    );
};

export default StepOne;