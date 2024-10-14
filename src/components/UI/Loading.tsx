import { RotateLoader } from "react-spinners";
const Loading = () => {
  return (
    <div className=" h-screen bg-black/10 fixed inset-0 backdrop-blur-md z-[999] flex justify-center items-center">
      <RotateLoader color="#1877F2" size={20} />
    </div>
  );
};

export default Loading;
