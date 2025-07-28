import { useState } from "react";
import toast from "react-hot-toast";

const SponsorMatchPanel = ({ matchId }) => {
  const [partnerName, setPartnerName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSponsorship = async (event) => {
    event.preventDefault();
    if (!partnerName || !contactEmail) {
      toast.error("Please fill out both name and email.");
      return;
    }
    setIsSubmitting(true);
    const toastId = toast.loading("Processing sponsorship...");
    try {
      const response = await fetch(`http://localhost:5000/api/match-sponsor`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          matchId: matchId,
          partnerName: partnerName,
          contactEmail: contactEmail,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Sponsorship failed.");
      }
      toast.success(`Thank you, ${partnerName}, for sponsoring!`, {
        id: toastId,
      });
      setPartnerName("");
      setContactEmail("");
    } catch (error) {
      toast.error(error.message, { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg border-2 border-dashed border-gray-300 shadow-lg">
      <h4 className="font-oswald font-bold text-lg text-center text-[#2E7D32]">
        Sponsor This Match Memory
      </h4>
      <form onSubmit={handleSponsorship} className="mt-4">
        <div className="space-y-4">
          <div>
            <label
              htmlFor="partnerName"
              className="block text-sm font-medium text-gray-700 font-roboto">
              Your Name / Company
            </label>
            <input
              type="text"
              id="partnerName"
              value={partnerName}
              onChange={(e) => setPartnerName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#2E7D32] focus:border-[#2E7D32]"
              placeholder="e.g., John Smith"
              required
            />
          </div>
          <div>
            <label
              htmlFor="contactEmail"
              className="block text-sm font-medium text-gray-700 font-roboto">
              Contact Email
            </label>
            <input
              type="email"
              id="contactEmail"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#2E7D32] focus:border-[#2E7D32]"
              placeholder="you@example.com"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-6 bg-[#2E7D32] text-white font-bold py-3 px-4 rounded-xl transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed">
          {isSubmitting ? "Processing..." : "Sponsor for $1K"}
        </button>
      </form>
    </div>
  );
};

export default SponsorMatchPanel;
