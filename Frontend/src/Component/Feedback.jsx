import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

function Feedback() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [errors, setErrors] = useState({});

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    if (value.trim()) setErrors((prev) => ({ ...prev, name: '' }));
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (value.trim() && emailRegex.test(value)) setErrors((prev) => ({ ...prev, email: '' }));
  };

  const handleFeedbackChange = (e) => {
    const value = e.target.value;
    setFeedback(value);
    if (value.trim() && value.length >= 10) setErrors((prev) => ({ ...prev, feedback: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!emailRegex.test(email)) newErrors.email = 'Invalid email format';
    if (!feedback.trim()) newErrors.feedback = 'Feedback is required';
    else if (feedback.length < 10) newErrors.feedback = 'Feedback must be at least 10 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
  
    axios
      .post('http://localhost:3001/createUser', { name, email, feedback })
      .then((result) => {
        console.log(result);
        alert('Feedback submitted successfully! Thank you');
        setName('');
        setEmail('');
        setFeedback('');
        setErrors({});
      })
      .catch((err) => {
        if (err.response && err.response.status === 409) {
          // Email already exists
          setErrors((prev) => ({
            ...prev,
            email: 'This email has already been used',
          }));
        } else {
          console.log(err);
        }
      });
  };
  

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 animate-gradient  bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 bg-size-200" />

      {/* Blurry floating blobs */}
      <div className="absolute w-[600px] h-[600px] animate-ping bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob top-[-10%] left-[10%]"></div>
      <div className="absolute w-[600px] h-[600px] animate-ping bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000 top-[30%] left-[50%]"></div>
      <div className="absolute w-[600px] h-[600px] animate-ping bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000 top-[60%] left-[20%]"></div>

      <motion.form
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-xl z-10 border border-white/30"
      >
        <h2 className="text-3xl font-bold text-indigo-600 text-center mb-6 tracking-wide animate-bounce ">Give Feedback</h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="Enter your name"
            className={`w-full px-4 py-2 hover:scale-110 duration-200 hover:bg-gray-500 rounded-xl border ${
              errors.name ? 'border-red-400' : 'border-gray-300'
            } focus:ring-2 focus:ring-indigo-300 focus:outline-none`}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">Email</label>
          <input
            id=""
            type=""
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
            className={`w-full px-4 hover:scale-110 duration-200 hover:bg-gray-500 py-2 rounded-xl border ${
              errors.email ? 'border-red-400' : 'border-gray-300'
            } focus:ring-2 focus:ring-indigo-300 focus:outline-none`}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="feedback">Feedback</label>
          <textarea
            id="feedback"
            rows="4"
            value={feedback}
            onChange={handleFeedbackChange}
            placeholder="Write your feedback..."
            className={`w-full px-4 hover:scale-110 duration-200 hover:bg-gray-500 py-2 rounded-xl border ${
              errors.feedback ? 'border-red-400' : 'border-gray-300'
            } focus:ring-2 focus:ring-indigo-300 focus:outline-none`}
          ></textarea>
          {errors.feedback && <p className="text-red-500 text-sm mt-1">{errors.feedback}</p>}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-xl font-semibold hover:bg-indigo-700 transition-all duration-300 shadow-md"
        >
          Submit
        </motion.button>
      </motion.form>
    </div>
  );
}

export default Feedback;
