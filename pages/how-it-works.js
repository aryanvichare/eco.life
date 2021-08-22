import Navbar from "@/components/Navbar";
import React from "react";

const HowItWorks = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-screen-xl mx-auto mt-16 px-4 xl:px-0 text-center">
        <div className="flex flex-col items-center">
          <h1 className="text-5xl font-extrabold text-primary">
            How it works?
          </h1>
          <div className="mt-12 flex flex-col items-center">
            <img className="w-24" src="/images/transparency.svg" alt="" />
            <h3 className="mt-12 text-primary text-2xl font-bold">
              Transparancy to the rating system
            </h3>
            <p className="prose md:prose-lg mt-4">
              Our app empowers you to make better shopping decisions. Choices
              that reflect your desire to do better for the environment, people,
              and animals. Fashion choices that ensure a long-term future. We
              believe fashion brands should be responsible for, and transparent
              about, their impact. What materials were used to make your
              garments, and how they fare on the problems that matter? Our
              rating system focus on the things that matter when it comes to
              fashion industry
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowItWorks;
