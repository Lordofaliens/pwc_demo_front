


export interface SubmitParams {
    uploadedFile: File | null;
    selectedOption: string;
}

export const handleSubmit = ({ uploadedFile, selectedOption }: SubmitParams): void => {
    if (uploadedFile) {
        console.log("Submitting:", {
            option: selectedOption,
            file: uploadedFile,
        });
        alert("Form submitted successfully!");
    } else {
        alert("Please upload a file before submitting.");
    }
};
