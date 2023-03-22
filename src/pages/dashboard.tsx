import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { Context } from "../context";
import Head from "next/head";
import { Item, Count } from "../types";
import { items } from "../constants";


export default function Landing() {
  const router = useRouter();
  const [title, setTitle] = useState("Processed");
  const { cartItems, setCartItems } = useContext(Context);

  //use effect to sort all the items by categories. will need new states for each category
  const [processedItems, setProcessedItems] = useState(
    items.filter((item) => item.category === "Processed")
  );
  const [packagedItems, setPackagedItems] = useState(
    items.filter((item) => item.category === "Packaged")
  );
  const [bulkItems, setBulkItems] = useState(
    items.filter((item) => item.category === "Bulk")
  );

  const [currentItems, setCurrentItems] = useState(processedItems);

  const handleAddItem = (e: any) => {
    const id: number = parseInt(e.target.id);
    setCartItems((prev: Count) => {
      let newCartItems = { ...prev };
      if (newCartItems[id]) {
        newCartItems[id] += 1;
      } else {
        newCartItems[id] = 1;
      }
      return newCartItems;
    });
  };

  const handleButtonClick = (buttonNumber: number) => {
    switch (buttonNumber) {
      case 1:
        setTitle("Processed");
        setCurrentItems(processedItems);
        break;
      case 2:
        setTitle("Packaged");
        setCurrentItems(packagedItems);
        break;
      case 3:
        setTitle("Bulk");
        setCurrentItems(bulkItems);
        break;
    }
  };

  const buttonStyle = "text-white font-bold py-2 px-4 rounded hover:bg-gray-800";

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div className="flex">
        {/* Sidebar */}
        <div className="bg-gray-900 h-screen w-48 flex flex-col justify-between">
          <div className="flex flex-col mt-8">
            <button
              className={
                buttonStyle + `${title === "Processed" ? " bg-gray-700" : ""}`
              }
              onClick={() => handleButtonClick(1)}
            >
              Processed
            </button>
            <button
              className={
                buttonStyle + `${title === "Packaged" ? " bg-gray-700" : ""}`
              }
              onClick={() => handleButtonClick(2)}
            >
              Packaged
            </button>
            <button
              className={
                buttonStyle + `${title === "Bulk" ? " bg-gray-700" : ""}`
              }
              onClick={() => handleButtonClick(3)}
            >
              Bulk
            </button>
          </div>
          <div className="flex justify-center mb-8">
            <button
              onClick={() => {
                router.push("/");
              }}
              className="text-white font-bold py-2 px-4 rounded hover:bg-gray-800"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className="flex flex-col flex-1 p-10">
          <div className="grid grid-cols-2 items-center">
            <h1 className="text-3xl font-bold mb-8">{title}</h1>
            <h2
              onClick={() => router.push("/cart")}
              className="cursor-pointer hover:underline text-end text-xl font-bold mb-8"
            >
              Cart
            </h2>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {currentItems.map((item) => (
              <div className="bg-white rounded-lg shadow-lg p-4">
                <h2 className="text-xl font-bold">{item.name}</h2>
                <p className="text-gray-600">${item.price}</p>
                <div className="text-end">
                  <button
                    id={"" + item.id}
                    className="px-2 py-1 bg-blue-800 hover:bg-blue-400 text-white rounded "
                    onClick={(e) => handleAddItem(e)}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
