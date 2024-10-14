"use client";

import React from "react";
import { Input, Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { MapPin, Phone, Mail, Send } from "lucide-react";

export default function ContactUs() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="p-6">
          <CardHeader>
            <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
          </CardHeader>
          <CardBody>
            <form className="space-y-6">
              <Input
                label="Name"
                placeholder="Enter your name"
                variant="bordered"
              />
              <Input
                label="Email"
                placeholder="Enter your email"
                type="email"
                variant="bordered"
              />
              <Textarea
                label="Message"
                minRows={4}
                placeholder="Enter your message"
                variant="bordered"
              />
              <Button
                color="primary"
                endContent={<Send className="w-4 h-4" />}
                type="submit"
                variant="shadow"
              >
                Send Message
              </Button>
            </form>
          </CardBody>
        </Card>

        <Card className="p-6">
          <CardHeader>
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <MapPin className="w-6 h-6 text-primary" />
                <div>
                  <h3 className="font-semibold">Address</h3>
                  <p className="text-default-500">
                    64/9 C.R.P Road Savar, DHAKA, 1340
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Phone className="w-6 h-6 text-primary" />
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <p className="text-default-500">+88 01603491969</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Mail className="w-6 h-6 text-primary" />
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-default-500">contact@travex.com</p>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="mt-12">
        <Card className="w-full h-64 md:h-96">
          <iframe
            allowFullScreen
            height="100%"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3648.969736313317!2d90.2607649759299!3d23.85520838474356!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755ea2ad87cfc2b%3A0x8666aa459bee7fa0!2sC%20R%20P%20Rd%2C%20Savar!5e0!3m2!1sen!2sbd!4v1728821727596!5m2!1sen!2sbd"
            style={{ border: 0 }}
            title="Travex Location"
            width="100%"
          />
        </Card>
      </div>
    </div>
  );
}
