import Container from "@/components/ui/Container";
import SubscriptionCard from "@/components/ui/SubscriptionCard";


const subscriptionPlans = [
  {
    title: "Explorer Plan (1 Day)",
    price: "99",
    features: [
      "Access to premium travel guides",
      "Create and view premium content",
      "Ad-free experience",
    ],
    expiry: "1 Day",
    recommended: false,
  },
  {
    title: "Explorer Plan (7 Days)",
    price: "299",
    features: [
      "Access to premium travel guides",
      "Create and view premium content",
      "Ad-free experience",
      "Personalized travel recommendations",
    ],
    expiry: "7 Days",
    recommended: true,
  },
  {
    title: "Explorer Plan (1 Month)",
    price: "499",
    features: [
      "All 7 Days Plan features",
      "Exclusive travel webinars",
      "Early access to new features",
      "Discounts on partner hotels",
    ],
    expiry: "1 Month",
    recommended: false,
  },
];

const SubscriptionPage = () => {
  return (
    <Container>
      <h1 className="text-4xl md:text-5xl font-bold text-center text-primary mb-4">
        Choose Your Travel Adventure
      </h1>
      <p className="text-xl text-center text-default-600 mb-12">
        Unlock premium features and content to enhance your travel experience
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {subscriptionPlans.map((plan, index) => (
          <SubscriptionCard
            key={index}
            expiry={plan.expiry}
            features={plan.features}
            price={plan.price}
            recommended={plan.recommended}
            title={plan.title}
          />
        ))}
      </div>
    </Container>
  );
};

export default SubscriptionPage;
