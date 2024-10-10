/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, ChangeEvent, FormEvent } from 'react';
import uploadImageToCloudinary from '@/utils/uploadImageToCloudinary';
import { useAppDispatch } from '@/redux/hooks';
import { useSignUpMutation } from '@/redux/features/auth/authApi';
import { verifyToken } from '@/utils/jwt';
import { setUser } from '@/redux/features/auth/authSlice';
import { useRouter } from 'next/navigation';
import './signup.css';

// Define the shape of the form data
interface FormData {
  name: string;
  email: string;
  password: string;
  mobileNumber: string;
  role: string;
  profilePhoto: string;
}

const SignupPage: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [signup, { isLoading }] = useSignUpMutation();

  // Initialize state
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    mobileNumber: '',
    role: 'USER',
    profilePhoto: '',
  });

  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      let imageUrl = '';

      // Upload image if a file is selected
      if (imageFile) {
        imageUrl = await uploadImageToCloudinary(imageFile);
      }

      const dataToSubmit = { ...formData, profilePhoto: imageUrl };

      const response = await signup(dataToSubmit).unwrap();
      const user = verifyToken(response.data.accessToken);

      dispatch(setUser({ user: user, token: response.data.accessToken }));
      router.push("/");

      setSuccess('User registered successfully!');
      setError('');
      setImageFile(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">Signup</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label htmlFor="mobileNumber">Mobile Number:</label>
          <input
            type="text"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label htmlFor="profilePhoto">Profile Photo:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="input-file"
          />
        </div>
        <button type="submit" className="submit-button" disabled={isLoading}>
          {isLoading ? 'Signing up...' : 'Signup'}
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
    </div>
  );
};

export default SignupPage;
