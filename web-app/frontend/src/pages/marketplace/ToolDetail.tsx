import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, ArrowLeft, Check, ExternalLink } from "lucide-react";
import { ToolCard } from "../../components/marketplace/ToolCard";
export function ToolDetail() {
  const { id } = useParams<{
    id: string;
  }>();
  const [activeTab, setActiveTab] = useState("overview");
  // This would come from an API in a real application
  const tool = {
    id: id || "1",
    name: "Tableau",
    category: "Data & Analytics",
    vendor: "Salesforce",
    description:
      "Enterprise-grade data visualization and business intelligence platform with advanced analytics capabilities.",
    regularPrice: 70,
    memberPrice: 49,
    discount: 30,
    tier: "TL-1",
    rating: 4.8,
    reviewCount: 245,
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Tableau_Logo.png",
    featured: true,
    longDescription: `Tableau is a visual analytics platform transforming the way we use data to solve problems—empowering people and organizations to make the most of their data.
From connection through collaboration, Tableau is the most powerful, secure, and flexible end-to-end analytics platform for your data. Elevate people with the power of data. Designed for the individual, but scaled for the enterprise, Tableau is the only business intelligence platform that turns your data into insights that drive action.`,
    features: [
      "Interactive dashboards with drag-and-drop functionality",
      "Real-time data visualization and analytics",
      "Connect to virtually any data source",
      "Mobile-friendly design for on-the-go access",
      "Enterprise-grade security and governance",
      "Powerful AI-driven analytics with Ask Data and Explain Data",
      "Seamless integration with Salesforce CRM",
    ],
    screenshots: [
      "https://help.tableau.com/current/pro/desktop/en-us/Img/sample_your_data.png",
      "https://help.tableau.com/current/pro/desktop/en-us/Img/viz_types_all.png",
    ],
    pricingTiers: [
      {
        name: "Creator",
        regularPrice: 70,
        memberPrice: 49,
        features: [
          "Full authoring capabilities",
          "Connect to all data sources",
          "Web and desktop access",
        ],
      },
      {
        name: "Explorer",
        regularPrice: 42,
        memberPrice: 29.4,
        features: [
          "Web authoring capabilities",
          "Connect to published data sources",
          "Save and share work",
        ],
      },
      {
        name: "Viewer",
        regularPrice: 15,
        memberPrice: 10.5,
        features: [
          "View and interact with dashboards",
          "Subscribe to content updates",
          "Mobile access",
        ],
      },
    ],
    reviews: [
      {
        author: "Digital Democracy Project",
        rating: 5,
        date: "March 10, 2023",
        comment:
          "Tableau has transformed how we analyze and present voter engagement data. The cooperative discount made it accessible for our entire team.",
      },
      {
        author: "Tech Justice Collective",
        rating: 4,
        date: "February 22, 2023",
        comment:
          "Great visualization capabilities. The learning curve is a bit steep, but the TMC onboarding support was extremely helpful.",
      },
      {
        author: "Community Tech Hub",
        rating: 5,
        date: "January 15, 2023",
        comment:
          "We use Tableau for all our community impact reporting. The member discount and additional user licenses have been game-changing for our small nonprofit.",
      },
    ],
    memberBenefits: [
      "Enhanced support from Salesforce",
      "Priority onboarding assistance",
      "3 additional user licenses",
      "Custom integration support",
      "Access to Tableau Conference at discounted rates",
    ],
  };
  // Similar tools
  const relatedTools = [
    {
      id: "4",
      name: "Airtable",
      category: "Data & Analytics",
      vendor: "Airtable, Inc.",
      description:
        "Cloud collaboration service that combines the features of a database with the visual interface of a spreadsheet.",
      regularPrice: 20,
      memberPrice: 14,
      discount: 30,
      tier: "TL-2",
      rating: 4.7,
      reviewCount: 156,
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Airtable_Logo.svg/2560px-Airtable_Logo.svg.png",
    },
    {
      id: "10",
      name: "Power BI",
      category: "Data & Analytics",
      vendor: "Microsoft",
      description:
        "Business analytics service that delivers insights for analyzing data. Share insights across your organization.",
      regularPrice: 9.99,
      memberPrice: 6.99,
      discount: 30,
      tier: "TL-1",
      rating: 4.6,
      reviewCount: 210,
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/New_Power_BI_Logo.svg/630px-New_Power_BI_Logo.svg.png",
    },
    {
      id: "11",
      name: "Looker",
      category: "Data & Analytics",
      vendor: "Google",
      description:
        "Business intelligence software and big data analytics platform that helps you explore, analyze and share business insights.",
      regularPrice: 50,
      memberPrice: 35,
      discount: 30,
      tier: "TL-1",
      rating: 4.5,
      reviewCount: 125,
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Looker.svg/1200px-Looker.svg.png",
    },
  ];
  return (
    <div className="max-w-7xl mx-auto">
      <Link
        to="/marketplace"
        className="inline-flex items-center text-blue-600 mb-6 hover:text-blue-800"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Marketplace
      </Link>
      <div className="bg-primary rounded-xl shadow-sm overflow-hidden mb-8">
        <div className="p-6 border-b border-black">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <img
                src={tool.logo}
                alt={`${tool.vendor} logo`}
                className="h-16 mr-4 object-contain"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {tool.name}
                </h1>
                <p className="text-gray-600">{tool.vendor}</p>
                <div className="flex items-center mt-1">
                  <div className="flex items-center mr-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(tool.rating)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">
                    ({tool.reviewCount} reviews)
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-baseline mb-2">
                <span className="text-sm text-gray-500 line-through mr-2">
                  ${tool.regularPrice}/mo
                </span>
                <span className="text-2xl font-bold text-gray-900">
                  ${tool.memberPrice}/mo
                </span>
                <span className="ml-2 px-2 py-1 text-xs font-bold rounded-full bg-green-100 text-green-800">
                  {tool.discount}% OFF
                </span>
              </div>
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full mb-3 ${
                  tool.tier === "TL-1"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-purple-100 text-purple-800"
                }`}
              >
                {tool.tier} Access
              </span>
              <Link
                to={`/marketplace/purchase/${tool.id}`}
                className="px-6 py-2 bg-black text-white rounded-lg font-medium transition-colors"
              >
                Request Purchase
              </Link>
            </div>
          </div>
        </div>
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            {[
              "overview",
              "pricing",
              "reviews",
              "implementation",
              "support",
            ].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-6 text-sm font-medium border-b-2 ${
                  activeTab === tab
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>
        <div className="p-6">
          {activeTab === "overview" && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Overview
              </h2>
              <p className="text-gray-700 mb-6 whitespace-pre-line">
                {tool.longDescription}
              </p>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Key Features
              </h3>
              <ul className="space-y-2 mb-6">
                {tool.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {activeTab === "pricing" && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Pricing Options
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {tool.pricingTiers.map((tier, index) => (
                  <div
                    key={index}
                    className="border rounded-xl p-6 hover:shadow-md transition-shadow"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {tier.name}
                    </h3>
                    <div className="flex items-baseline mb-4">
                      <span className="text-sm text-gray-500 line-through mr-2">
                        ${tier.regularPrice}/mo
                      </span>
                      <span className="text-2xl font-bold text-gray-900">
                        ${tier.memberPrice}/mo
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {tier.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500 italic">
                All prices are per user, billed annually. Monthly billing
                available at slightly higher rates.
              </p>
            </div>
          )}
          {activeTab === "reviews" && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Member Reviews
              </h2>
              <div className="space-y-6 mb-6">
                {tool.reviews.map((review, index) => (
                  <div
                    key={index}
                    className="border-b border-gray-200 pb-6 last:border-0"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-gray-900">
                        {review.author}
                      </h3>
                      <span className="text-sm text-gray-500">
                        {review.date}
                      </span>
                    </div>
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
              <button className="text-blue-600 hover:text-blue-800 font-medium">
                Write a Review
              </button>
            </div>
          )}
          {activeTab === "implementation" && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Implementation
              </h2>
              <div className="bg-blue-50 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">
                  TMC Implementation Support
                </h3>
                <p className="text-blue-800 mb-4">
                  As a TL-1 member, you have access to cooperative
                  implementation support services at no additional cost.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-blue-800">
                      Dedicated implementation specialist
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-blue-800">
                      Custom integration planning
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-blue-800">
                      Staff training sessions
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-blue-800">
                      Best practices consultation
                    </span>
                  </li>
                </ul>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Technical Requirements
              </h3>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">
                    Windows, Mac, or Linux operating system
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">
                    Modern web browser (Chrome, Firefox, Safari, Edge)
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">
                    Minimum 4GB RAM for desktop application
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">
                    Internet connection for web access and data updates
                  </span>
                </li>
              </ul>
              <a
                href="#"
                className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
              >
                View complete implementation guide
                <ExternalLink className="ml-1 h-4 w-4" />
              </a>
            </div>
          )}
          {activeTab === "support" && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Support
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="border rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Vendor Support
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">24/7 email support</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">
                        Business hours phone support
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">
                        Online knowledge base
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Community forums</span>
                    </li>
                  </ul>
                </div>
                <div className="border rounded-xl p-6 bg-blue-50 border-blue-100">
                  <h3 className="text-lg font-semibold text-blue-900 mb-3">
                    TMC Enhanced Support
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-blue-800">
                        Dedicated cooperative support contact
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-blue-800">
                        Priority escalation to vendor
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-blue-800">
                        Member-to-member knowledge sharing
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-blue-800">
                        Quarterly user group meetings
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Documentation
              </h3>
              <div className="space-y-2 mb-6">
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                >
                  User Guide
                  <ExternalLink className="ml-1 h-4 w-4" />
                </a>
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                >
                  API Documentation
                  <ExternalLink className="ml-1 h-4 w-4" />
                </a>
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                >
                  Video Tutorials
                  <ExternalLink className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="bg-blue-50 rounded-xl shadow-sm p-6 mb-8">
        <h2 className="text-xl font-semibold text-blue-900 mb-4">
          TL-1 Member Benefits
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tool.memberBenefits.map((benefit, index) => (
            <div key={index} className="flex items-start">
              <Check className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-blue-800">{benefit}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Members Also Use
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </div>
    </div>
  );
}
