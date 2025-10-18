interface Props {
  name: string;
  level: string;
}

const Language = ({ name, level }: Props) => {
  return (
    <div className="flex justify-start items-center">
      <span className="w-[15%] font-bold">{name}</span>
      <span className="w-[85%]">{level}</span>
    </div>
  );
};

export default Language;
