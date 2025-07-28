"use client";

import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Stories from "./pages/Stories";
import StoryDetail from "./pages/StoryDetail";
import BoostStatus from "./pages/BoostStatus";
import SubmitStory from "./pages/SubmitStory";
import ProDashboard from "./pages/ProDashboard";
import Events from "./pages/Events";
import { UserProvider } from "./context/UserContext";
import FootballLore from "./pages/dashboard/FootballLore";
import MatchDetailPage from "./pages/MatchDetailPage";
import { Toaster } from "react-hot-toast";
import MatchesListPage from "./pages/MatchesListPage";

function App() {
  // Demo user setup for preview
  useEffect(() => {
    const demoUser = {
      email: "demo@footballlore.com",
      voteCredits: 3,
      isPro: false,
    };
    // Set demo user in localStorage for preview
    localStorage.setItem("footballlore_user", JSON.stringify(demoUser));
  }, []);

  return (
    <UserProvider>
      <div className="min-h-screen bg-gray-50 pitch-lines">
        <Toaster />
        <Header />
        <main className="pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stories" element={<Stories />} />
            <Route path="dashboard/footballlore" element={<FootballLore />} />
            <Route path="/stories/:id" element={<StoryDetail />} />
            <Route path="/matches" element={<MatchesListPage />} />
            <Route path="/matches/:matchId" element={<MatchDetailPage />} />
            <Route path="/boost-status" element={<BoostStatus />} />
            <Route path="/submit-story" element={<SubmitStory />} />
            <Route path="/pro-dashboard" element={<ProDashboard />} />
            <Route path="/events" element={<Events />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </UserProvider>
  );
}

export default App;
