import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postCreateBoostSession } from '../api/mockApi';

const BoostButton = ({ storyId }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleBoost = async () => {
        setIsLoading(true);
        setError('');
        try {
            const response = await postCreateBoostSession({ storyId, amount: 500 });
            if (response.checkoutUrl) {
                navigate(response.checkoutUrl);
            }
        } catch (err) {
            setError("Could not initiate boost. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ backgroundColor: 'white', textAlign: 'center', border: '1px solid #ddd', padding: '1rem', borderRadius: '8px' }}>
            <h3 style={{ marginTop: 0, fontSize: '1.2rem', color: 'var(--neutral-charcoal)'}}>Boost this Story</h3>
            <p style={{fontSize: '0.9rem', color: '#666'}}>Help this tale reach more fans!</p>
            <button
                onClick={handleBoost}
                disabled={isLoading}
                className="btn btn-primary"
                style={{ width: '100%' }}
                aria-label="Boost this story for $5"
            >
                {isLoading ? 'Processing...' : 'Boost for $5'}
            </button>
            {error && <p style={{ color: '#c62828', fontSize: '0.9rem', marginTop: '0.5rem' }}>{error}</p>}
        </div>
    );
};

export default BoostButton;