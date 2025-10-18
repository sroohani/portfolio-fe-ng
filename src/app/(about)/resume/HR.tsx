interface Props {
  classes?: string;
}

const HR = ({ classes = "" }: Props) => {
  return <hr className={`h-[1px] text-gray-300 opacity-60 my-1 ${classes}`} />;
};

export default HR;
