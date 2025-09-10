// frontend/src/pages/SignUp.tsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { post } from '../api/client';

interface SignUpFormData {
  full_name: string;
  dob: string;
  gender: string;
  email: string;
  phone: string;
  password: string;
  confirm: string;
}

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SignUpFormData>({
    full_name: '',
    dob: '',
    gender: '',
    email: '',
    phone: '',
    password: '',
    confirm: ''
  });
  const [errors, setErrors] = useState<Partial<SignUpFormData>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name as keyof SignUpFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<SignUpFormData> = {};

    // Full name validation
    if (!formData.full_name.trim()) {
      newErrors.full_name = 'Full name is required';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Confirm password validation
    if (!formData.confirm) {
      newErrors.confirm = 'Please confirm your password';
    } else if (formData.password !== formData.confirm) {
      newErrors.confirm = 'Passwords do not match';
    }

    // Date validation (optional but if provided, should be valid)
    if (formData.dob) {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$|^\d{2}\/\d{2}\/\d{4}$/;
      if (!dateRegex.test(formData.dob)) {
        newErrors.dob = 'Date must be in yyyy-mm-dd or dd/mm/yyyy format';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Prepare data for API (exclude confirm field)
      const { confirm, ...apiData } = formData;
      
      await post('/auth/signup.php', apiData);
      
      // Show success message (simple alert for now)
      alert('Account created successfully! Please login to continue.');
      
      // Navigate to login page
      navigate('/login');
      
    } catch (error: any) {
      console.error('Signup error:', error);
      
      // Handle API errors
      if (error.status === 409) {
        setErrors({ email: 'Email already exists' });
      } else if (error.status === 400 && error.data?.details) {
        // Handle validation errors from server
        const serverErrors: Partial<SignUpFormData> = {};
        error.data.details.forEach((detail: string) => {
          if (detail.includes('email')) serverErrors.email = detail;
          if (detail.includes('password')) serverErrors.password = detail;
          if (detail.includes('name')) serverErrors.full_name = detail;
          if (detail.includes('date')) serverErrors.dob = detail;
        });
        setErrors(serverErrors);
      } else {
        alert('Registration failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Header Start */}
      <div className="container-fluid bg-breadcrumb">
        <div className="container text-center py-5" style={{ maxWidth: "900px" }}>
          <h4 className="text-white display-4 mb-4 wow fadeInDown" data-wow-delay="0.1s">Sign Up</h4>
          <ol className="breadcrumb d-flex justify-content-center mb-0 wow fadeInDown" data-wow-delay="0.3s">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item active text-primary">Sign Up</li>
          </ol>    
        </div>
      </div>
      {/* Header End */}

      {/* Sign Up Form Start */}
      <div className="container-fluid py-5">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-xl-6">
              <div className="bg-white rounded p-5 shadow">
                <div className="text-center mb-5">
                  <h2 className="text-primary mb-4">Create Your Account</h2>
                  <p className="text-muted">Join WaterLand Park and start your adventure!</p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="row g-4">
                    {/* Full Name */}
                    <div className="col-12">
                      <label htmlFor="full_name" className="form-label">Full Name *</label>
                      <input
                        type="text"
                        className={`form-control ${errors.full_name ? 'is-invalid' : ''}`}
                        id="full_name"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                      />
                      {errors.full_name && <div className="invalid-feedback">{errors.full_name}</div>}
                    </div>

                    {/* Date of Birth */}
                    <div className="col-md-6">
                      <label htmlFor="dob" className="form-label">Date of Birth</label>
                      <input
                        type="text"
                        className={`form-control ${errors.dob ? 'is-invalid' : ''}`}
                        id="dob"
                        name="dob"
                        value={formData.dob}
                        onChange={handleInputChange}
                        placeholder="yyyy-mm-dd or dd/mm/yyyy"
                      />
                      {errors.dob && <div className="invalid-feedback">{errors.dob}</div>}
                    </div>

                    {/* Gender */}
                    <div className="col-md-6">
                      <label htmlFor="gender" className="form-label">Gender</label>
                      <select
                        className="form-select"
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    {/* Email */}
                    <div className="col-md-6">
                      <label htmlFor="email" className="form-label">Email *</label>
                      <input
                        type="email"
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                      />
                      {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>

                    {/* Phone */}
                    <div className="col-md-6">
                      <label htmlFor="phone" className="form-label">Phone</label>
                      <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter your phone number"
                      />
                    </div>

                    {/* Password */}
                    <div className="col-md-6">
                      <label htmlFor="password" className="form-label">Password *</label>
                      <input
                        type="password"
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Enter your password"
                      />
                      {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                    </div>

                    {/* Confirm Password */}
                    <div className="col-md-6">
                      <label htmlFor="confirm" className="form-label">Confirm Password *</label>
                      <input
                        type="password"
                        className={`form-control ${errors.confirm ? 'is-invalid' : ''}`}
                        id="confirm"
                        name="confirm"
                        value={formData.confirm}
                        onChange={handleInputChange}
                        placeholder="Confirm your password"
                      />
                      {errors.confirm && <div className="invalid-feedback">{errors.confirm}</div>}
                    </div>

                    {/* Submit Button */}
                    <div className="col-12">
                      <button
                        type="submit"
                        className="btn btn-primary w-100 py-3 px-5"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Creating Account...
                          </>
                        ) : (
                          'Create Account'
                        )}
                      </button>
                    </div>

                    {/* Login Link */}
                    <div className="col-12 text-center">
                      <p className="mb-0">
                        Already have an account?{' '}
                        <Link to="/login" className="text-primary fw-bold">
                          Sign In
                        </Link>
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Sign Up Form End */}

      {/* Back to Top */}
      <a href="#" className="btn btn-primary btn-lg-square rounded-circle back-to-top">
        <i className="fa fa-arrow-up"></i>
      </a>
    </>
  );
}
