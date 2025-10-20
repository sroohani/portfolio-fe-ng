"use server";

import { Client, ExecutionMethod, Functions } from "node-appwrite";
import fs from "node:fs";
import ReactPDF, { DocumentProps } from "@react-pdf/renderer";
import PDF from "@/app/(about)/resume/PDF";
import { JSXElementConstructor, ReactElement } from "react";

export const sendMessage = async (body: string) => {
  const client = new Client();
  const functions = new Functions(client);

  client
    .setEndpoint(process.env.APPWRITE_FUNCTION_ENDPOINT!)
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID!)
    .setKey(process.env.APPWRITE_FUNCTION_API_KEY!);

  try {
    await functions.createExecution({
      functionId: process.env.APPWRITE_FUNCTION_ID_SEND_MESSAGE!,
      body,
      async: false,
      xpath: "/",
      method: ExecutionMethod.POST,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

export const downloadResume = async () => {
  const pdfInstance = ReactPDF.pdf(PDF());
  return await pdfInstance.toBlob();
};
