"use server";

import { Client, ExecutionMethod, Functions } from "appwrite";

export const sendMessage = async (body: string) => {
  const client = new Client();
  const functions = new Functions(client);

  client
    .setEndpoint(process.env.APPWRITE_FUNCTION_ENDPOINT!)
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID!);

  try {
    await functions.createExecution(
      process.env.APPWRITE_FUNCTION_ID_SEND_MESSAGE!,
      body,
      false,
      "/",
      ExecutionMethod.POST,
      { "Content-Type": "application/json" }
    );
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};
