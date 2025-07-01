import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/frontendAssets/assets.js";
import Newsletter from "../components/Newsletter.jsx";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img className="w-full max-w-[450px]" src={assets.about_img} alt="" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis,
            molestiae, hic molestias nostrum deleniti ipsam sapiente facilis rem
            quam cumque officia architecto eos dicta porro at ex fugiat
            laudantium tempora earum non, alias eum? Est sit ab aspernatur
            inventore laboriosam.
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque
            quisquam quae sapiente deserunt nihil eum incidunt recusandae, hic
            similique autem!
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque,
            corrupti!
          </p>
        </div>
      </div>
      <div className="text-4xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo,
            minus!
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo,
            minus!
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service:</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo,
            minus!
          </p>
        </div>
      </div>
      <Newsletter />
    </div>
  );
};

export default About;
