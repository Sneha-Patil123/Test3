import { useEffect, useState } from "react";
import "./styles/carousel.css";
const FeaturedCarousel = () => {
  const [stories, setStories] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch("http://localhost:5000/api/featured-stories")
      .then((res) => res.json())
      .then((data) => setStories(data))
      .catch((err) => console.error("Failed to load stories", err));
  }, []);

  const nextStory = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % stories.length);
  };

  const prevStory = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + stories.length) % stories.length
    );
  };

  if (stories.length === 0)
    return (
      <>
        <div className="carousel-container">
          <button className="nav-btn" onClick={prevStory}>
            ←
          </button>

          <div className="story-card slide-in">
            <h2 className="story-title"></h2>
            <p className="story-snippet">Connecting to api...</p>
            <p className="story-author"></p>
          </div>

          <button className="nav-btn" onClick={nextStory}>
            →
          </button>
        </div>
      </>
    );

  const story = stories[currentIndex];

  return (
    <div className="carousel-container">
      <button className="nav-btn" onClick={prevStory}>
        ←
      </button>

      <div className="story-card slide-in">
        <h2 className="story-title">{story.title}</h2>
        <p className="story-snippet">{story.snippet}</p>
        <p className="story-author">— {story.author}</p>
      </div>

      <button className="nav-btn" onClick={nextStory}>
        →
      </button>
    </div>
  );
};

export default FeaturedCarousel;
