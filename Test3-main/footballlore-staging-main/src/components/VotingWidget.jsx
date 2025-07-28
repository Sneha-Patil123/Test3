import React, { useState, useEffect } from 'react';
import { getStoryVotes, postStoryVote } from '../api/mockApi';
import './styles/VotingWidget.css';

const VotingWidget = ({ storyId, userEmail }) => {
    const [votes, setVotes] = useState(0);
    const [isVoted, setIsVoted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const handleBoost = () => {
        const boostAmount = 10;
        setVotes(prev => prev + boostAmount);
    };

    const fetchVoteCount = async () => {
        try {
            setError('');
            const response = await getStoryVotes(storyId);
            setVotes(response.votes);
        } catch (err) {
            setError('Could not load votes.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchVoteCount();
    }, [storyId]);

    const handleVote = async () => {
        setIsLoading(true);
        setError('');
        try {
            await postStoryVote({ storyId, email: userEmail });
            setIsVoted(true);
            fetchVoteCount();
        } catch (err) {
            setError('Vote failed. You may have already voted.');
            setIsLoading(false);
        }
    };

    return (
        <div className="voting-widget-container">
            <h3 className="widget-title">Community Votes</h3>
            <div className="vote-count" aria-live="polite" aria-label={`Current vote count is ${votes}`}>
                {isLoading && votes === 0 ? '...' : votes}
            </div>
            <button
                onClick={handleVote}
                disabled={isLoading || isVoted}
                className="btn btn-ghost"
                aria-label={isVoted ? 'You have voted for this tale' : 'Vote for this tale'}
            >
                {isVoted ? 'Voted!' : 'Vote for This Tale'}
            </button>
            <button
                onClick={handleBoost}
                className="btn btn-secondary"
                style={{ marginTop: '10px' }}
                aria-label="Simulate a boost (test only)"
            >
                💸 Simulate Boost
            </button>
            {error && <p className="widget-error">{error}</p>}
        </div>
    );
};

export default VotingWidget;