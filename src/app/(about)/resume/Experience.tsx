/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import HR from "./HR";

interface Props {
  from: string;
  to: string;
  companies: string[];
  positions: string[];
  projects: string[];
}
const Experience = ({ from, to, companies, positions, projects }: Props) => {
  return (
    <div className="flex flex-col mt-2 gap-1">
      <span className="text-center font-[700]">
        {from} to {to}
      </span>
      <HR classes="w-[80%] self-center" />
      <span className="text-left font-[700] pl-2">Companies:</span>
      <span className="text-left pl-2 mb-1">{companies.join(", ")}</span>
      <span className="text-left font-[700] pl-2">Positions:</span>
      <span className="text-left pl-2 mb-1">{positions.join(", ")}</span>
      <span className="text-left font-[700] pl-2">Projects:</span>
      {projects.map((project, index) => (
        <div
          className="flex justify-start items-center pl-2"
          key={`project-${index}`}
        >
          <img src="/images/resume/chevron-right.png" className="w-3 h-3" />
          <span className="text-left pl-2">{project}</span>
        </div>
      ))}
    </div>
  );
};

export default Experience;
