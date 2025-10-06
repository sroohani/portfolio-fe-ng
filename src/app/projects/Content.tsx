"use client";

import { useProjectsStore } from "@/components/store";
import Card from "@/components/Card";
import Image from "next/image";
import Navigate from "@/components/Navigate";
import { IoMdArrowForward } from "react-icons/io";

const Content = () => {
  const { projects } = useProjectsStore();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-4">
      {projects.map((project) => (
        <Card title={project.name} key={project.id} contentHeight={250}>
          <div className="flex flex-col justify-between items-center gap-2 p-4">
            <div className="h-[120px] w-[120px] border">
              <Image
                src={project.img || "/images/no-image.jpg"}
                width={120}
                height={120}
                alt={project.name}
                priority
              />
            </div>
            <span className="line-clamp-1">{project.shortDescription}</span>
            <div className="justify-self-stretch"></div>
            <Navigate
              icon={IoMdArrowForward}
              title="View details"
              classes="btn-nav"
              to={`/projects/${project.id}`}
            />
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Content;
