const mockDatabase = {
    stories: {
        "story-123": { votes: 150, boosted: false }, // This story starts as not boosted
        "story-456": { votes: 88, boosted: true },   // This story is already boosted
    },
    userVotes: {} // e.g., { "user@email.com-story-123": true }
};

const networkDelay = (ms) => new Promise(res => setTimeout(res, ms));

export const postStorySubmit = async (formData) => {
    await networkDelay(500);
    console.log("Mock API: Submitting story", formData);

    if (Math.random() < 0.1) {
        throw new Error("Network Error: Failed to submit story.");
    }
    return { success: true, message: "Story submitted!" };
};

export const getStoryVotes = async (storyId) => {
    await networkDelay(300);
    // Use optional chaining `?.` in case the storyId doesn't exist, preventing an error
    const votes = mockDatabase.stories[storyId]?.votes || 0;
    console.log(`Mock API: Fetched ${votes} votes for ${storyId}`);
    return { votes };
};

// POST /api/story-vote
export const postStoryVote = async ({ storyId, email }) => {
    await networkDelay(400);
    const voteKey = `${email}-${storyId}`;

    if (mockDatabase.userVotes[voteKey]) {
        // User has already voted, throw an error to be caught by the component
        throw new Error("You have already voted for this tale.");
    }
    
    // Check if the story exists before trying to increment votes
    if (mockDatabase.stories[storyId]) {
        mockDatabase.stories[storyId].votes++;
        mockDatabase.userVotes[voteKey] = true;
        console.log(`Mock API: Vote successful for ${storyId} by ${email}. New count: ${mockDatabase.stories[storyId].votes}`);
        return { success: true };
    } else {
        throw new Error("Story not found.");
    }
};


// == MODULE C API ==
// POST /api/create-boost-session
export const postCreateBoostSession = async ({ storyId, amount }) => {
    await networkDelay(600);
    console.log(`Mock API: Creating boost session for ${storyId} with amount ${amount}`);
    
    // In a real app, this would be a call to the Stripe API which returns a session.
    // We simulate this by creating the return URL our front-end will be redirected to.
    
    // We'll add a 10% chance of payment failure for testing the error UI.
    const paymentSuccess = Math.random() > 0.1;

    // The redirect URL contains query parameters that our BoostStatusPage will read.
    const redirectUrl = `/boost-status?storyId=${storyId}&email=fake-user@email.com&success=${paymentSuccess}`;
    
    // Simulate updating the database *if* the payment was successful
    if (paymentSuccess && mockDatabase.stories[storyId]) {
        mockDatabase.stories[storyId].boosted = true;
        console.log(`Mock API: Story ${storyId} has been boosted.`);
    }

    // This is what our frontend will receive.
    return { checkoutUrl: redirectUrl };
};

// GET /api/boost-status?storyId={id}&email={email}
export const getBoostStatus = async ({ storyId }) => {
    await networkDelay(200);
    const boosted = mockDatabase.stories[storyId]?.boosted || false;
    console.log(`Mock API: Boost status for ${storyId} is ${boosted}`);
    return { boosted };
};

let raffleTickets = 42; // Initial ticket count

export const postRaffleEntry = async (userEmail) => {
    await networkDelay(400);
    // Simulate a 20% chance of failure
    if (Math.random() < 0.2) {
        throw new Error('Failed to enter the raffle. Please try again.');
    }
    raffleTickets++;
    return { success: true, tickets: raffleTickets };
};

export const getRaffleTickets = async () => {
    await networkDelay(200);
    return { tickets: raffleTickets };
};