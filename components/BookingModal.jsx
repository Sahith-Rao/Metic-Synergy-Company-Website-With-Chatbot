const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  try {
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