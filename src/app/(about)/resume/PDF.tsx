import resumeJson from "@/assets/json/resume.json";
import ContactRow from "./ContactRow";
import HR from "./HR";
import Skill from "./Skill";
import Experience from "./Experience";
import Education from "./Education";
import Language from "./Language";

interface SectionTitleProps {
  title: string;
}
const SectionTitle = ({ title }: SectionTitleProps) => {
  return (
    <span className="w-full font-bold text-[0.5rem] text-left mb-1">
      {title}
    </span>
  );
};

const PDF = () => {
  return (
    <div className="text-black text-[16px] bg-white font-sans w-[430px] flex flex-col justify-start items-center px-11">
      <span className="text-[0.75rem]/3 font-bold w-full text-center">
        {resumeJson.header.name}
      </span>
      <span className="text-[0.5rem]/3 mb-2 w-full text-center">
        Software developer
      </span>
      <HR classes="w-full mb-1" />
      <ContactRow
        item0={{
          image: "/images/resume/map-pin.png",
          text: resumeJson.header.location,
        }}
        item1={{
          image: "/images/resume/mail.png",
          text: resumeJson.header.email,
          isEmail: true,
        }}
      />
      <ContactRow
        item0={{
          image: "/images/resume/smartphone.png",
          text: resumeJson.header.cellphone,
        }}
        item1={{
          image: "/images/resume/globe.png",
          text: resumeJson.header.website,
          isLink: true,
        }}
      />
      <ContactRow
        item0={{
          image: "/images/resume/github.png",
          text: resumeJson.header.github,
          isLink: true,
        }}
        item1={{
          image: "/images/resume/InBug-Black.png",
          text: resumeJson.header.linkedin,
          isLink: true,
        }}
      />
      <HR classes="w-full" />
      <span className="text-[0.4rem] mb-2 [word-spacing: -5px]">
        {resumeJson.summary}
      </span>
      <HR classes="w-full mb-1" />
      <div className="w-full flex justify-start items-center">
        <span className="font-bold text-[0.4rem] text-left">
          Domains of Experience:&nbsp;
        </span>
        <span className="text-[0.4rem] text-left">
          {resumeJson.domains.join(", ")}
        </span>
      </div>

      <HR classes="w-full mt-1" />
      <SectionTitle title="Skills" />
      {resumeJson.skills.map((skill, index) => (
        <Skill title={skill.title} skills={skill.skills} key={index} />
      ))}
      <HR classes="w-full my-2" />
      <SectionTitle title="Professional Background" />
      {resumeJson.professionalExperience.map((item, index) => (
        <Experience {...item} key={index} />
      ))}
      <HR classes="w-full my-2" />
      <SectionTitle title="Academic Background" />
      {resumeJson.education.map((bg, index) => (
        <Education title={bg} key={index} />
      ))}
      <HR classes="w-full my-2" />
      <SectionTitle title="Languages" />
      {resumeJson.languages.map((language, index) => (
        <Language {...language} key={index} />
      ))}
    </div>
  );
};

export default PDF;
