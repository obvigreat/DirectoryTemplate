import { Metadata } from "next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Phone, Mail, Clock } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/navbar";

export const metadata: Metadata = {
  title: "Contact Support | Help Center",
  description: "Get in touch with our customer support team",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-5xl mx-auto space-y-8">
          <header className="text-center space-y-4">
            <h1 className="text-3xl font-bold">Contact Support</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get in touch with our customer support team for assistance
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Send a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as
                    possible
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Your Name
                        </label>
                        <Input id="name" placeholder="John Smith" required />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email Address
                        </label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@example.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">
                        Subject
                      </label>
                      <Input
                        id="subject"
                        placeholder="What is your question about?"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="category" className="text-sm font-medium">
                        Category
                      </label>
                      <select
                        id="category"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                      >
                        <option value="">Select a category</option>
                        <option value="account">Account & Profile</option>
                        <option value="listings">Listings Management</option>
                        <option value="billing">Subscription & Billing</option>
                        <option value="technical">Technical Issues</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        placeholder="Describe your issue in detail"
                        rows={6}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="attachment"
                        className="text-sm font-medium"
                      >
                        Attachment (optional)
                      </label>
                      <Input id="attachment" type="file" />
                      <p className="text-xs text-gray-500">
                        Max file size: 5MB. Supported formats: JPG, PNG, PDF
                      </p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="terms"
                        className="rounded"
                        required
                      />
                      <label htmlFor="terms" className="text-sm text-gray-600">
                        I agree to the processing of my personal data as
                        described in the{" "}
                        <Link
                          href="/privacy"
                          className="text-blue-600 hover:underline"
                        >
                          Privacy Policy
                        </Link>
                      </label>
                    </div>

                    <Button type="submit" className="w-full">
                      <MessageSquare className="mr-2 h-4 w-4" /> Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card id="chat">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageSquare className="mr-2 h-5 w-5 text-blue-600" />{" "}
                    Live Chat
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Chat with our support team in real-time during business
                    hours
                  </p>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
                    <Clock className="h-4 w-4" />
                    <span>Available Monday-Friday, 9am-5pm EST</span>
                  </div>
                  <Button className="w-full">Start Chat</Button>
                </CardContent>
              </Card>

              <Card id="phone">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Phone className="mr-2 h-5 w-5 text-green-600" /> Phone
                    Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Call our customer support team for immediate assistance
                  </p>
                  <div className="text-lg font-medium mb-2">
                    +1 (800) 123-4567
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
                    <Clock className="h-4 w-4" />
                    <span>Available Monday-Friday, 9am-5pm EST</span>
                  </div>
                  <Button variant="outline" className="w-full">
                    Request Callback
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Mail className="mr-2 h-5 w-5 text-purple-600" /> Email
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Send an email to our support team
                  </p>
                  <div className="text-lg font-medium mb-4">
                    <a
                      href="mailto:support@example.com"
                      className="text-blue-600 hover:underline"
                    >
                      support@example.com
                    </a>
                  </div>
                  <p className="text-sm text-gray-500">
                    We typically respond within 24 hours
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Frequently Asked Questions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-medium mb-2">
                    What are your support hours?
                  </h3>
                  <p className="text-sm text-gray-600">
                    Our support team is available Monday through Friday, from
                    9am to 5pm Eastern Time. Email support is available 24/7,
                    with responses typically within 24 hours.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-medium mb-2">
                    How quickly will I get a response?
                  </h3>
                  <p className="text-sm text-gray-600">
                    For live chat and phone support, you'll receive immediate
                    assistance during business hours. For email inquiries, we
                    aim to respond within 24 hours. Premium and Business
                    subscribers receive priority support with faster response
                    times.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-medium mb-2">
                    Do you offer support in other languages?
                  </h3>
                  <p className="text-sm text-gray-600">
                    Currently, our support is available in English only. We're
                    working on expanding our language options and hope to offer
                    support in additional languages soon.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-medium mb-2">
                    What information should I include in my support request?
                  </h3>
                  <p className="text-sm text-gray-600">
                    To help us resolve your issue quickly, please include your
                    account email, a detailed description of the problem, any
                    error messages you've received, and steps to reproduce the
                    issue if applicable. Screenshots or screen recordings are
                    also very helpful.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
