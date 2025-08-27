import React, { useEffect, useState, Fragment, createElement } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  FileText,
  CreditCard,
  ClipboardSignature,
  AlertCircle,
  ChevronRight,
  ChevronDown,
  HelpCircle,
  MessageSquare,
  Download,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
// Mock data for demonstration purposes
const mockUserPaymentStatus = {
  hasOutstandingInvoices: true,
  outstandingAmount: 1200.0,
  goodPaymentHistory: false,
  lastPaymentDate: "2023-09-15",
};
const mockToolData = {
  thrutalk: {
    name: "ThruTalk",
    vendor: "ThruText, Inc.",
    price: "Pay per use (Discounted rates)",
    eulaVersion: "2.1",
    eulaLastUpdated: "2023-07-15",
  },
  tableau: {
    name: "Tableau",
    vendor: "Salesforce",
    price: "$49/mo per user",
    eulaVersion: "3.4",
    eulaLastUpdated: "2023-10-22",
  },
};
export function PurchaseRequest() {
  const { id } = useParams<{
    id: string;
  }>();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    requestReason: "",
    expectedUsers: "",
    implementationTimeline: "",
    additionalInfo: "",
    acceptTerms: false,
  });
  const [paymentStatus, setPaymentStatus] = useState(mockUserPaymentStatus);
  const [eulaAccepted, setEulaAccepted] = useState(false);
  const [activeFaqItem, setActiveFaqItem] = useState<number | null>(null);
  // Function to handle EULA download
  const handleDownloadEula = () => {
    // Create EULA content as a string
    const eulaContent = `
${toolData.name} End User License Agreement
Version ${toolData.eulaVersion}, Last updated: ${toolData.eulaLastUpdated}
This End User License Agreement ("Agreement") is entered into by and between ${toolData.vendor} ("Vendor") and the end user ("Licensee") who has obtained access to the ${toolData.name} software through The Movement Cooperative ("TMC").
1. GRANT OF LICENSE
Subject to the terms of this Agreement, Vendor grants to Licensee a non-exclusive, non-transferable license to use the ${toolData.name} software and associated documentation ("Software") for Licensee's internal business purposes only.
2. RESTRICTIONS
Licensee shall not: (a) copy, modify, or create derivative works of the Software; (b) reverse engineer, decompile, or disassemble the Software; (c) rent, lease, lend, sell, sublicense, assign, distribute, publish, transfer, or otherwise make available the Software to any third party; (d) remove any proprietary notices from the Software; or (e) use the Software in any manner that violates applicable law.
3. OWNERSHIP
Vendor retains all right, title, and interest in and to the Software, including all intellectual property rights therein. This Agreement does not grant Licensee any rights to trademarks or service marks of Vendor.
4. TERM AND TERMINATION
This Agreement is effective until terminated. Licensee's rights under this Agreement will terminate automatically without notice if Licensee fails to comply with any term of this Agreement. Upon termination, Licensee shall cease all use of the Software and destroy all copies of the Software in Licensee's possession.
5. DISCLAIMER OF WARRANTIES
THE SOFTWARE IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND. VENDOR DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NONINFRINGEMENT.
6. LIMITATION OF LIABILITY
IN NO EVENT SHALL VENDOR BE LIABLE FOR ANY SPECIAL, INCIDENTAL, INDIRECT, OR CONSEQUENTIAL DAMAGES WHATSOEVER ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THE SOFTWARE.
7. GOVERNING LAW
This Agreement shall be governed by the laws of the state of [State], without regard to its conflict of law principles.
8. ENTIRE AGREEMENT
This Agreement constitutes the entire agreement between Licensee and Vendor with respect to the use of the Software and supersedes all prior or contemporaneous understandings regarding such subject matter.
    `.trim();
    // Create a Blob with the EULA content
    const blob = new Blob([eulaContent], {
      type: "text/plain",
    });
    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);
    // Create a temporary anchor element to trigger the download
    const a = document.createElement("a");
    a.href = url;
    a.download = `${toolData.name}_EULA_v${toolData.eulaVersion}.txt`;
    // Trigger the download
    document.body.appendChild(a);
    a.click();
    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  // This would fetch actual tool data in a real application
  const toolData =
    id && mockToolData[id]
      ? mockToolData[id]
      : {
          name: `Tool ${id}`,
          vendor: "Unknown Vendor",
          price: "Price unavailable",
          eulaVersion: "1.0",
          eulaLastUpdated: "Unknown",
        };
  // This would be an API call in a real application
  useEffect(() => {
    // Simulate API call to check payment status
    setTimeout(() => {
      // For demonstration, we'll keep the mock data
    }, 500);
  }, [id]);
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    });
  };
  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    // Move to payment status check step
    setCurrentStep(2);
    // In a real app, this would submit the request to the backend
    console.log("Request submitted:", formData);
  };
  const handlePayOutstandingInvoices = () => {
    // In a real app, this would redirect to billing or payment page
    // For demo, we'll just update the state and move to next step
    setPaymentStatus({
      ...paymentStatus,
      hasOutstandingInvoices: false,
      goodPaymentHistory: true,
    });
    setCurrentStep(3);
  };
  const handleAcceptEula = () => {
    setEulaAccepted(true);
    setCurrentStep(4);
  };
  const toggleFaqItem = (index: number) => {
    if (activeFaqItem === index) {
      setActiveFaqItem(null);
    } else {
      setActiveFaqItem(index);
    }
  };
  // Function to handle going back to the previous step
  const handleGoBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  const renderProgressSteps = () => {
    const steps = [
      {
        number: 1,
        title: "Request Details",
        icon: FileText,
      },
      {
        number: 2,
        title: "Payment Verification",
        icon: CreditCard,
      },
      {
        number: 3,
        title: "Review Agreement",
        icon: ClipboardSignature,
      },
      {
        number: 4,
        title: "Confirmation",
        icon: CheckCircle2,
      },
    ];
    return (
      <div className="mb-8">
        <div className="flex justify-between items-center relative">
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            const isActive = currentStep >= step.number;
            const isCompleted = currentStep > step.number;
            return (
              <Fragment key={step.number}>
                <div className="flex flex-col items-center relative z-10">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isCompleted
                        ? "bg-green-500"
                        : isActive
                        ? "bg-blue-600"
                        : "bg-gray-300"
                    } text-white mb-2`}
                  >
                    <StepIcon className="h-5 w-5" />
                  </div>
                  <div
                    className={`text-xs font-medium text-center ${
                      isActive ? "text-gray-900" : "text-gray-500"
                    }`}
                  >
                    {step.title}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-1 flex-1 ${
                      currentStep > step.number ? "bg-green-500" : "bg-gray-300"
                    }`}
                  />
                )}
              </Fragment>
            );
          })}
        </div>
      </div>
    );
  };
  const renderRequestForm = () => (
    <Card>
      <CardHeader>
        <CardTitle>Request {toolData.name}</CardTitle>
        <CardDescription>
          Please provide details about your request for {toolData.name} from{" "}
          {toolData.vendor}.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmitRequest}>
        <CardContent className="space-y-4">
          <div>
            <label
              htmlFor="requestReason"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Why are you requesting this tool? *
            </label>
            <textarea
              id="requestReason"
              name="requestReason"
              required
              value={formData.requestReason}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              rows={3}
            />
          </div>
          <div>
            <label
              htmlFor="expectedUsers"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              How many users will need access? *
            </label>
            <Input
              id="expectedUsers"
              name="expectedUsers"
              type="number"
              required
              value={formData.expectedUsers}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label
              htmlFor="implementationTimeline"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              When do you need this implemented? *
            </label>
            <Input
              id="implementationTimeline"
              name="implementationTimeline"
              type="text"
              placeholder="e.g., Next month, Q3 2023, etc."
              required
              value={formData.implementationTimeline}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label
              htmlFor="additionalInfo"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Additional information or special requirements
            </label>
            <textarea
              id="additionalInfo"
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              rows={3}
            />
          </div>
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="acceptTerms"
                name="acceptTerms"
                type="checkbox"
                required
                checked={formData.acceptTerms}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label
                htmlFor="acceptTerms"
                className="font-medium text-gray-700"
              >
                I understand that this request will be sent to my primary point
                of contact *
              </label>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            disabled={!formData.acceptTerms}
          >
            Submit Request
          </button>
        </CardFooter>
      </form>
    </Card>
  );
  const renderPaymentStatusCheck = () => (
    <Card>
      <CardHeader>
        <CardTitle>Payment Verification</CardTitle>
        <CardDescription>
          We're checking your payment status to determine next steps.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {paymentStatus.hasOutstandingInvoices ? (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-amber-800">
                  Outstanding Invoices Found
                </h3>
                <p className="mt-1 text-sm text-amber-700">
                  You have ${paymentStatus.outstandingAmount.toFixed(2)} in
                  outstanding invoices. To proceed with this request, please
                  settle these invoices first.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
            <div className="flex items-start">
              <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-green-800">
                  Payment Status Verified
                </h3>
                <p className="mt-1 text-sm text-green-700">
                  Your payment history is in good standing. You can proceed to
                  review and sign the EULA.
                </p>
              </div>
            </div>
          </div>
        )}
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-900 mb-2">
            Payment History Summary
          </h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-gray-500">Last Payment Date:</div>
              <div className="font-medium">{paymentStatus.lastPaymentDate}</div>
              <div className="text-gray-500">Payment Status:</div>
              <div className="font-medium">
                {paymentStatus.goodPaymentHistory ? (
                  <span className="text-green-600">Good Standing</span>
                ) : (
                  <span className="text-amber-600">Requires Attention</span>
                )}
              </div>
              <div className="text-gray-500">Outstanding Balance:</div>
              <div className="font-medium">
                {paymentStatus.hasOutstandingInvoices ? (
                  <span className="text-amber-600">
                    ${paymentStatus.outstandingAmount.toFixed(2)}
                  </span>
                ) : (
                  <span className="text-green-600">$0.00</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <button
          onClick={handleGoBack}
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1 inline" />
          Back
        </button>
        {paymentStatus.hasOutstandingInvoices ? (
          <button
            onClick={handlePayOutstandingInvoices}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Pay Outstanding Invoices
          </button>
        ) : (
          <button
            onClick={() => setCurrentStep(3)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Continue to EULA
          </button>
        )}
      </CardFooter>
    </Card>
  );
  const renderEulaReview = () => {
    const faqItems = [
      {
        question: "What happens after I sign the EULA?",
        answer:
          "After signing, your request will be processed by your primary contact. They will coordinate with the vendor to set up your account and provide access credentials.",
      },
      {
        question: "Can I cancel this subscription later?",
        answer:
          "Yes, you can cancel your subscription by contacting your primary point of contact. Cancellation terms vary by tool and are outlined in the agreement.",
      },
      {
        question: "How is billing handled for this tool?",
        answer:
          "Billing is processed through TMC. You will receive invoices according to the payment terms outlined in your membership agreement and the specific tool's pricing structure.",
      },
      {
        question: "Are there any usage limitations?",
        answer:
          "Usage limitations vary by tool and subscription tier. The specific limitations for your selected plan are outlined in the EULA and can be reviewed in the agreement text.",
      },
      {
        question: "What kind of support is included?",
        answer:
          "As a TMC member, you receive enhanced support including dedicated cooperative support contacts, priority escalation to vendors, and member-to-member knowledge sharing.",
      },
    ];
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>End User License Agreement</CardTitle>
              <CardDescription>
                Please review and accept the EULA for {toolData.name} (Version{" "}
                {toolData.eulaVersion}, Last updated: {toolData.eulaLastUpdated}
                )
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative border rounded-md p-4 h-96 overflow-y-auto bg-gray-50 mb-4">
                <button
                  onClick={handleDownloadEula}
                  className="absolute top-2 right-2 p-2 bg-white rounded-md border border-gray-200 hover:bg-gray-50 text-gray-700 flex items-center gap-1.5 text-sm shadow-sm"
                  title="Download EULA"
                >
                  <Download className="h-4 w-4" />
                  Download
                </button>
                <h3 className="text-lg font-bold mb-4">
                  {toolData.name} End User License Agreement
                </h3>
                <p className="mb-4">
                  This End User License Agreement ("Agreement") is entered into
                  by and between {toolData.vendor} ("Vendor") and the end user
                  ("Licensee") who has obtained access to the {toolData.name}{" "}
                  software through The Movement Cooperative ("TMC").
                </p>
                <h4 className="font-bold mt-4 mb-2">1. GRANT OF LICENSE</h4>
                <p>
                  Subject to the terms of this Agreement, Vendor grants to
                  Licensee a non-exclusive, non-transferable license to use the{" "}
                  {toolData.name} software and associated documentation
                  ("Software") for Licensee's internal business purposes only.
                </p>
                <h4 className="font-bold mt-4 mb-2">2. RESTRICTIONS</h4>
                <p>
                  Licensee shall not: (a) copy, modify, or create derivative
                  works of the Software; (b) reverse engineer, decompile, or
                  disassemble the Software; (c) rent, lease, lend, sell,
                  sublicense, assign, distribute, publish, transfer, or
                  otherwise make available the Software to any third party; (d)
                  remove any proprietary notices from the Software; or (e) use
                  the Software in any manner that violates applicable law.
                </p>
                <h4 className="font-bold mt-4 mb-2">3. OWNERSHIP</h4>
                <p>
                  Vendor retains all right, title, and interest in and to the
                  Software, including all intellectual property rights therein.
                  This Agreement does not grant Licensee any rights to
                  trademarks or service marks of Vendor.
                </p>
                <h4 className="font-bold mt-4 mb-2">4. TERM AND TERMINATION</h4>
                <p>
                  This Agreement is effective until terminated. Licensee's
                  rights under this Agreement will terminate automatically
                  without notice if Licensee fails to comply with any term of
                  this Agreement. Upon termination, Licensee shall cease all use
                  of the Software and destroy all copies of the Software in
                  Licensee's possession.
                </p>
                <h4 className="font-bold mt-4 mb-2">
                  5. DISCLAIMER OF WARRANTIES
                </h4>
                <p>
                  THE SOFTWARE IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND.
                  VENDOR DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING
                  BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY,
                  FITNESS FOR A PARTICULAR PURPOSE, AND NONINFRINGEMENT.
                </p>
                <h4 className="font-bold mt-4 mb-2">
                  6. LIMITATION OF LIABILITY
                </h4>
                <p>
                  IN NO EVENT SHALL VENDOR BE LIABLE FOR ANY SPECIAL,
                  INCIDENTAL, INDIRECT, OR CONSEQUENTIAL DAMAGES WHATSOEVER
                  ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF
                  THE SOFTWARE.
                </p>
                <h4 className="font-bold mt-4 mb-2">7. GOVERNING LAW</h4>
                <p>
                  This Agreement shall be governed by the laws of the state of
                  [State], without regard to its conflict of law principles.
                </p>
                <h4 className="font-bold mt-4 mb-2">8. ENTIRE AGREEMENT</h4>
                <p>
                  This Agreement constitutes the entire agreement between
                  Licensee and Vendor with respect to the use of the Software
                  and supersedes all prior or contemporaneous understandings
                  regarding such subject matter.
                </p>
              </div>
              <div className="flex items-start mb-4">
                <div className="flex items-center h-5">
                  <input
                    id="acceptEula"
                    type="checkbox"
                    checked={eulaAccepted}
                    onChange={() => setEulaAccepted(!eulaAccepted)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="acceptEula"
                    className="font-medium text-gray-700"
                  >
                    I have read and agree to the End User License Agreement
                  </label>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <button
                onClick={handleGoBack}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-1 inline" />
                Back
              </button>
              <button
                onClick={handleAcceptEula}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={!eulaAccepted}
              >
                Accept and Continue
              </button>
            </CardFooter>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {faqItems.map((item, index) => (
                  <div
                    key={index}
                    className="border rounded-md overflow-hidden"
                  >
                    <button
                      className="w-full p-3 text-left flex justify-between items-center hover:bg-gray-50"
                      onClick={() => toggleFaqItem(index)}
                    >
                      <span className="font-medium text-sm">
                        {item.question}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          activeFaqItem === index ? "transform rotate-180" : ""
                        }`}
                      />
                    </button>
                    {activeFaqItem === index && (
                      <div className="p-3 bg-gray-50 border-t text-sm text-gray-700">
                        {item.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-6 bg-blue-50 p-4 rounded-md">
                <div className="flex items-center text-blue-800 font-medium mb-2">
                  <HelpCircle className="h-5 w-5 mr-2" />
                  Need More Help?
                </div>
                <p className="text-sm text-blue-700 mb-3">
                  If your question isn't answered here, our support team is
                  ready to assist you.
                </p>
                <button className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Contact Support
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };
  const renderConfirmation = () => (
    <Card>
      <CardHeader>
        <CardTitle>Request Submitted Successfully</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-6">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-green-100 p-3">
              <CheckCircle2 className="h-12 w-12 text-green-600" />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Thank you for your request!
          </h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Your request for {toolData.name} has been submitted to your primary
            point of contact. They will be in touch with you shortly to
            coordinate the next steps.
          </p>
          <div className="bg-gray-50 rounded-lg p-4 max-w-md mx-auto text-left mb-6">
            <h4 className="font-medium text-gray-900 mb-2">
              What happens next?
            </h4>
            <ol className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <span className="flex-shrink-0 flex items-center justify-center h-5 w-5 rounded-full bg-blue-100 text-blue-600 text-xs font-medium mr-2">
                  1
                </span>
                <span>
                  Your request will be reviewed by your primary contact
                  (typically within 1-2 business days)
                </span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 flex items-center justify-center h-5 w-5 rounded-full bg-blue-100 text-blue-600 text-xs font-medium mr-2">
                  2
                </span>
                <span>
                  They will coordinate with the vendor to set up your account
                </span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 flex items-center justify-center h-5 w-5 rounded-full bg-blue-100 text-blue-600 text-xs font-medium mr-2">
                  3
                </span>
                <span>
                  You'll receive access credentials and implementation support
                </span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 flex items-center justify-center h-5 w-5 rounded-full bg-blue-100 text-blue-600 text-xs font-medium mr-2">
                  4
                </span>
                <span>
                  Your billing will be updated to reflect the new tool
                  subscription
                </span>
              </li>
            </ol>
          </div>
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleGoBack}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-1 inline" />
              Back to Review
            </button>
            <Link
              to="/marketplace"
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Return to Marketplace
            </Link>
            <Link
              to="/marketplace/orders"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              View My Orders
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
  return (
    <div className="max-w-4xl mx-auto">
      <Link
        to={`/marketplace/tool/${id}`}
        className="inline-flex items-center text-blue-600 mb-6 hover:text-blue-800"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Tool Details
      </Link>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        Purchase Request: {toolData.name}
      </h1>
      <p className="text-gray-600 mb-6">
        Complete the following steps to request access to this tool through your
        TMC membership.
      </p>
      {renderProgressSteps()}
      {currentStep === 1 && renderRequestForm()}
      {currentStep === 2 && renderPaymentStatusCheck()}
      {currentStep === 3 && renderEulaReview()}
      {currentStep === 4 && renderConfirmation()}
    </div>
  );
}
