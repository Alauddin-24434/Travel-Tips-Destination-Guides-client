import { FaUsers, FaBullseye, FaMapMarkedAlt, FaHandsHelping } from "react-icons/fa";
import Container from "@/components/ui/Container";

const AboutUsPage = () => {
  return (
    <Container>
      <div className="py-12 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-green-600 mb-6">
          About Us
        </h1>

        <p className="text-lg text-center  mb-12">
          Discover who we are and what drives our passion for travel.
        </p>

        {/* Who We Are */}
        <section className="mb-10">
          <div className="flex items-center mb-4">
            <FaUsers className="text-3xl text-green-600 mr-3"/>
            <h2 className="text-2xl font-semibold text-green-600">
              Who We Are
            </h2>
          </div>
          <p className="text-base ">
            At <strong>Your Company Name</strong>, we are passionate about helping travelers
            explore the world with ease and confidence. Founded in [year], we have built a community
            of adventurers who seek more than just ordinary trips — they want unforgettable
            experiences. Our platform provides access to premium travel guides, personalized
            recommendations, and exclusive content to help our users get the most out of every journey.
          </p>
        </section>

        {/* Our Mission */}
        <section className="mb-10">
          <div className="flex items-center mb-4">
            <FaBullseye className="text-3xl text-green-600 mr-3" />
            <h2 className="text-2xl font-semibold text-green-600">
              Our Mission
            </h2>
          </div>
          <p className="text-base ">
            Our mission is simple: <strong>to inspire and empower people to travel more</strong>.
            We believe that travel broadens the mind and enriches the soul, and we are dedicated
            to providing the tools, resources, and support to make every trip extraordinary.
            Whether you are a weekend explorer or a seasoned traveler, we’re here to help you
            discover new destinations and experience the world like never before.
          </p>
        </section>

        {/* What We Offer */}
        <section className="mb-10">
          <div className="flex items-center mb-4">
            <FaMapMarkedAlt className="text-3xl text-green-600 mr-3" />
            <h2 className="text-2xl font-semibold text-green-600">
              What We Offer
            </h2>
          </div>
          <ul className="list-disc pl-6 text-base ">
            <li>Expert Travel Guides: Our handpicked travel guides give you insider tips and must-see spots.</li>
            <li>Personalized Travel Experiences: From customized itineraries to exclusive deals.</li>
            <li>Premium Content: Access exclusive content, travel webinars, and early access to new features.</li>
            <li>Sustainable Travel: Promoting responsible tourism to protect and respect local communities.</li>
          </ul>
        </section>

        {/* Why Choose Us */}
        <section className="mb-10">
          <div className="flex items-center mb-4">
            <FaHandsHelping className="text-3xl text-green-600 mr-3" />
            <h2 className="text-2xl font-semibold text-green-600">
              Why Choose Us
            </h2>
          </div>
          <p className="text-base ">
            <strong>Trusted by Travelers</strong>: With over [X] satisfied customers, we’re committed to making your travel dreams a reality.<br />
            <strong>Innovative Platform</strong>: Our user-friendly platform offers seamless integration of travel tools.<br />
            <strong>Dedicated Support</strong>: Our team of travel experts is always ready to assist with any questions.
          </p>
        </section>

        {/* Join Our Journey */}
        <section className="mb-10">
          <div className="flex items-center mb-4">
            <FaMapMarkedAlt className="text-3xl text-green-600 mr-3" />
            <h2 className="text-2xl font-semibold text-green-600">
              Join Our Journey
            </h2>
          </div>
          <p className="text-base ">
            Join the <strong>Your Company Name</strong> community and start exploring the world like never before. Let us guide you to your next great adventure!
          </p>
        </section>
      </div>
    </Container>
  );
};

export default AboutUsPage;
