import React from "react";
import Details from "./Details";

interface Props {
  params: Promise<{ projectId: string }>;
}

const Project = async ({ params }: Props) => {
  const { projectId } = await params;

  return <Details projectId={parseInt(projectId)} />;
};

export default Project;
