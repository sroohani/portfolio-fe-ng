import Image from "next/image";

interface Props {
  title: string;
}

const Education = ({ title }: Props) => {
  return (
    <div className="flex justify-start items-center w-full font-[400] text-[0.3rem] gap-[0.9]">
      <Image
        src="/images/resume/university.png"
        width={6}
        height={6}
        alt="University"
      />
      <span className="pb-1.5">{title}</span>
    </div>
  );
};

export default Education;
