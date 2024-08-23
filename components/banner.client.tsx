"use client";

import Image from "next/image";
import { MouseEventHandler } from "react";

const Banner = ({
  handleOnClick,
  buttonText,
}: {
  handleOnClick: MouseEventHandler<HTMLButtonElement> | undefined;
  buttonText: string;
}) => {
  return (
    <div className="flex flex-col-reverse">
      <div className="flex flex-col md:pt-12 gap-y-4">
        <h1 className="text-3xl md:text-5xl">
          <span className="pr-2">Coffee</span>
          <span className="text-gray-900">Connoisseur</span>
        </h1>
        <p className="font-sans text-xl font-semibold text-gray-900 md:mt-5 lg:text-2xl">
          Discover your local coffee shops!
        </p>
        <button onClick={handleOnClick}>{buttonText}</button>
      </div>
      <div className="z-10 md:pl-10 lg:right-1/4 lg:flex lg:pl-20">
        <Image
          src="/static/hero-image.webp"
          width={800}
          height={300}
          alt="hero image"
          priority={true}
        />
      </div>
    </div>
  );
};

export default Banner;
