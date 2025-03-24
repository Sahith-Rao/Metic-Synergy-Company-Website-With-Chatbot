import React, { useState } from 'react';
import { FlickeringGrid } from '../components/FlickeringGrid';
import { Mail, Phone, User, Building } from 'lucide-react';
import CalendarSelector from '../components/CalendarSelector';
import styled from 'styled-components';

// Define services array directly in component
const services = [
  'Digital Marketing',
  'Photography',
  'Videography',
  'Brand Development',
  'Social Media Management',
  'Content Creation'
];

// Define form data interface
interface BookingFormData {
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  service: string;
  company?: string;
}

const Book: React.FC = () => {
    // Initialize form state
    const [formData, setFormData] = useState<BookingFormData>({
        name: '',
        phone: '',
        email: '',
        date: '',
        time: '',
        company: '',
        service: ''
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formTouched, setFormTouched] = useState<Record<string, boolean>>({});

    // Validation functions
    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const validatePhone = (phone: string) => {
        const re = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
        return re.test(phone);
    };
    
    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        // Required fields with inline error messages
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!validateEmail(formData.email)) newErrors.email = 'Please enter a valid email address';

        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
        else if (!validatePhone(formData.phone)) newErrors.phone = 'Please enter a valid phone number';

        if (!formData.service) newErrors.service = 'Please select a service';
        if (!formData.date) newErrors.date = 'Please select a date';
        if (!formData.time) newErrors.time = 'Please select a time';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle input blur (for displaying errors after user interaction)
    const handleBlur = (field: string) => {
        setFormTouched(prev => ({ ...prev, [field]: true }));
    };

    // Direct API call function (replaces BookingContext functionality)
    const submitBookingToAPI = async (bookingData: BookingFormData) => {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}/api/bookings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...bookingData,
                company: bookingData.company || 'Not provided' // Ensure company field exists
            }),
        });
        
        if (!response.ok) {
            throw new Error('Failed to submit booking');
        }
        
        return await response.json();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Mark all fields as touched on submit attempt
        const allTouched = Object.keys(formData).reduce(
            (acc, key) => ({ ...acc, [key]: true }),
            {}
        );
        setFormTouched(allTouched);

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            // Submit booking directly to API
            const responseData = await submitBookingToAPI(formData);
            
            // Reset form state after successful submission
            setFormData({ name: '', phone: '', email: '', date: '', time: '', company: '', service: '' });
            setErrors({});
            setFormTouched({}); // Reset touched state as well
            
            // Show appropriate success message based on email status
            if (responseData.emailSent) {
                setErrors({ submit: 'Booking submitted successfully! A confirmation email has been sent.' });
            } else {
                setErrors({ submit: 'Booking submitted successfully! . Please check your booking details with us directly.' });
            }
        } catch (err) {
            console.error('Error submitting booking:', err);
            setErrors({ submit: 'Failed to submit booking. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="pt-16 sm:pt-20 px-4 sm:px-6 bg-cover bg-center min-h-screen flex flex-col items-center justify-center text-white relative"
             style={{ perspective: '1000px' }}>
            <FlickeringGrid color="#000000" className="absolute inset-0 z-[-1]" />
            <div className="max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl w-full transform-gpu bg-black/50 p-4 sm:p-6 md:p-8 lg:p-10 rounded-lg"
                 style={{ transformStyle: 'preserve-3d', boxShadow: '0px 10px 50px rgba(0, 0, 0, 0.8)' }}>
                <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-8">Book an Appointment</h1>

                <StyledWrapper>
                    <div className="form-container">
                        {/* Display success or general error message */}
                        {errors.submit && <div className={errors.submit.startsWith('Booking submitted') ? "success-message" : "error-message"}>{errors.submit}</div>}

                        <form className="form" onSubmit={handleSubmit}>
                            {/* Name Input */}
                            <div className={`form-group ${errors.name && formTouched.name ? 'has-error' : ''}`}>
                                <label htmlFor="name">
                                    <User className="icon" /> Full Name <span className="required">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    onBlur={() => handleBlur('name')}
                                    placeholder="Enter your full name"
                                    required
                                    aria-invalid={errors.name && formTouched.name ? 'true' : 'false'}
                                />
                                {errors.name && formTouched.name && <div className="field-error">{errors.name}</div>}
                            </div>

                            {/* Email Input */}
                            <div className={`form-group ${errors.email && formTouched.email ? 'has-error' : ''}`}>
                                <label htmlFor="email">
                                    <Mail className="icon" /> Email Address <span className="required">*</span>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    onBlur={() => handleBlur('email')}
                                    placeholder="Enter your email address"
                                    required
                                    aria-invalid={errors.email && formTouched.email ? 'true' : 'false'}
                                />
                                {errors.email && formTouched.email && <div className="field-error">{errors.email}</div>}
                            </div>

                            {/* Phone Input */}
                            <div className={`form-group ${errors.phone && formTouched.phone ? 'has-error' : ''}`}>
                                <label htmlFor="phone">
                                    <Phone className="icon" /> Phone Number <span className="required">*</span>
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    onBlur={() => handleBlur('phone')}
                                    placeholder="Enter your phone number"
                                    required
                                    aria-invalid={errors.phone && formTouched.phone ? 'true' : 'false'}
                                />
                                {errors.phone && formTouched.phone && <div className="field-error">{errors.phone}</div>}
                            </div>

                            {/* Company Input (Optional) */}
                            <div className="form-group optional-field">
                                <label htmlFor="company">
                                    <Building className="icon" /> Company/Business Name
                                </label>
                                <input
                                    type="text"
                                    id="company"
                                    name="company"
                                    value={formData.company}
                                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                    placeholder="Enter your company or business name (optional)"
                                />
                            </div>

                            {/* Service Selection */}
                            <div className={`form-group ${errors.service && formTouched.service ? 'has-error' : ''}`}>
                                <label htmlFor="service">Service Required <span className="required">*</span></label>
                                <select
                                    id="service"
                                    name="service"
                                    value={formData.service}
                                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                                    onBlur={() => handleBlur('service')}
                                    required
                                    aria-invalid={errors.service && formTouched.service ? 'true' : 'false'}
                                >
                                    <option value="">Select a service</option>
                                    {services.map((service, index) => (
                                        <option key={index} value={service}>
                                            {service}
                                        </option>
                                    ))}
                                </select>
                                {errors.service && formTouched.service && <div className="field-error">{errors.service}</div>}
                            </div>

                            {/* Calendar and Time Selection */}
                            <div className={`calendar-container ${(errors.date || errors.time) && (formTouched.date || formTouched.time) ? 'has-error' : ''}`}>
                                <div className="calendar-label">
                                    <span>Date & Time Selection <span className="required">*</span></span>
                                    {(errors.date || errors.time) && (formTouched.date || formTouched.time) &&
                                        <div className="field-error calendar-error">
                                            {errors.date || errors.time}
                                        </div>
                                    }
                                </div>
                                
                                <CalendarSelector
                                selectedDate={formData.date}
                                selectedTime={formData.time}
                                onDateSelect={(date) => {
                                    // Ensure the date is in the correct format (YYYY-MM-DD)
                                    setFormData({ ...formData, date });
                                    setFormTouched(prev => ({ ...prev, date: true }));
                                }}
                                onTimeSelect={(time) => {
                                    setFormData({ ...formData, time });
                                    setFormTouched(prev => ({ ...prev, time: true }));
                                }}
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                className={`form-submit-btn ${isSubmitting ? 'submitting' : ''}`}
                                type="submit"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="spinner"></span>
                                        Processing...
                                    </>
                                ) : (
                                    'Schedule Appointment'
                                )}
                            </button>
                        </form>
                    </div>
                </StyledWrapper>
            </div>
        </div>
    );
};

const StyledWrapper = styled.div`
    .form-container {
        width: 100%;
        background: linear-gradient(#212121, #212121) padding-box,
                    linear-gradient(145deg, transparent 35%,#ffffff, #e0e0e0) border-box;
        border: 2px solid transparent;
        padding: 32px 24px;
        font-size: 14px;
        font-family: inherit;
        color: white;
        display: flex;
        flex-direction: column;
        gap: 20px;
        box-sizing: border-box;
        border-radius: 16px;

        /* General styles for error and success messages */
        .error-message, .success-message {
            padding: 10px 15px;
            border-radius: 8px;
            margin-bottom: 15px;
            font-size: 14px;
            font-weight: 500;
            border-left: 4px solid; /* Common border style */
        }

        /* Specific styles for error messages */
        .error-message {
            background-color: rgba(255, 0, 0, 0.1);
            color: #ff6b6b;
            border-color: #ff6b6b;
        }

        /* Specific styles for success messages */
        .success-message {
            background-color: rgba(0, 128, 0, 0.1);
            color: #4CAF50;
            border-color: #4CAF50;
        }

        .field-error {
            color: #ff6b6b;
            font-size: 12px;
            margin-top: 4px;
            font-weight: 500;
        }
    }

    @media (max-width: 640px) {
        .form-container {
            padding: 24px 16px;
            gap: 16px;
        }
    }

    .form-container button:active {
        scale: 0.95;
    }

    .form-container .form {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    @media (max-width: 640px) {
        .form-container .form {
            gap: 16px;
        }
    }

    .form-container .form-group {
        display: flex;
        flex-direction: column;
        gap: 2px;
    }

    .form-container .form-group.has-error input,
    .form-container .form-group.has-error select {
        border-color: #ff6b6b;
    }

    .calendar-container {
        width: 100%;
        margin: 16px 0;
    }

    .calendar-container.has-error {
        border-radius: 8px;
    }

    .calendar-label {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
        font-weight: 600;
        font-size: 12px;
        color: #717171;
    }

    .calendar-error {
        text-align: right;
    }

    /* Keep these for backward compatibility, can be removed later */
    .date-time-container {
        display: flex;
        gap: 20px;
        width: 100%;
    }

    .date-group, .time-group {
        flex: 1;
    }

    .required {
        color: #ff6b6b;
        margin-left: 2px;
    }

    .form-container .form-group label {
        display: flex;
        align-items: center;
        margin-bottom: 5px;
        color: #717171;
        font-weight: 600;
        font-size: 12px;
    }

    .form-container .form-group.optional-field label {
        color: #555555;
    }

    .form-container .form-group label .icon {
        width: 14px;
        height: 14px;
        margin-right: 6px;
    }

    .form-container .form-group input,
    .form-container .form-group select {
        width: 100%;
        padding: 12px 16px;
        border-radius: 8px;
        color: #fff;
        font-family: inherit;
        background-color: transparent;
        border: 1px solid #414141;
        transition: border-color 0.3s ease;
    }

    .form-container .form-group select {
        appearance: none;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23717171' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: right 12px center;
        background-size: 16px;
    }

    .form-container .form-group select option {
        background-color: #212121;
        color: #fff;
    }

    .form-container .form-group input::placeholder {
        opacity: 0.5;
    }

    .form-container .form-group input:focus,
    .form-container .form-group select:focus {
        outline: none;
        border-color: #ffffff;
    }

    .form-container .form-submit-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        align-self: center;
        font-family: inherit;
        color: #212121;
        font-weight: 600;
        width: 100%;
        max-width: 300px;
        background: linear-gradient(145deg, #ffffff, #e0e0e0);
        border: none;
        padding: 12px 16px;
        font-size: inherit;
        gap: 8px;
        margin-top: 16px;
        cursor: pointer;
        border-radius: 8px;
        transition: all 0.3s ease;
    }
    
    .form-container .form-submit-btn.submitting {
        opacity: 0.7;
        cursor: not-allowed;
        transform: none;
        box-shadow: none;
    }

    .spinner {
        display: inline-block;
        width: 18px;
        height: 18px;
        border: 2px solid rgba(0,0,0,0.1);
        border-radius: 50%;
        border-top-color: #212121;
        animation: spin 1s ease-in-out infinite;
        margin-right: 8px;
    }

    @keyframes spin {
        to { transform: rotate(360deg); }
    }
    
    @media (max-width: 640px) {
        .form-container .form-submit-btn {
            max-width: 100%;
            padding: 14px 16px;
            font-size: 16px;
        }
    }

    .form-container .form-submit-btn:hover:not(:disabled) {
        opacity: 0.9;
        transform: translateY(-2px);
        box-shadow: 0 10px 25px -5px rgba(255, 255, 255, 0.4);
    }

    @media (max-width: 768px) {
        .date-time-container {
            flex-direction: column;
        }
        
        .form-container .form-group label {
            font-size: 14px;
        }
        
        .form-container .form-group input,
        .form-container .form-group select {
            padding: 14px;
            font-size: 16px;
        }
        
        .calendar-container {
            margin: 10px 0;
        }
        
        .calendar-label {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
        }
        
        .calendar-error {
            text-align: left;
        }
    }
`;

export default Book;