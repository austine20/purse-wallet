import React from "react";

const PageTitle = (props) => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="uppercase text-2xl">{props.title}</h1>
    </div>
  );
};

export default PageTitle;
