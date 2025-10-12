import { Metadata } from "next";
import NotFound from "./NotFound";

export const metadata: Metadata = {
  title: "404 (Not Found)",
};

const PageNotFound = () => {
  return <NotFound />;
};

export default PageNotFound;
