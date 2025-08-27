import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Star,
  ArrowLeft,
  Check,
  ExternalLink,
  Phone,
  MessageSquare,
  Users,
  Clock,
  Shield,
  BarChart3,
} from "lucide-react";
import { ToolCard } from "../../components/marketplace/ToolCard";
import { PhoneServiceCalculator } from "../../components/marketplace/PhoneServiceCalculator";
export function ThruTalkDetail() {
  const [activeTab, setActiveTab] = useState("overview");
  // This would come from an API in a real application
  const tool = {
    id: "thrutalk",
    name: "ThruTalk",
    category: "Communication Tools",
    vendor: "ThruText, Inc.",
    description:
      "Advanced phone service platform with SMS, MMS, voice calls, and message segmentation for organizations.",
    regularPrice: "Pay per use",
    memberPrice: "Discounted rates",
    discount: 30,
    tier: "TL-1",
    rating: 4.9,
    reviewCount: 187,
    logo: "https://via.placeholder.com/200x80/0066cc/ffffff?text=ThruTalk",
    featured: true,
    longDescription: `ThruTalk is a comprehensive phone service platform designed specifically for organizations that need reliable, scalable communication tools. The platform combines SMS, MMS, voice calls, and message segmentation capabilities in one integrated solution.
With ThruTalk, your organization can efficiently manage all phone-based communications from a single dashboard, with detailed analytics and reporting features. The platform is built for high-volume usage with enterprise-grade reliability and security.
ThruTalk offers flexible pricing based on your actual usage, with significant discounts for TMC members. Whether you're running a small campaign or managing communications for a large organization, ThruTalk scales to meet your needs without unnecessary overhead costs.`,
    features: [
      "SMS messaging with high deliverability rates",
      "MMS support for rich media messages",
      "Voice call management with recording capabilities",
      "Message segmentation for targeted communications",
      "Advanced analytics and reporting dashboard",
      "API access for custom integrations",
      "Compliance tools for regulatory requirements",
      "Scalable infrastructure for high-volume campaigns",
    ],
    screenshots: [
      "https://via.placeholder.com/800x450/f5f5f5/333333?text=ThruTalk+Dashboard",
      "https://via.placeholder.com/800x450/f5f5f5/333333?text=ThruTalk+Analytics",
    ],
    pricingTiers: [
      {
        name: "Pay-as-you-go",
        regularPrice: "Variable",
        memberPrice: "Discounted rates",
        features: [
          "No monthly commitment",
          "Pay only for what you use",
          "All features included",
        ],
      },
      {
        name: "Small Organization",
        regularPrice: "$500/mo minimum",
        memberPrice: "$350/mo minimum",
        features: [
          "Reduced per-unit rates",
          "Priority support",
          "Monthly usage reports",
        ],
      },
      {
        name: "Enterprise",
        regularPrice: "Custom",
        memberPrice: "Custom + 30% discount",
        features: [
          "Volume discounts",
          "Dedicated account manager",
          "Custom integrations",
        ],
      },
    ],
    reviews: [
      {
        author: "Community Outreach Network",
        rating: 5,
        date: "April 15, 2023",
        comment:
          "ThruTalk has transformed our community outreach efforts. The usage-based pricing model is perfect for our fluctuating needs, and the TMC discount makes it affordable.",
      },
      {
        author: "Urban Justice Initiative",
        rating: 5,
        date: "March 3, 2023",
        comment:
          "The combination of SMS, MMS, and voice capabilities in one platform has streamlined our entire communication strategy. The analytics tools are particularly valuable.",
      },
      {
        author: "Rural Healthcare Alliance",
        rating: 4,
        date: "February 12, 2023",
        comment:
          "Excellent service overall. The platform is reliable and the support team is responsive. Would appreciate more templates for healthcare-specific messaging.",
      },
    ],
    memberBenefits: [
      "30% discount on all services",
      "Free implementation consultation",
      "Priority technical support",
      "Monthly strategy sessions",
      "Access to member-only templates",
    ],
  };
  // Similar tools
  const relatedTools = [
    {
      id: "thrutext",
      name: "ThruText",
      category: "Communication Tools",
      vendor: "ThruText, Inc.",
      description:
        "Text messaging platform designed for organizations to send personalized messages at scale.",
      regularPrice: 0.06,
      memberPrice: 0.042,
      discount: 30,
      tier: "TL-1",
      rating: 4.8,
      reviewCount: 156,
      logo: "https://via.placeholder.com/200x80/0066cc/ffffff?text=ThruText",
    },
    {
      id: "callhub",
      name: "CallHub",
      category: "Communication Tools",
      vendor: "CallHub, Inc.",
      description:
        "Phone banking, SMS, and voice broadcasting platform for organizations and campaigns.",
      regularPrice: 0.05,
      memberPrice: 0.035,
      discount: 30,
      tier: "TL-2",
      rating: 4.6,
      reviewCount: 120,
      logo: "https://via.placeholder.com/200x80/0066cc/ffffff?text=CallHub",
    },
    {
      id: "twilio",
      name: "Twilio",
      category: "Communication Tools",
      vendor: "Twilio Inc.",
      description:
        "Cloud communications platform for building SMS, voice, and messaging applications.",
      regularPrice: 0.0075,
      memberPrice: 0.00525,
      discount: 30,
      tier: "TL-1",
      rating: 4.7,
      reviewCount: 210,
      logo: "https://via.placeholder.com/200x80/0066cc/ffffff?text=Twilio",
    },
  ];
  const serviceFeatures = [
    {
      icon: MessageSquare,
      title: "SMS & MMS Messaging",
      description:
        "Send text and multimedia messages with high deliverability rates",
    },
    {
      icon: Phone,
      title: "Voice Calling",
      description:
        "Make and manage voice calls with recording and transcription",
    },
    {
      icon: Users,
      title: "Audience Segmentation",
      description: "Target specific groups with customized messaging",
    },
    {
      icon: Clock,
      title: "Scheduled Delivery",
      description: "Plan communications in advance for optimal timing",
    },
    {
      icon: Shield,
      title: "Compliance Tools",
      description: "Stay compliant with regulations like TCPA and GDPR",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Track performance with detailed reporting and insights",
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
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
        <div className="p-6 border-b border-gray-200">
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
                <span className="text-sm text-gray-500 mr-2">
                  Regular: {tool.regularPrice}
                </span>
                <span className="text-2xl font-bold text-gray-900">
                  Members: {tool.memberPrice}
                </span>
                <span className="ml-2 px-2 py-1 text-xs font-bold rounded-full bg-green-100 text-green-800">
                  {tool.discount}% OFF
                </span>
              </div>
              <Link
                to={`/marketplace/purchase/${tool.id}`}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {serviceFeatures.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <div className="p-2 rounded-full bg-primary/10 mr-3">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="font-medium">{feature.title}</h3>
                      </div>
                      <p className="text-sm text-gray-600 ml-12">
                        {feature.description}
                      </p>
                    </div>
                  );
                })}
              </div>
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
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Screenshots
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {tool.screenshots.map((screenshot, index) => (
                  <img
                    key={index}
                    src={screenshot}
                    alt={`${tool.name} screenshot ${index + 1}`}
                    className="rounded-lg shadow-sm w-full h-auto"
                  />
                ))}
              </div>
              {/* Phone Service Calculator */}
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Cost Estimator
              </h3>
              <PhoneServiceCalculator />
            </div>
          )}
          {activeTab === "pricing" && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Pricing Options
              </h2>
              <div className="mb-6">
                <p className="text-gray-700 mb-4">
                  ThruTalk offers usage-based pricing with significant discounts
                  for TMC members. You only pay for the services you actually
                  use, with no hidden fees or minimum commitments (except for
                  Small Organization and Enterprise plans).
                </p>
                <p className="text-gray-700 mb-4">
                  Use the calculator above to estimate your monthly costs based
                  on your expected usage.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {tool.pricingTiers.map((tier, index) => (
                  <div
                    key={index}
                    className="border rounded-xl p-6 hover:shadow-md transition-shadow"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {tier.name}
                    </h3>
                    <div className="flex flex-col mb-4">
                      <span className="text-sm text-gray-500 line-through">
                        Regular: {tier.regularPrice}
                      </span>
                      <span className="text-xl font-bold text-gray-900">
                        Members: {tier.memberPrice}
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
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium text-blue-800 mb-2">
                  Service Rates for Members
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white p-3 rounded shadow-sm">
                    <div className="text-sm text-gray-500">SMS</div>
                    <div className="text-lg font-bold">
                      $0.042{" "}
                      <span className="text-xs font-normal">per message</span>
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded shadow-sm">
                    <div className="text-sm text-gray-500">MMS</div>
                    <div className="text-lg font-bold">
                      $0.0245{" "}
                      <span className="text-xs font-normal">per message</span>
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded shadow-sm">
                    <div className="text-sm text-gray-500">Voice Calls</div>
                    <div className="text-lg font-bold">
                      $0.02363{" "}
                      <span className="text-xs font-normal">per minute</span>
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded shadow-sm">
                    <div className="text-sm text-gray-500">Segments</div>
                    <div className="text-lg font-bold">
                      $0.014{" "}
                      <span className="text-xs font-normal">per segment</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-500 italic mt-4">
                Volume discounts available for high-usage organizations. Contact
                your TMC representative for custom pricing.
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
                    Internet connection for web-based dashboard
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
                    No special hardware required
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">
                    Optional API integration capabilities
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
          Member Benefits
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
          Related Communication Tools
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
