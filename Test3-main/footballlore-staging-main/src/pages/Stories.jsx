import React from 'react';
import StoryCard from '../components/StoryCard';
import stories from '../assets/stories';
import './styles/Stories.css';

export default function StoryGrid() {
  return (
    <section id="stories" className="story-grid container">
      {stories.map((story, i) => (
        <StoryCard
          key={story.id}
          id={story.id}
          title={story.title}
          snippet={story.snippet}
          image={story.image}
          mostViewed={i === 0} // Mark the first story as "Most Viewed"
        />
      ))}
    </section>
  );
}