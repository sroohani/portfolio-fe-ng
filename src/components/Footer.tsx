import React from "react";

const Footer = () => {
  return (
    <div className="h-footer grid grid-cols-1 sm:grid-cols-2 gap-y-1 w-full px-4 border-t-[1px] bg-inherit text-inherit">
      <div className="text-center">Copyright &copy; 2025 Shahram Roohani</div>
      <div className="text-center">
        Released under the &nbsp;
        <a
          className="text-inherit visited:text-inherit active:text-inherit bg-inherit underline"
          href="https://opensource.org/license/mit"
          target="_blank"
        >
          MIT
        </a>
        &nbsp;License
      </div>
    </div>
  );
};

export default Footer;
