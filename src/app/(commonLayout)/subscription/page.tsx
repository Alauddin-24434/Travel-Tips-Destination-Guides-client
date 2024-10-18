import Container from "@/components/ui/Container";
import SubscriptionCard from "@/components/ui/SubscriptionCard";

const subscriptionPlans = [
  {
    title: "Explorer Plan (7 Days)",
    price: "49",
    features: [
      "Access to premium travel guides",
      "Create and view premium content",
      "Ad-free experience",
    ],
    expiry: "7 Days",
isAvailable:true
  },
  {
    title: "Explorer Plan (15 Days)",
    price: "150",
    features: [
      "Access to premium travel guides",
      "Create and view premium content",
      "Early access to new features",
      "Personalized travel recommendations",
    ],
    expiry: "15 Days",
    isAvailable:false
  },
  {
    title: "Explorer Plan (1 Month)",
    price: "299",
    features: [
      "All 7 Days Plan features",
      "Exclusive travel webinars",
      "Early access to new features",
      "Discounts on partner hotels",
    ],
    expiry: "1 Month",
    isAvailable:true
  },
];

const SubscriptionPage = () => {
  return (
    <Container>
      <h1 className="text-4xl md:text-5xl font-bold text-[#1CD15D] mb-4 text-center">
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
            isAvailable={plan.isAvailable}
            title={plan.title}
          />
        ))}
      </div>
    </Container>
  );
};

export default SubscriptionPage;
