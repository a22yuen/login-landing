import Header from "@/components/Header";
import { useRouter } from "next/router";
import Image from "next/image";
import { useState } from "react";

const Arrow = () => (
  <Image src="/images/caret-right.svg" width={20} height={20} alt="arrow" />
);

export default function Details() {
  const router = useRouter();
  const [showDiv1, setShowDiv1] = useState(false);
  const [showDiv2, setShowDiv2] = useState(false);

  const toggleDiv1 = () => {
    setShowDiv1(!showDiv1);
  };
  
  const toggleDiv2 = () => {
    setShowDiv2(!showDiv2);
  };

  return (
    <div className="bg-gray-100 h-screen">
      <Header />
      <div className="flex flex-col items-center justify-center px-6 py-10  mx-auto">
        <div className="w-full bg-white rounded-lg shadow mt-0 max-w-md ">
          <div className="p-6 space-y-6">
            <h1 className="text-center text-2xl font-bold  text-gray-900">
              Details
            </h1>
          </div>

            <div onClick={toggleDiv1} className="px-6 py-3">
              <div
                className="relative justify-center flex items-center border-2 border-gray-300 p-4 py-2 rounded-lg"
              >
                <div
                  className={`absolute left-4 transform ${
                    showDiv1 ? "rotate-90" : ""
                  } transition duration-200`}
                >
                  <Arrow />
                </div>
                <h2 className="flex-1 text-center">Details</h2>
              </div>
              <div
                className={`bg-gray-200 p-4 ${
                  showDiv1 ? " opacity-100" : "hidden opacity-0"
                }`}
              >
                <p>Lorem ipsum</p>
              </div>
              </div>
            <div onClick={toggleDiv2} className="px-6 py-3 pb-4">
              <div
                className="relative justify-center flex items-center border-2 border-gray-300 p-4 py-2 rounded-lg"
              >
                <div
                  className={`absolute left-4 transform ${
                    showDiv2 ? "rotate-90" : ""
                  } transition duration-200`}
                >
                  <Arrow />
                </div>
                <h2 className="flex-1 text-center">Details</h2>
              </div>
              <div
                className={`bg-gray-200 p-4 ${
                  showDiv2 ? " opacity-100" : "hidden opacity-0"
                }`}
              >
                <p>Lorem ipsum</p>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}
