// Fix form submission and validation
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  try {
    // Add proper error handling
    const response = await submitBooking(formData);
    if (response.success) {
      setIsSuccess(true);
      resetForm();
    }
  } catch (error) {
    setError(error.message);
  } finally {
    setIsLoading(false);
  }
}; 