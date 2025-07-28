import React, { useState } from 'react';
import './styles/SubmitStory.css';
import { Star } from 'lucide-react';

const SubmitStory = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    title: '',
    story: '',
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [voteCount, setVoteCount] = useState(0);

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Stripe Checkout for Priority Story
  const handleBoost = async () => {
    if (!formData.title || !formData.email) {
      setError('Please enter Title and Email before purchasing.');
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/create-priority-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          email: formData.email,
          amount: 500, // $5
        }),
      });

      const result = await res.json();
      if (result.url) {
        window.location.href = result.url; // Stripe Checkout
      } else {
        setError('Failed to start payment.');
      }
    } catch (err) {
      setError('Payment error. Try again later.');
    }
  };

  // Handle story submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const nameRegex = /^[A-Za-z\s]+$/;

    if (!formData.name || !formData.email || !formData.title || !formData.story) {
      setError('Please fill out all fields.');
      return;
    }

    if (!nameRegex.test(formData.name)) {
      setError('Name can only contain letters and spaces.');
      return;
    }

    try {
      const res = await fetch('/api/submit-story', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (result.success) {
        setSuccess(true);
        setError('');
        setFormData({ name: '', email: '', title: '', story: '' });
        setVoteCount(0);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please try again later.');
    }
  };

  return (
    <div className="form-container">
      <h2>Submit Your Story</h2>

      <p className="vote-count-display">🔥 Boosted Votes: {voteCount}</p>

      <form onSubmit={handleSubmit} noValidate>
        <label>Name</label>
        <input
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          required
          aria-label="Name"
        />

        <label>Email</label>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          aria-label="Email"
        />

        <label>Story Title</label>
        <input
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          required
          aria-label="Story Title"
        />

        <label>Your Story</label>
        <textarea
          name="story"
          value={formData.story}
          onChange={handleChange}
          required
          aria-label="Your Story"
        />

        {/* Priority Purchase Section */}
        <div className="mt-6 mb-6 p-4 border-2 border-football-yellow rounded-lg bg-yellow-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Star className="h-6 w-6 text-football-yellow" />
              <div>
                <h3 className="font-semibold text-charcoal">Make Priority Story ($5)</h3>
                <p className="text-sm text-gray-600">Get featured placement and more visibility</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={handleBoost}
                className="bg-football-yellow text-charcoal px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition-colors disabled:opacity-50"
              >
                Purchase Priority
              </button>
            </div>
          </div>
        </div>

        <button type="submit" className="btn-primary">Publish Story</button>
      </form>

      {success && (
        <div className="success-message">✅ Thank you for your submission!</div>
      )}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default SubmitStory;
