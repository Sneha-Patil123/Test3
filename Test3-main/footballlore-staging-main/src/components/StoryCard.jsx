import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/StoryCard.css';

export default function StoryCard({ id, title, snippet, image, mostViewed }) {
  const navigate = useNavigate();

  return (
    <div className="story-card">
      {mostViewed && <div className="most-viewed-badge">Most Viewed</div>}
      {/* <img src={image} alt={title} /> */}
      <div className="story-content">
        <h3>{title}</h3>
        <p>{snippet}</p>
        <div
          className="read-more"
          onClick={() => navigate(`/stories/${id}`)}
          tabIndex={0}
          role="button"
          aria-label={`Read more about ${title}`}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              navigate(`/stories/${id}`);
            }
          }}
        >
          Read More →
        </div>
      </div>
    </div>
  );
}