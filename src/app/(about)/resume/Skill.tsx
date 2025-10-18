interface Props {
  title: string;
  skills: string[];
}
const Skill = ({ title, skills }: Props) => {
  return (
    <div className="flex justify-start items-center w-full my-1">
      <span className="font-bold self-start w-[20%]">{title}</span>
      <span className="self-start w-[80%]">{skills.join(", ")}</span>
    </div>
  );
};

export default Skill;
