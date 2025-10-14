"use client";

import { createRoot } from "react-dom/client";
import { flushSync } from "react-dom";
import { Download } from "lucide-react";
import { FaUniversity } from "react-icons/fa";
import { VscProject } from "react-icons/vsc";
import { contactLinks, resData } from "@/components/server-constants";
import Card from "@/components/Card";
import Contactbar from "@/components/Contactbar";
import IconButton from "@/components/IconButton";
import PDF from "./PDF";
import { jsPDF } from "jspdf";

const Content = () => {
  const handleDownload = () => {
    const div = document.createElement("div");
    const root = createRoot(div);
    flushSync(() => {
      root.render(<PDF />);
    });

    const doc = new jsPDF({ orientation: "p", format: "a4", unit: "px" });
    doc.html(div.innerHTML.toString(), {
      callback: (doc) => {
        doc.save("Shahram Roohani - CV.pdf");
        root.unmount();
      },
      x: 0,
      y: 0,
      autoPaging: "text",
      margin: [35, 0, 35, 0],
    });
  };

  return (
    <div className="relative flex flex-col justify-start items-start w-full px-8 py-4">
      <div className="flex justify-between items-center w-full pb-4 border-b">
        <span className="text-xl">{resData.header.name}</span>
        <div className="h-4 w-4">
          <IconButton
            id={0}
            icon={Download}
            title="Download my resume"
            onClick={handleDownload}
          />
        </div>
      </div>
      <Contactbar contactLinks={contactLinks} />
      <p className="py-4 border-b mb-2">{resData.summary}</p>
      <div className="w-full border-b py-2 mb-4">
        <span className="font-bold text-xl">Domains of Experience:&nbsp;</span>
        <span className="text-lg">{resData.domains.join(", ")}</span>
      </div>
      <Card
        title="Skills"
        containerClasses="w-full mb-4"
        titleClasses="font-bold"
        contentHeight={300}
        collapsible
      >
        {resData.skills.map((skill) => (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 w-[80%] p-4 not-last:border-b justify-self-center"
            key={skill.title}
          >
            <div className="font-bold pb-2 underline underline-offset-8 sm:no-underline">
              {skill.title}
            </div>
            <div>{skill.skills.join(", ")}</div>
          </div>
        ))}
      </Card>

      <Card
        title="Professional experience"
        containerClasses="w-full mb-4"
        titleClasses="font-bold"
        contentHeight={450}
        collapsible
      >
        {resData.professionalExperience.map((exp, index) => (
          <div
            className="flex flex-col justify-start items-center w-full p-2 border-b"
            key={`exp-${index}`}
          >
            <span className="text-center w-full border-b mb-4 pb-2">
              {exp.from}&nbsp;to&nbsp;{exp.to}
            </span>
            <span className="font-bold self-start pl-2 mb-2">Companies</span>
            <span className="self-start pl-4 mb-2">
              {exp.companies.join(", ")}
            </span>
            <hr className="w-[80%] h-[1px] my-2" />

            <span className="font-bold self-start pl-2 mb-2">Positions</span>
            <span className="self-start pl-4 mb-2">
              {exp.positions.join(", ")}
            </span>
            <hr className="w-[80%] h-[1px] my-2" />

            <span className="font-bold self-start pl-2 mb-2">Projects</span>
            {exp.projects.map((prj, index) => (
              <div
                className="flex justify-start items-center gap-2 w-full pl-4 mb-4"
                key={`prj-${index}`}
              >
                <div className="w-4 h-4">
                  <VscProject />
                </div>
                <span>{prj}</span>
              </div>
            ))}
          </div>
        ))}
      </Card>

      <Card
        title="Education"
        containerClasses="w-full mb-4"
        titleClasses="font-bold"
        contentHeight={150}
        collapsible
      >
        <div className="grid grid-cols-1 p-4 gap-4">
          {resData.education.map((e, index) => (
            <div
              className="flex justify-start items-center gap-2"
              key={`education-${index}`}
            >
              <div className="w-4 h-4">
                <FaUniversity />
              </div>
              <span>{e}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card
        title="Languages"
        containerClasses="w-full mb-4"
        titleClasses="font-bold"
        contentHeight={250}
        collapsible
      >
        {resData.languages.map((lang) => (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 w-[80%] p-4 not-last:border-b justify-self-center"
            key={lang.name}
          >
            <div className="font-bold pb-2 underline underline-offset-8 sm:no-underline">
              {lang.name}
            </div>
            <div>{lang.level}</div>
          </div>
        ))}
      </Card>
    </div>
  );
};

export default Content;
