"use client";
import Card from "@/components/Card";
import Image from "next/image";
import { useProjectsStore } from "@/components/store";
import Button from "@/components/Button";
import { IoMdArrowForward } from "react-icons/io";
import { useRouter } from "next/navigation";

const Projects = () => {
  const { projects } = useProjectsStore();
  const router = useRouter();

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
            <Button
              icon={IoMdArrowForward}
              title="View details"
              classes="btn-nav"
              onClick={() => router.push(`/projects/${project.id}`)}
            />
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Projects;
