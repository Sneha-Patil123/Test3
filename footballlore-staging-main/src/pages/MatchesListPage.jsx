import { Link as RouterLink } from "react-router-dom"; // Renamed to avoid conflict
import { mockMatches } from "../data/matches";

const MatchesListPage = () => {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="text-center mb-10">
        <h1 className="font-oswald text-4xl font-bold text-[#2E7D32]">
          Sponsor a Match Memory
        </h1>
        <p className="font-roboto text-lg text-gray-600 mt-2 max-w-3xl mx-auto">
          Browse our archive of classic matches. Your sponsorship helps preserve
          these iconic moments in football history for future generations of
          fans.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockMatches.map((match) => (
          <RouterLink
            to={`/matches/${match.id}`}
            key={match.id}
            className="group block">
            <div className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-[#2E7D32] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <p className="font-roboto text-sm text-gray-500 mb-1">
                {match.date}
              </p>
              <h2 className="font-oswald font-bold text-2xl text-[#2E7D32] group-hover:underline">
                {match.name}
              </h2>
              <p className="font-roboto text-gray-700 my-3">
                {match.description}
              </p>
              <span className="font-roboto text-sm font-bold text-[#2E7D32] group-hover:text-black">
                View & Sponsor →
              </span>
            </div>
          </RouterLink>
        ))}
      </div>
    </div>
  );
};

export default MatchesListPage;
