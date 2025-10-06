interface Props {
  classes?: string;
}

const HR = ({ classes = "" }: Props) => {
  return <hr className={`h-[1px] text-[#aba395] opacity-50 mb-0 ${classes}`} />;
};

export default HR;
