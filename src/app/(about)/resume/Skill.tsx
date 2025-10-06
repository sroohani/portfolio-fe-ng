interface Props {
  title: string;
  skills: string[];
}
const Skill = ({ title, skills }: Props) => {
  return (
    <div className="text-[0.3rem] flex justify-start items-center w-full mb-0">
      <span className="font-bold self-start w-[15%]">{title}</span>
      <span className="self-start w-[85%]">{skills.join(", ")}</span>
    </div>
  );
};

export default Skill;
