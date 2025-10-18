/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

interface Props {
  title: string;
}

const Education = ({ title }: Props) => {
  return (
    <div className="flex justify-start items-center gap-4">
      <img src="/images/resume/university.png" className="w-3 h-3" />
      <span>{title}</span>
    </div>
  );
};

export default Education;
