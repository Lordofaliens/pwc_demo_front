export interface SubmitParams {
    uploadedFile: File | null;
    selectedOption: string;
}

export const handleSubmit = async (uploadedFile : File, selectedOption: string): Promise<any> => {
    if (uploadedFile) {
        console.log("Submitting:", {
            option: selectedOption,
            file: uploadedFile.name,
        });

        try {
            const formData = new FormData();
            formData.append('file', uploadedFile);

            const response = await fetch('http://localhost:5000/gateway/calculate-pva', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log("Response received:", result);

            // Assuming the response contains the data that you want to store or use in further steps
            localStorage.setItem('step2Data', JSON.stringify(result));

            return result;
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("There was an error submitting the form. Please try again.");
        }
    } else {
        alert("Please upload a file before submitting.");
    }
};

interface SchemaResponse {
    schema: string;
    analysis: string;
}
  
export const handleLLMRequest = async (file: File, prompt: string) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('prompt', prompt); // Make sure this matches the backend parameter name
  
    try {
      const response = await fetch('http://localhost:5000/gateway/generate-schema', {
        method: 'POST',
        body: formData,
        // Don't set Content-Type header - browser will set it automatically with boundary
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('LLM Request Error:', error);
      throw new Error('Failed to communicate with Gemini: ');
    }
  };
