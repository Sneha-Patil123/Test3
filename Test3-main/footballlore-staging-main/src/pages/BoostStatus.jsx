import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import "./styles/BoostStatus.css"

// This is a custom hook to make reading URL query parameters easier.
// It's a clean and reusable pattern.
function useQuery() {
    // useLocation() gives us information about the current URL.
    const { search } = useLocation();
    // React.useMemo ensures this parsing logic only runs when the URL search string changes.
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

const BoostStatusPage = () => {
    const query = useQuery();

    // Read the parameters we put in the URL in our mock API
    const storyId = query.get('storyId');
    const isSuccess = query.get('success') === 'true'; // Convert string 'true' to boolean true

    return (
        <div className='boost-box' style={{ textAlign: 'center' }}>
            {isSuccess ? (
                // SUCCESS UI
                <div style={{ border: '2px solid #2E7D32', padding: '2rem', borderRadius: '8px' }}>
                    <h2 style={{ color: '#2E7D32' }}>✅ Boost Successful!</h2>
                    <p>
                        Thank you for your support! Your story, "{storyId}", has been boosted 
                        and will now have extra visibility in the community.
                    </p>
                    <Link to={`/stories/${storyId}`} className="btn btn-primary">
                        Return to Story
                    </Link>
                </div>
            ) : (
                // ERROR UI
                <div style={{ border: '2px solid #c62828', padding: '2rem', borderRadius: '8px' }}>
                    <h2 style={{ color: '#c62828' }}>❌ Payment Failed</h2>
                    <p>
                        Unfortunately, there was an issue processing your payment for story "{storyId}".
                        No charges were made. Please try again.
                    </p>
                    <Link to={`/stories/${storyId}`} className="btn btn-ghost">
                        Return and Try Again
                    </Link>
                </div>
            )}
        </div>
    );
};

export default BoostStatusPage;