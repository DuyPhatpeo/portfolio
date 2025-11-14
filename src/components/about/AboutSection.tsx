import React from "react";
import AboutHeader from "./AboutHeader";
import AvatarBio from "./AvatarBio";
import PersonalInfo from "./PersonalInfo";
import Achievements from "./Achievements";
import Quote from "./Quote";

const AboutSection: React.FC = () => (
  <section
    id="about"
    className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20 md:scroll-mt-24"
  >
    <AboutHeader />
    <AvatarBio />
    <PersonalInfo />
    <Achievements />
    <Quote />
  </section>
);

export default AboutSection;
