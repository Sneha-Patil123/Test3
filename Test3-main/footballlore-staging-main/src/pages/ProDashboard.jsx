"use client"

import { useState, useEffect } from "react"
import { useUser } from "../context/UserContext"
import { Crown, TrendingUp, Star, Calendar, CreditCard, BarChart3 } from "lucide-react"

const ProDashboard = () => {
  const { user, isPro, updateProStatus } = useUser()
  const [proMetrics, setProMetrics] = useState(null)
  const [isStartingTrial, setIsStartingTrial] = useState(false)
  const [isSubscribing, setIsSubscribing] = useState(false)

  useEffect(() => {
    fetch("/api/user-status")
      .then(res => res.json())
      .then(data => updateProStatus(data.isPro))

    fetch("/api/pro-metrics")
      .then(res => res.json())
      .then(data => setProMetrics(data))
  }, [])

  const handleStartTrial = async () => {
    setIsStartingTrial(true)

    try {
      const response = await fetch("/api/pro-trial", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user?.email || "user@example.com",
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setTimeout(() => {
          updateProStatus(true)
          setIsStartingTrial(false)
          alert(`Trial started! Your trial ends on ${new Date(data.trialEnds).toLocaleDateString()}`)
        }, 2000)
      }
    } catch (error) {
      setIsStartingTrial(false)
    }
  }

  const handleSubscribe = async () => {
    setIsSubscribing(true)

    try {
      const response = await fetch("/api/create-subscription-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId: "footballpro_monthly",
          email: user?.email || "user@example.com",
        }),
      })

      if (response.ok) {
        const data = await response.json()
        window.location.href = data.url
      }
    } catch (error) {
      setIsSubscribing(false)
    }
  }

  if (!isPro) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <Crown className="h-16 w-16 text-football-yellow mx-auto mb-4" />
          <h1 className="text-4xl font-headline font-bold text-charcoal mb-4">FootballPro Membership</h1>
          <p className="text-lg font-body text-gray-600">
            Unlock premium features and take your storytelling to the next level
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="story-card">
            <h3 className="text-2xl font-headline font-bold text-charcoal mb-4">Free Trial</h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center space-x-3">
                <Star className="h-5 w-5 text-football-green" />
                <span>7 days free access</span>
              </li>
              <li className="flex items-center space-x-3">
                <Star className="h-5 w-5 text-football-green" />
                <span>Unlimited priority submissions</span>
              </li>
              <li className="flex items-center space-x-3">
                <Star className="h-5 w-5 text-football-green" />
                <span>10 free vote credits</span>
              </li>
              <li className="flex items-center space-x-3">
                <Star className="h-5 w-5 text-football-green" />
                <span>Access to Top Tales analytics</span>
              </li>
            </ul>
            <button
              onClick={handleStartTrial}
              disabled={isStartingTrial}
              className="w-full btn-ghost disabled:opacity-50"
            >
              {isStartingTrial ? "Starting Trial..." : "Start Free Trial"}
            </button>
          </div>

          <div className="story-card border-2 border-football-green">
            <div className="flex items-center space-x-2 mb-4">
              <Crown className="h-6 w-6 text-football-yellow" />
              <h3 className="text-2xl font-headline font-bold text-charcoal">FootballPro</h3>
            </div>
            <div className="text-3xl font-headline font-bold text-football-green mb-2">
              $10<span className="text-lg text-gray-600">/month</span>
            </div>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center space-x-3">
                <Star className="h-5 w-5 text-football-green" />
                <span>Unlimited priority submissions</span>
              </li>
              <li className="flex items-center space-x-3">
                <Star className="h-5 w-5 text-football-green" />
                <span>10 free vote credits monthly</span>
              </li>
              <li className="flex items-center space-x-3">
                <Star className="h-5 w-5 text-football-green" />
                <span>Monthly Top Tales analytics</span>
              </li>
              <li className="flex items-center space-x-3">
                <Star className="h-5 w-5 text-football-green" />
                <span>Priority customer support</span>
              </li>
              <li className="flex items-center space-x-3">
                <Star className="h-5 w-5 text-football-green" />
                <span>Exclusive Pro badge</span>
              </li>
            </ul>
            <button
              onClick={handleSubscribe}
              disabled={isSubscribing}
              className="w-full btn-primary disabled:opacity-50"
            >
              {isSubscribing ? "Processing..." : "Subscribe Now"}
            </button>
          </div>
        </div>

        {proMetrics && (
          <div className="story-card">
            <h3 className="text-xl font-headline font-bold text-charcoal mb-4">FootballPro Community Stats</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-2xl font-headline font-bold text-football-green mb-2">{proMetrics.trials}</div>
                <p className="text-gray-600">Active Trials</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-headline font-bold text-football-green mb-2">{proMetrics.activeSubs}</div>
                <p className="text-gray-600">Pro Members</p>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center space-x-3 mb-8">
        <Crown className="h-8 w-8 text-football-yellow" />
        <h1 className="text-3xl font-headline font-bold text-charcoal">Pro Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="story-card text-center">
          <TrendingUp className="h-8 w-8 text-football-green mx-auto mb-3" />
          <div className="text-2xl font-headline font-bold text-charcoal mb-1">
            {proMetrics?.monthlyStats.prioritySubmissions || 0}
          </div>
          <p className="text-gray-600">Priority Submissions This Month</p>
        </div>

        <div className="story-card text-center">
          <Star className="h-8 w-8 text-football-yellow mx-auto mb-3" />
          <div className="text-2xl font-headline font-bold text-charcoal mb-1">
            {proMetrics?.monthlyStats.voteCreditsUsed || 0}
          </div>
          <p className="text-gray-600">Vote Credits Used</p>
        </div>

        <div className="story-card text-center">
          <Calendar className="h-8 w-8 text-football-green mx-auto mb-3" />
          <div className="text-lg font-headline font-bold text-charcoal mb-1">
            {proMetrics?.nextBillingDate ? new Date(proMetrics.nextBillingDate).toLocaleDateString() : "N/A"}
          </div>
          <p className="text-gray-600">Next Billing Date</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="story-card">
          <h3 className="text-xl font-headline font-bold text-charcoal mb-4 flex items-center space-x-2">
            <BarChart3 className="h-5 w-5" />
            <span>Top Tales Analytics</span>
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Your Stories Performance</span>
              <span className="font-semibold text-football-green">Above Average</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Community Engagement</span>
              <span className="font-semibold text-football-green">High</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Monthly Ranking</span>
              <span className="font-semibold text-football-green">#12</span>
            </div>
          </div>
        </div>

        <div className="story-card">
          <h3 className="text-xl font-headline font-bold text-charcoal mb-4 flex items-center space-x-2">
            <CreditCard className="h-5 w-5" />
            <span>Subscription Details</span>
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Plan</span>
              <span className="font-semibold text-football-green">FootballPro Monthly</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Status</span>
              <span className="font-semibold text-green-600">Active</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Monthly Credits</span>
              <span className="font-semibold text-football-green">10 Votes</span>
            </div>
            <button className="w-full btn-ghost text-sm">Manage Subscription</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProDashboard
