import React, { useState } from "react";
import { SuccessMessage, ErrorMessage } from "./Messages";
import ReactLoading from "react-loading";
import axios from "axios";

const Header = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);
  const [items, setItems] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    const response = await axios.post(
      "/api/proxy?proxyRoute=clotherget",
      {
        action: "getall",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      setShow(true);
    }

    const { products } = response.data;

    const filteredItems = products.filter(
      (item) =>
        item.Name.toLowerCase().includes(query) ||
        item.Description.toLowerCase().includes(query)
    );
    setLoading(false);

    console.log(filteredItems);

    if (filteredItems.length > 0) setSuccess(true);
    setItems(filteredItems);
  };

  return (
    <div className="min-h-screen bg-white mt-16">
      <div className="max-w-screen-xl mx-auto px-4 xl:px-0">
        <div className="flex flex-col items-center">
          <img className="w-64" src="/images/earth.svg" alt="Earth" />
          <h1 className="text-center font-extrabold text-primary text-4xl mt-16">
            Find clothing you need in most sustainable way
          </h1>
          <div className="w-full max-w-screen-md mt-12">
            <div className="flex flex-row items-stretch space-x-8">
              <input
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-white px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary border-[3px] border-gray-300 focus:border-primary rounded-md"
                type="text"
                placeholder="Search for an item"
              />
              <button
                onClick={handleSubmit}
                className="bg-primary text-white rounded-lg font-bold px-6"
              >
                Search
              </button>
            </div>
            {loading && (
              <div className="w-full text-center flex justify-center mt-12 transform -translate-x-5">
                <ReactLoading type="cubes" color="#1EBB90" />
              </div>
            )}
          </div>
        </div>
      </div>
      {show && query && (
        <main className="mt-48">
          {success ? (
            <SuccessMessage title={`Showing results for “${query}”`} />
          ) : (
            <ErrorMessage
              title={`Showing results for “${query}” is not available`}
            />
          )}

          {items && (
            <div className="max-w-screen-md mx-auto mt-16 mb-24">
              <h2 className="text-center text-primary font-bold text-2xl">
                Showing items based on the eco-rating
              </h2>
              <div className="mt-12">
                <div className="flex flex-col space-y-12">
                  {items.map((i, idx) => (
                    <a
                      rel="noopener noreferrer"
                      target="_blank"
                      href={i.link}
                      key={idx}
                      className="relative bg-white py-8 px-4 rounded-lg border-2 border-gray-400"
                    >
                      <div className="flex flex-row items-center">
                        <img className="w-24 mr-8" src={i.img} alt="Shirt" />
                        <div className="flex flex-col justify-start">
                          <h3 className="text-secondary text-xl font-semibold">
                            {i.Name}
                          </h3>
                          <div className="flex flex-row items-center space-x-1">
                            {Array.from({ length: 5 }, (_, i) => i + 1).map(
                              (_, idx) => (
                                <img
                                  className="w-4 h-4"
                                  key={idx}
                                  src="/images/star.svg"
                                  alt="Star"
                                />
                              )
                            )}
                            <p className="text-gray-700 text-sm transform translate-x-2 mt-1">
                              {Math.floor(
                                Math.random() * (1000 - 400 + 1) + 400
                              )}{" "}
                              reviews
                            </p>
                          </div>
                          <p className="text-gray-600">Ship from the US</p>
                        </div>
                      </div>
                      <div className="absolute bottom-0 right-0 m-4">
                        {parseInt(i.overall) >= 8 ? (
                          <div className="flex items-center flex-row">
                            <img
                              className="w-6 h-6 flex-shrink-0"
                              src="/images/medium.svg"
                              alt=""
                            />
                            <h5 className="text-primary text-xl ml-2">Good</h5>
                          </div>
                        ) : parseInt(i.overall) >= 5 ? (
                          <div className="flex items-center flex-row">
                            <img
                              className="w-6 h-6 flex-shrink-0"
                              src="/images/medium.svg"
                              alt=""
                            />
                            <h5 className="text-yellow-500 text-xl ml-2">
                              Medium
                            </h5>
                          </div>
                        ) : (
                          <div className="flex items-center flex-row">
                            <img
                              className="w-6 h-6 flex-shrink-0"
                              src="/images/bad.svg"
                              alt=""
                            />
                            <h5 className="text-primary-red text-xl ml-2">
                              Low
                            </h5>
                          </div>
                        )}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      )}
    </div>
  );
};

export default Header;
