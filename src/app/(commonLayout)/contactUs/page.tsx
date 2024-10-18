/* eslint-disable react/no-unescaped-entities */
"use client";

import React from "react";
import { Input, Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { MapPin, Phone, Mail, Send } from "lucide-react";

export default function ContactUs() {
  return (
    <div className="container mx-auto px-4 py-12 relative">
      
      <h1 className="text-5xl font-extrabold text-center text-green-600 mb-12">
        Contact Us
      </h1>
      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="relative">
          <Card className="p-8  rounded-lg shadow-lg z-10">
            <CardHeader className="text-center">
              <h2 className="text-3xl font-semibold text-green-600 mb-4">
                We'd Love to Hear From You!
              </h2>
            </CardHeader>
            <CardBody>
              <form className="space-y-8">
                <Input
                  label="Name"
                  placeholder="Enter your name"
                  variant="bordered"
                  className="rounded-lg border-blue-500"
                />
                <Input
                  label="Email"
                  placeholder="Enter your email"
                  type="email"
                  variant="bordered"
                  className="rounded-lg border-blue-500"
                />
                <Textarea
                  label="Message"
                  minRows={5}
                  placeholder="Write your message"
                  variant="bordered"
                  className="rounded-lg border-blue-500"
                />
                <div className="text-center">
                  <Button
                    color="primary"
                    className="bg-green-500 hover:bg-green-700"
                    endContent={<Send className="w-5 h-5" />}
                    type="submit"
                    variant="shadow"
                  >
                    Send Message
                  </Button>
                </div>
              </form>
            </CardBody>
          </Card>
        </div>

        {/* Contact Information */}
        <div className="relative">
          <Card className="p-8   rounded-lg shadow-lg z-10">
            <CardHeader className="text-center">
              <h2 className="text-3xl text-green-600 font-semibold mb-6">
                Reach Out to Us!
              </h2>
            </CardHeader>
            <CardBody>
              <div className="space-y-8">
                <div className="flex items-center space-x-6">
                  <MapPin className="w-7 h-7 text-green-400" />
                  <div>
                    <h3 className="font-semibold text-lg">Address</h3>
                    <p className="">Kasipur Barisal, Barisal Sader</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <Phone className="w-7 h-7 text-green-400" />
                  <div>
                    <h3 className="font-semibold text-lg">Phone</h3>
                    <p className="">+880 1871155040</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <Mail className="w-7 h-7 text-green-400" />
                  <div>
                    <h3 className="font-semibold text-lg">Email</h3>
                    <p className="">contact@travel.com</p>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
