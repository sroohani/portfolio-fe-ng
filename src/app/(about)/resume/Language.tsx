interface Props {
  name: string;
  level: string;
}

const Language = ({ name, level }: Props) => {
  return (
    <div className="w-full flex justify-start items-center text-[0.3rem] font-[400]">
      <span className="w-[10%] font-bold">{name}</span>
      <span className="w-[90%]">{level}</span>
    </div>
  );
};

export default Language;
