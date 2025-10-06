import Card from "@/components/Card";
import React from "react";
import faq from "@/assets/json/faq.json";
import { QA } from "@/components/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
};

const FAQ = () => {
  const qas: QA[] = JSON.parse(JSON.stringify(faq));

  return (
    <div className="flex flex-col justify-start items-center gap-4 mt-4">
      {qas.map((qa) => (
        <Card
          title={qa.question}
          key={qa.id}
          contentHeight={150}
          collapsible={true}
          containerClasses="w-full"
          titleClasses="h-20 sm:h-8"
        >
          <p className="max-h-[100px] h-fit p-4">{qa.answer}</p>
        </Card>
      ))}
    </div>
  );
};

export default FAQ;
