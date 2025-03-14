export interface SubmitParams {
    uploadedFile: File | null;
    selectedOption: string;
}

export const handleSubmit = async ({ uploadedFile, selectedOption }: SubmitParams): Promise<void> => {
    if (uploadedFile) {
        console.log("Submitting:", {
            option: selectedOption,
            file: uploadedFile,
        });

        try {
            const formData = new FormData();
            formData.append('file', uploadedFile);
            formData.append('option', selectedOption);

            const response = await fetch('/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log("Response received:", result);

            // Store the result for step2 to use
            localStorage.setItem('step2Data', JSON.stringify(result));

            alert("Form submitted successfully!");
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("There was an error submitting the form. Please try again.");
        }
    } else {
        alert("Please upload a file before submitting.");
    }
};