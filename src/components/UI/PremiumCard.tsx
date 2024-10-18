import { Button } from "@nextui-org/button";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { useRouter } from "next/navigation";
import { FaCrown } from "react-icons/fa";

const PremiumCard = () => {
  const router = useRouter();

  return (
    <div className="fixed inset-0 z-[999] bg-black/70 backdrop-blur-lg flex items-center justify-center p-4">
      <Card className="w-full max-w-md transition-transform transform hover:scale-105 shadow-lg border border-gray-300 bg-gradient-to-r from-green-400 to-blue-500">
        <CardHeader className="flex flex-col items-center gap-3 py-6">
          <FaCrown className="text-5xl text-yellow-300" />
          <h2 className="text-2xl font-bold text-white">Unlock Premium Content</h2>
        </CardHeader>

        <CardBody className="flex flex-col items-center justify-center py-4 px-6">
          {/* Description */}
          <p className="text-sm text-white mb-6 text-center">
            Enjoy exclusive content and features by upgrading to our premium subscription. Experience the best we have to offer!
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center w-full">
            <Button
              className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-600 text-white font-bold transition"
              size="lg"
              onClick={() => router.push("/subscription")}
            >
              Upgrade Now
            </Button>
            <Button
              className="w-full sm:w-auto border border-white text-white hover:bg-white hover:text-black transition"
              size="lg"
              variant="bordered"
              onClick={() => router.back()}
            >
              Go Back
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default PremiumCard;
