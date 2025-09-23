import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

const LandingPage = () => {
  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-20 mt-8 text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl font-bold mb-6">Welcome to MetaData</h2>
          <p className="text-lg mb-8">
            A place to share knowledge, ask questions, and connect with the
            community about Poultry.
          </p>
          <Link
            to="/forum"
            className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            Explore Forum
          </Link>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-blue-600 text-white text-center">
        <h3 className="text-3xl font-bold mb-6">Join the Conversation Today</h3>
        <p className="mb-8 text-lg">
          Be part of a growing community and start your journey now.
        </p>
        <Link
          to="/forum"
          className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-200 transition"
        >
          Get Started
        </Link>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
