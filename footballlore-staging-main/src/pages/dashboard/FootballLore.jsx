import { useEffect, useState } from "react";
import "../../components/styles/FootballLore.css"; // assume custom styling here

const API_BASE = "http://localhost:5000/api";

const FootballLore = () => {
  const [stories, setStories] = useState([]);
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    const [s1, s2] = await Promise.all([
      fetch(`${API_BASE}/story-submissions`).then((res) => res.json()),
      fetch(`${API_BASE}/match-sponsor-requests`).then((res) => res.json()),
    ]);
    setStories(s1);
    setSponsors(s2);
    setLoading(false);
  }

  async function approveStory(id) {
    await fetch(`${API_BASE}/story-submissions/${id}`, { method: "PATCH" });
    setStories((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: "approved" } : s))
    );
  }

  async function approveSponsor(id) {
    await fetch(`${API_BASE}/match-sponsor-requests/${id}`, {
      method: "PATCH",
    });
    setSponsors((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: "approved" } : s))
    );
  }

  if (loading) return <p>Loading...</p>;

  return (
    <>
      {userType === "Admin" ? (
        <>
          {" "}
          <h1 className="dashboard-heading text-3xl">
            FootballLore Admin Dashboard
          </h1>
          <div className="dashboard-container mt-10">
            <section>
              <h2>📝 Story Submissions :</h2>
              {stories.map((story) => (
                <div key={story.id} className="dashboard-card">
                  <p>
                    <strong>{story.name}</strong> — {story.date}
                  </p>
                  <p>
                    Status: <span className={story.status}>{story.status}</span>
                  </p>
                  {story.status === "pending" && (
                    <button
                      onClick={() => approveStory(story.id)}
                      className="border px-2 py-1  text-[#ffffff] mt-2 rounded-[5px] bg-green-500 font-semibold hover:bg-green-600 transition-all ease-in-out duration-200">
                      Approve
                    </button>
                  )}
                </div>
              ))}
            </section>

            <section>
              <h2 className="mt-10">🤝 Sponsor Requests :</h2>
              {sponsors.map((sponsor) => (
                <div key={sponsor.id} className="dashboard-card">
                  <p>
                    <strong>{sponsor.partner}</strong> sponsoring match{" "}
                    <em>{sponsor.matchId}</em>
                  </p>
                  <p>
                    Status:{" "}
                    <span className={sponsor.status}>{sponsor.status}</span>
                  </p>
                  {sponsor.status === "pending" && (
                    <button
                      onClick={() => approveSponsor(sponsor.id)}
                      className="border px-2 py-1 text-[#ffffff] mt-2 rounded-[5px] bg-green-500 font-semibold hover:bg-green-600 transition-all ease-in-out duration-200">
                      Approve
                    </button>
                  )}
                </div>
              ))}
            </section>
          </div>
        </>
      ) : (
        <p className="flex justify-center items-center text-center mx-2 my-20 text-[#2E7D32] font-bold text-2xl">
          You are not allowed to read or write.
        </p>
      )}
    </>
  );
};

export default FootballLore;

export let userType = "Admin";
