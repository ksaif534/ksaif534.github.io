import React, { useState } from 'react';
import { Star, Send, TrendingUp, MessageSquare, Mail } from 'lucide-react';

// Simple Router Component
const Router = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [businessId, setBusinessId] = useState('');

  const navigate = (page, id = '') => {
    setCurrentPage(page);
    if (id) setBusinessId(id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {currentPage === 'home' && <HomePage navigate={navigate} />}
      {currentPage === 'signup' && <SignupPage navigate={navigate} />}
      {currentPage === 'feedback' && <FeedbackForm navigate={navigate} businessId={businessId} />}
      {currentPage === 'dashboard' && <Dashboard navigate={navigate} businessId={businessId} />}
    </div>
  );
};

// Home Page
const HomePage = ({ navigate }) => {
  return (
    <div className="container mx-auto px-4 py-16">
      <nav className="flex justify-between items-center mb-16">
        <h1 className="text-2xl font-bold text-indigo-600">FeedbackFlow</h1>
        <button
          onClick={() => navigate('signup')}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Get Started
        </button>
      </nav>

      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-5xl font-bold text-gray-900 mb-6">
          Collect Customer Feedback at Scale
        </h2>
        <p className="text-xl text-gray-600 mb-12">
          Simple, powerful feedback collection system for businesses of all sizes
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <MessageSquare className="w-12 h-12 text-indigo-600 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Easy Collection</h3>
            <p className="text-gray-600">Simple forms your customers will love</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <TrendingUp className="w-12 h-12 text-indigo-600 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Smart Alerts</h3>
            <p className="text-gray-600">Get notified of low ratings instantly</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <Mail className="w-12 h-12 text-indigo-600 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Auto Reviews</h3>
            <p className="text-gray-600">Request reviews from happy customers</p>
          </div>
        </div>

        <div className="mt-16">
          <button
            onClick={() => navigate('signup')}
            className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition"
          >
            Start Collecting Feedback
          </button>
        </div>

        <div className="mt-12 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-gray-700 mb-2">Try Demo:</p>
          <button
            onClick={() => navigate('feedback', 'demo-business-123')}
            className="text-indigo-600 hover:underline mr-4"
          >
            View Sample Feedback Form
          </button>
          <button
            onClick={() => navigate('dashboard', 'demo-business-123')}
            className="text-indigo-600 hover:underline"
          >
            View Sample Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

// Business Signup Page
const SignupPage = ({ navigate }) => {
  const [formData, setFormData] = useState({
    businessName: '',
    email: '',
    notificationEmail: '',
    reviewLink: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    if (!formData.businessName || !formData.email) {
      setMessage('Error: Please fill in required fields');
      return;
    }

    setLoading(true);
    setMessage('');

    const proxyUrl = 'https://round-poetry-849f.kamal-saifkamal534.workers.dev';

    try {
      const response = await fetch(proxyUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'signup',
          businessName: formData.businessName,
          email: formData.email,
          notificationEmail: formData.notificationEmail,
          reviewLink: formData.reviewLink,
          timestamp: new Date().toISOString()
        })
      });

      const data = await response.json();
      setMessage('Success! Check your email for your unique feedback form link.');
      
      setTimeout(() => {
        navigate('dashboard', data.business_id || 'new-business-id');
      }, 2000);
    } catch (error) {
      setMessage('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <button
        onClick={() => navigate('home')}
        className="text-indigo-600 hover:underline mb-8"
      >
        ← Back to Home
      </button>

      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Create Your Account</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Business Name *
            </label>
            <input
              type="text"
              value={formData.businessName}
              onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Acme Corp"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="you@business.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notification Email (for alerts)
            </label>
            <input
              type="email"
              value={formData.notificationEmail}
              onChange={(e) => setFormData({ ...formData, notificationEmail: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Same as above if empty"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Review Link (Google, Trustpilot, etc.)
            </label>
            <input
              type="url"
              value={formData.reviewLink}
              onChange={(e) => setFormData({ ...formData, reviewLink: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="https://g.page/your-business/review"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:bg-gray-400"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </div>

        {message && (
          <div className={`mt-4 p-3 rounded-lg ${message.includes('Error') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

// Public Feedback Form
const FeedbackForm = ({ navigate, businessId }) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) {
      alert('Please select a rating');
      return;
    }

    setLoading(true);

    const proxyUrl = 'https://round-poetry-849f.kamal-saifkamal534.workers.dev';

    try {
      await fetch(proxyUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'submit_feedback',
          business_id: businessId,
          rating: rating,
          comment: comment,
          customer_email: customerEmail,
          timestamp: new Date().toISOString()
        })
      });

      setSubmitted(true);
    } catch (error) {
      alert('Error submitting feedback. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Send className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h2>
          <p className="text-gray-600 mb-6">Your feedback has been submitted successfully.</p>
          <button
            onClick={() => navigate('home')}
            className="text-indigo-600 hover:underline"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <button
        onClick={() => navigate('home')}
        className="text-indigo-600 hover:underline mb-8"
      >
        ← Back to Home
      </button>

      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Share Your Feedback</h2>
        <p className="text-gray-600 mb-6">We'd love to hear about your experience</p>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              How would you rate your experience? *
            </label>
            <div className="flex justify-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`w-12 h-12 transition ${
                      star <= (hoveredRating || rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-center text-sm text-gray-600 mt-2">
                {rating === 5 ? 'Excellent!' : rating === 4 ? 'Great!' : rating === 3 ? 'Good' : rating === 2 ? 'Fair' : 'Poor'}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tell us more (optional)
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="What did you like or what could we improve?"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Email (optional)
            </label>
            <input
              type="email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="your@email.com"
            />
            <p className="text-xs text-gray-500 mt-1">
              We may reach out to you about your feedback
            </p>
          </div>

          <button
            onClick={handleSubmit}
            disabled={rating === 0 || loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:bg-gray-400"
          >
            {loading ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </div>

        <p className="text-xs text-gray-500 text-center mt-4">
          Business ID: {businessId}
        </p>
      </div>
    </div>
  );
};

// Dashboard
const Dashboard = ({ navigate, businessId }) => {
  const [feedbackData] = useState([
    { id: 1, rating: 5, comment: 'Excellent service!', email: 'john@example.com', date: '2025-10-03' },
    { id: 2, rating: 4, comment: 'Very good overall', email: 'sarah@example.com', date: '2025-10-02' },
    { id: 3, rating: 2, comment: 'Could be better', email: 'mike@example.com', date: '2025-10-01' },
    { id: 4, rating: 5, comment: 'Amazing!', email: '', date: '2025-09-30' },
  ]);

  const avgRating = (feedbackData.reduce((sum, f) => sum + f.rating, 0) / feedbackData.length).toFixed(1);
  const totalFeedback = feedbackData.length;

  return (
    <div className="container mx-auto px-4 py-16">
      <button
        onClick={() => navigate('home')}
        className="text-indigo-600 hover:underline mb-8"
      >
        ← Back to Home
      </button>

      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Your Dashboard</h2>
            <p className="text-gray-600">Business ID: {businessId}</p>
          </div>
          <button
            onClick={() => navigate('feedback', businessId)}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            View Feedback Form
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Average Rating</p>
                <p className="text-3xl font-bold text-gray-900">{avgRating}</p>
              </div>
              <Star className="w-12 h-12 text-yellow-400 fill-yellow-400" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Feedback</p>
                <p className="text-3xl font-bold text-gray-900">{totalFeedback}</p>
              </div>
              <MessageSquare className="w-12 h-12 text-indigo-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Response Rate</p>
                <p className="text-3xl font-bold text-gray-900">67%</p>
              </div>
              <TrendingUp className="w-12 h-12 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Feedback</h3>
          <div className="space-y-4">
            {feedbackData.map((feedback) => (
              <div key={feedback.id} className="border-b border-gray-200 pb-4 last:border-0">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center space-x-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < feedback.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">{feedback.date}</span>
                </div>
                <p className="text-gray-700 mb-1">{feedback.comment}</p>
                {feedback.email && (
                  <p className="text-sm text-gray-500">{feedback.email}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-2">Your Feedback Form URL:</h4>
          <code className="text-sm text-indigo-600 bg-white px-3 py-1 rounded">
            https://yourapp.com/feedback/{businessId}
          </code>
          <p className="text-sm text-gray-600 mt-2">
            Share this link with your customers to collect feedback
          </p>
        </div>
      </div>
    </div>
  );
};

export default Router;