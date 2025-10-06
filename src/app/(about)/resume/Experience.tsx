import HR from "./HR";
import Image from "next/image";

interface Props {
  from: string;
  to: string;
  companies: string[];
  positions: string[];
  projects: string[];
}
const Experience = ({ from, to, companies, positions, projects }: Props) => {
  return (
    <div className="w-full flex flex-col">
      <span className="text-center pb-1 w-full font-[700] text-[0.4rem]">
        {from} to {to}
      </span>
      <HR classes="w-[80%] self-center" />
      <span className="text-left w-full font-[700] text-[0.35rem] px-[0.8]">
        Companies:
      </span>
      <span className="text-left w-full font-[400] text-[0.35rem] px-[0.8] pb-1">
        {companies.join(", ")}
      </span>
      <span className="text-left w-full font-[700] text-[0.35rem] px-[0.8]">
        Positions:
      </span>
      <span className="text-left w-full font-[400] text-[0.35rem] px-[0.8] pb-1">
        {positions.join(", ")}
      </span>
      <span className="text-left w-full font-[700] text-[0.35rem] px-[0.8] pb-1">
        Projects:
      </span>
      {projects.map((project, index) => (
        <div className="flex justify-start items-center h-2 mb-1" key={index}>
          <Image
            src="/images/resume/chevron-right.png"
            width={6}
            height={6}
            alt="Chevron right"
          />
          <span className="text-left w-full font-[400] text-[0.3rem] px-[0.8] pb-2">
            {project}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Experience;
