const InProgress = () => {
  return (
    <div className="flex justify-center items-end h-full w-full gap-1">
      {[0, 1, 2].map((i) => (
        <div key={`loader-bar-${i}`} className="loader-bar"></div>
      ))}
    </div>
  );
};

export default InProgress;
