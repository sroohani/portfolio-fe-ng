"use client";

import { useProjectsStore } from "@/components/store";
import Image from "next/image";
import React from "react";
import { SiGithub, SiNpm } from "@icons-pack/react-simple-icons";
import { AppWindow } from "lucide-react";
import { FaExternalLinkAlt } from "react-icons/fa";

interface Props {
  projectId: number;
}

const Details = ({ projectId }: Props) => {
  const { projects } = useProjectsStore();

  const project = projects.find((prj) => prj.id === projectId);
  if (project) {
    return (
      <div className="flex flex-col justify-start items-start gap-2 px-2">
        <span className="self-center font-bold text-xl sm:text-2xl mb-2 pb-2 border-b">
          {project.name}
        </span>
        <a
          href={
            project.img ||
            "https://www.pexels.com/photo/codes-on-tilt-shift-lens-2004161/"
          }
          target="_blank"
          title={
            project.img
              ? "Click to view the full-size image"
              : "This project doesn't have an image.\nPhoto by Markus Spiske from Pexels"
          }
          className="self-center mb-4"
        >
          <Image
            src={project.img || "/images/no-image.jpg"}
            width={200}
            height={200}
            alt="Project image"
            className="w-auto"
            priority
          />
        </a>
        {project.shortDescription && (
          <p className="mb-4 text-lg">{project.shortDescription}</p>
        )}
        {project.longDescription && (
          <p className="mb-4">{project.longDescription}</p>
        )}
        {project.techStack?.length && (
          <>
            <div className="text-xl my-4 border-b">Technology stack</div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-[98%] mx-auto p-2">
              {project.techStack.map((tech, index) => (
                <div className="border p-2" key={`tech-${index}`}>
                  {tech}
                </div>
              ))}
            </div>
          </>
        )}
        <div className="text-xl my-4 border-b">Project links</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              title="Source code on GitHub"
              className="flex justify-start items-center gap-4"
            >
              <SiGithub />
              <span>Source code on GitHub</span>
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              title="View live"
              className="flex justify-start items-center gap-4"
            >
              <AppWindow />
              <span>View live</span>
            </a>
          )}
          {project.npm && (
            <a
              href={project.npm}
              target="_blank"
              title="Package on npm"
              className="flex justify-start items-center gap-4"
            >
              <SiNpm />
              <span>Package on npm</span>
            </a>
          )}
        </div>
        {project.references && (
          <>
            <div className="text-xl my-4 border-b">References</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {project.references.map((r) => (
                <a
                  href={r.link}
                  target="_blank"
                  title={r.description}
                  className="flex justify-start items-center gap-4"
                  key={project.id}
                >
                  <FaExternalLinkAlt />
                  <span>{r.description}</span>
                </a>
              ))}
            </div>
          </>
        )}
      </div>
    );
  }

  return <div>Project not found</div>;
};

export default Details;
