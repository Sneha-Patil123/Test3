import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import stories from '../assets/stories'; // ✅ fixed path
import './styles/StoryDetail.css';
import VotingWidget from '../components/VotingWidget';
import BoostButton from '../components/BoostButton';

export default function StoryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const story = stories.find((s) => s.id === id);

  if (!story) return <p>Story not found.</p>;

  // Buy Votes Handler
  const handleBuyVotes = async () => {
    try {
      const res = await fetch('http://localhost:3000/create-vote-pack-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pack: 5,
          amount: 300,
          email: 'manasc3658@gmail.com', 
        }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Could not start payment session.');
      }
    } catch (err) {
      console.error(err);
      alert('Error buying votes. Try again later.');
    }
  };

  return (
    <main className='story-details-grid'>
      <div className="story-detail container">
        <h2>{story.title}</h2>
        <p>{story.content}</p>
        <button className="back-button" onClick={() => navigate('/stories')}>
          ← Back to Stories
        </button>
      </div>

      <div className='votes-section'>
        <div className="community-votes">
          <VotingWidget storyId={story.id} userEmail={'p@gmail.com'} />
        </div>

        {/*  New Buy Votes Button */}
        <div style={{ marginTop: '1rem' }}>
          <button
            onClick={handleBuyVotes}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Buy 5 Votes ($3)
          </button>
        </div>

        <div className="boost-button">
          <BoostButton storyId={story.id} />
        </div>
      </div>
    </main>
  );
}
