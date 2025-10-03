"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Font } from "@react-pdf/renderer";
import { Buffer } from "buffer";
import { Download } from "lucide-react";
import { FaUniversity } from "react-icons/fa";
import { VscProject } from "react-icons/vsc";
import {
  CONTACT_CELLPHONE_ID,
  CONTACT_EMAIL_ID,
  contactLinks,
  resData,
} from "@/components/server-constants";
import Card from "@/components/Card";
import Contactbar from "@/components/Contactbar";
import Toast from "@/components/Toast";
import { useCopyModalReducer, useToastReducer } from "@/components/hooks";
import CopyModal from "@/components/CopyModal";
import PDF from "./PDF";
import resumeJson from "@/assets/json/resume.json";

import dynamic from "next/dynamic";

const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

const Resume = () => {
  const toastReducer = useToastReducer();
  const copyModalReducer = useCopyModalReducer();
  const initialCopyState = useMemo(() => ({ copied: false, id: -1 }), []);
  const [copyOccurred, setCopyOccurred] = useState<{
    copied: boolean;
    id: number;
  }>(initialCopyState);

  useEffect(() => {
    Font.register({ family: "Helvetica", src: "" });
    window.Buffer = window.Buffer || Buffer;
  }, []);

  const closeToast = () => {
    setCopyOccurred(initialCopyState);
    toastReducer.setVisibility(false);
  };

  const copyOccurredCb = (id: number) => {
    copyModalReducer.setId(id);
    setCopyOccurred({ copied: true, id });
  };

  const closeCopyModal = () => {
    copyModalReducer.setVisibility(false);
  };

  const copyFallback = (id: number): boolean => {
    switch (id) {
      case CONTACT_EMAIL_ID:
        copyModalReducer.setTitle("Email");
        copyModalReducer.setPrompt(
          "Broswer copy API is not available. Please copy the email address manually:"
        );
        copyModalReducer.setTextToCopy(
          contactLinks.find((l) => l.id === id)!.textToCopy ||
            "Email address not available"
        );
        toastReducer.setPosition({ top: 0 });
        copyModalReducer.setId(id);
        copyModalReducer.setVisibility(true);

        break;

      case CONTACT_CELLPHONE_ID:
        copyModalReducer.setTitle("Cell phone");
        copyModalReducer.setPrompt(
          "Broswer copy API is not available. Please copy the cell phone number manually:"
        );
        copyModalReducer.setTextToCopy(
          contactLinks.find((l) => l.id === id)!.textToCopy ||
            "Cell phone number not available"
        );
        toastReducer.setPosition({ top: 0 });
        copyModalReducer.setId(id);
        copyModalReducer.setVisibility(true);

        break;

      default:
        break;
    }

    return true;
  };

  const handleCopy = (id: number) => {
    setCopyOccurred({ copied: true, id });
  };

  useEffect(() => {
    if (copyOccurred.copied) {
      const id = copyOccurred.id;
      setCopyOccurred(initialCopyState);
      toastReducer.setPosition({ top: 0 });
      toastReducer.setType("success");

      switch (id) {
        case CONTACT_EMAIL_ID:
          toastReducer.setMessage("Email address copied to clipboard");
          toastReducer.setVisibility(true);
          break;

        case CONTACT_CELLPHONE_ID:
          toastReducer.setMessage("Cell phone number copied");
          toastReducer.setVisibility(true);
          break;

        default:
          break;
      }
    }
  }, [copyModalReducer, toastReducer, copyOccurred, initialCopyState]);

  return (
    <div className="relative flex flex-col justify-start items-start w-full px-8 py-4">
      <div className="flex justify-between items-center w-full pb-4 border-b">
        <span className="text-xl">{resData.header.name}</span>
        <div className="h-4 w-4">
          <PDFDownloadLink
            document={<PDF />}
            fileName={`${resumeJson.header.name} - CV.pdf`}
          >
            {
              (/*{ blob, url, loading, error }*/) => (
                <span title="Download PDF">
                  <Download />
                </span>
              )
            }
          </PDFDownloadLink>
        </div>
      </div>
      <Contactbar
        contactLinks={contactLinks}
        copyFallback={copyFallback}
        onClick={handleCopy}
      />
      <p className="py-4 border-b mb-2">{resData.summary}</p>
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
      {toastReducer.state.visibility && (
        <Toast
          message={toastReducer.state.message}
          type={toastReducer.state.type}
          closeMe={closeToast}
          position={toastReducer.state.position}
        />
      )}
      {copyModalReducer.state.visibility && (
        <CopyModal
          id={copyModalReducer.state.id}
          title={copyModalReducer.state.title}
          prompt={copyModalReducer.state.prompt}
          textToCopy={copyModalReducer.state.textToCopy}
          copyOccurred={copyOccurredCb}
          closeMe={closeCopyModal}
        />
      )}
    </div>
  );
};

export default Resume;
