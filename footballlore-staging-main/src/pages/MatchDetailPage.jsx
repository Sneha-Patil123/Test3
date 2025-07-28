import { useParams } from "react-router-dom";
import SponsorMatchPanel from "../components/SponsorMatchDetail";
import { mockMatches } from "../data/matches";

const MatchDetailPage = () => {
  const { matchId } = useParams();
  // In a real app, you would fetch match details based on the ID
  const match = mockMatches.find((m) => m.id === matchId) || {
    name: "Match not found",
    description: "",
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="font-oswald text-4xl font-bold text-gray-800">
            {match.name}
          </h1>
          <p className="font-roboto text-lg text-gray-600 mt-4">
            {match.description}
          </p>
          {/* You could display more detailed match info here */}
        </div>
        <div className="lg:col-span-1">
          <SponsorMatchPanel matchId={matchId} />
        </div>
      </div>
    </div>
  );
};

export default MatchDetailPage;
