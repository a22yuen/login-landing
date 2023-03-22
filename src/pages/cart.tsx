import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { Context } from "@/context";
import { Count, Item } from "@/types";
import { items } from "@/constants";
import Image from "next/image";

const Arrow = () => (
  <Image src="/images/caret-right.svg" width={20} height={20} alt="arrow" />
);

export default function Cart() {
  const router = useRouter();
  const { cartItems, setCartItems } = useContext(Context);
  // const [counter, setCounter] = useState<Count>({});
  const [processedItems, setProcessedItems] = useState<number[]>([]);
  const [packagedItems, setPackagedItems] = useState<number[]>([]);
  const [bulkItems, setBulkItems] = useState<number[]>([]);

  const [toggleProcessed, setToggleProcessed] = useState<boolean>(false);
  const [togglePackaged, setTogglePackaged] = useState<boolean>(false);
  const [toggleBulk, setToggleBulk] = useState<boolean>(false);

  const toggle = (category: string) => {
    switch (category) {
      case "Processed":
        setToggleProcessed(!toggleProcessed);
        break;
      case "Packaged":
        setTogglePackaged(!togglePackaged);
        break;
      case "Bulk":
        setToggleBulk(!toggleBulk);
        break;
    }
  };

  useEffect(() => {
    const noDups = Object.keys(cartItems).map((item) => parseInt(item));

    setProcessedItems(
      noDups.filter((item: number) => items[item].category == "Processed")
    );
    setPackagedItems(
      noDups.filter((item: number) => items[item].category === "Packaged")
    );
    setBulkItems(
      noDups.filter((item: number) => items[item].category === "Bulk")
    );
  }, [cartItems]);

  const handleRemoveItem = (id: number) => {
    setCartItems((prev: Count) => {
      let newCounter = { ...prev };
      if (newCounter[id] === 1) {
        delete newCounter[id];
      } else {
        newCounter[id] -= 1;
      }
      return newCounter;
    });
  };

  const handleAddItem = (id: number) => {
    setCartItems((prev: Count) => {
      let newCounter = { ...prev };
      newCounter[id] += 1;
      return newCounter;
    });
  };

  const Tag = ({ id }: { id: number }) => {
    return (
      cartItems[id] > 0 && (
        <div key={id} className="flex items-center py-2 border-b">
          <div className="w-1/2">{items[id].name}</div>
          <div className="w-1/4">${items[id].price}</div>
          <div className="w-1/4 flex items-center">
            <button
              className="py-1 px-2 bg-red-500 text-white rounded-lg mr-2"
              onClick={() => handleRemoveItem(id)}
            >
              -
            </button>
            <span>{cartItems[id]}</span>
            <button
              className="py-1 px-2 bg-green-500 text-white rounded-lg ml-2"
              onClick={() => handleAddItem(id)}
            >
              +
            </button>
          </div>
        </div>
      )
    );
  };

  return (
    <div className="max-w-xl pt-7 mx-auto">
      <div className="flex items-center mb-4">
        <h2 className="flex-auto text-2xl font-bold ml-4">Cart</h2>
        <button
          onClick={() => {
            router.push("/dashboard");
          }}
          className="py-2 px-4 bg-blue-800 text-white rounded-lg"
        >
          Back
        </button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-3">
          <div className="px-6 py-3 pb-4">
            <div onClick={() => toggle("Processed")} className="relative justify-center flex items-center border-2 border-gray-300 p-4 py-2 rounded-lg">
              <div
                className={`absolute left-4 transform ${
                  toggleProcessed ? "rotate-90" : ""
                } transition duration-200`}
              >
                <Arrow />
              </div>
              <h2 className="flex-1 text-center">Processed</h2>
            </div>
            <div
              className={`bg-gray-200 p-4 ${
                toggleProcessed ? " opacity-100" : "hidden opacity-0"
              }`}
            >
              {processedItems.map((item: number) => (
                <Tag id={item} />
              ))}
            </div>
          </div>
          <div className="px-6 py-3 pb-4">
            <div onClick={() => toggle("Packaged")} className="relative justify-center flex items-center border-2 border-gray-300 p-4 py-2 rounded-lg">
              <div
                className={`absolute left-4 transform ${
                  togglePackaged ? "rotate-90" : ""
                } transition duration-200`}
              >
                <Arrow />
              </div>
              <h2 className="flex-1 text-center">Packaged</h2>
            </div>
            <div
              className={`bg-gray-200 p-4 ${
                togglePackaged ? " opacity-100" : "hidden opacity-0"
              }`}
            >
              {packagedItems.map((item: number) => (
                <Tag id={item} />
              ))}
            </div>
          </div>
          <div className="px-6 py-3 pb-4">
            <div onClick={() => toggle("Bulk")} className="relative justify-center flex items-center border-2 border-gray-300 p-4 py-2 rounded-lg">
              <div
                className={`absolute left-4 transform ${
                  toggleBulk ? "rotate-90" : ""
                } transition duration-200`}
              >
                <Arrow />
              </div>
              <h2 className="flex-1 text-center">Bulk</h2>
            </div>
            <div
              className={`bg-gray-200 p-4 ${
                toggleBulk ? " opacity-100" : "hidden opacity-0"
              }`}
            >
              {bulkItems.map((item: number) => (
                <Tag id={item} />
              ))}
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="p-4 bg-gray-100 rounded-lg">
            <div className="text-lg font-bold mb-2">Summary</div>
            <div className="flex justify-between font-bold mt-2">
              <div>Total:</div>
              <div>
                $
                {Object.keys(cartItems)
                  .reduce((acc, item) => {
                    return acc + items[item].price * cartItems[item];
                  }, 0)
                  .toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
