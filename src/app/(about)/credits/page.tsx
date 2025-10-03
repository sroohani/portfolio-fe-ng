import React from "react";
import credits from "@/assets/json/credits.json";
import { CreditItemData } from "@/components/types";
import Card from "@/components/Card";
import Image from "next/image";

const Credits = () => {
  const creds: CreditItemData[] = JSON.parse(JSON.stringify(credits));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 w-[90%] gap-4 mt-4">
      {creds.map((cred) => (
        <Card
          title={cred.title}
          key={cred.id}
          contentHeight={200}
          titleClasses="h-14 sm:h-8"
        >
          <a
            href={cred.href}
            target="_blank"
            className="flex justify-center items-center p-4"
          >
            {cred.img && (
              <Image
                src={cred.img}
                width={100}
                height={100}
                alt={cred.title}
                className="w-auto"
                priority
              />
            )}
          </a>
        </Card>
      ))}
    </div>
  );
};

export default Credits;
