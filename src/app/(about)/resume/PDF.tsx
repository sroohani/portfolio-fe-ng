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
  return <span className="font-bold text-2xs mb-1">{title}</span>;
};

const PDF = () => {
  return (
    <div className="text-black bg-white text-2xs font-sans flex flex-col justify-start items-stretch w-[80%] mx-auto">
      <span className="text-sm font-bold text-center">
        {resumeJson.header.name}
      </span>
      <span className="text-center mb-2">Software developer</span>
      <HR />
      <ContactRow
        item0={{
          image: "/images/resume/map-pin.png",
          text: resumeJson.header.location,
          type: "link",
          href: resumeJson.header.map,
        }}
        item1={{
          image: "/images/resume/mail.png",
          text: resumeJson.header.email,
          type: "email",
        }}
      />
      <ContactRow
        item0={{
          image: "/images/resume/smartphone.png",
          text: resumeJson.header.cellphone,
          type: "tel",
        }}
        item1={{
          image: "/images/resume/globe.png",
          text: resumeJson.header.website,
          type: "link",
        }}
      />
      <ContactRow
        item0={{
          image: "/images/resume/github.png",
          text: resumeJson.header.github,
          type: "link",
        }}
        item1={{
          image: "/images/resume/InBug-Black.png",
          text: resumeJson.header.linkedin,
          type: "link",
        }}
      />
      <HR />
      <span className="my-2">{resumeJson.summary}</span>
      <HR />
      <div className="flex justify-start items-center my-2">
        <span className="font-bold">Domains of Experience:&nbsp;</span>
        <span>{resumeJson.domains.join(", ")}</span>
      </div>
      <HR />
      <SectionTitle title="Skills" />
      {resumeJson.skills.map((skill, index) => (
        <Skill
          title={skill.title}
          skills={skill.skills}
          key={`skill-${index}`}
        />
      ))}
      <HR />
      <SectionTitle title="Professional Background" />
      {resumeJson.professionalExperience.map((item, index) => (
        <Experience {...item} key={`experience-${index}`} />
      ))}
      <HR />
      <SectionTitle title="Academic Background" />
      {resumeJson.education.map((bg, index) => (
        <Education title={bg} key={`education-${index}`} />
      ))}
      <HR />
      <SectionTitle title="Languages" />
      {resumeJson.languages.map((language, index) => (
        <Language {...language} key={`language-${index}`} />
      ))}
    </div>
  );
};

export default PDF;
