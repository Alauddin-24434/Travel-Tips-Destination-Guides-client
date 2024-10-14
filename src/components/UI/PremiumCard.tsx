import { Button } from "@nextui-org/button";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { useRouter } from "next/navigation";
import { FaCrown } from "react-icons/fa";

const PremiumCard = () => {
  const router = useRouter();

  return (
    <div className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-lg flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col items-center gap-3 py-6">
          <FaCrown className="text-4xl text-yellow-400" />
          <h2 className="text-3xl font-bold">Unlock Premium Content</h2>
        </CardHeader>

        <CardBody className="flex flex-col items-center justify-center py-4 px-6">
          <p className="text-lg text-default-600 mb-6 text-center">
            Gain access to exclusive travel content, personalized
            recommendations, and more. Upgrade now to enhance your travel
            experience!
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center w-full">
            <Button
              className="w-full sm:w-auto"
              color="primary"
              size="lg"
              onClick={() => router.push("/subscription")}
            >
              Upgrade Now
            </Button>
            <Button
              className="w-full sm:w-auto"
              size="lg"
              variant="bordered"
              onClick={() => router.back()}
            >
              Go Back
            </Button>
          </div>
        </CardBody>

        <CardFooter className="flex justify-center py-4">
          <p className="text-sm text-default-500 text-center">
            Join our premium community and unlock a world of exclusive travel
            insights and experiences!
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PremiumCard;
