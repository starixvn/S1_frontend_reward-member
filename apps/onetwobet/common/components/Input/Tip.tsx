import classNames from "classnames";
import React, { FC } from "react";

interface ITipProps {
  children?: string;
}

const Tip: FC<ITipProps> = ({ children = null }) => {
  return (
    <div className={classNames("tip", { active: Boolean(children) })}>
      {children}
    </div>
  );
};
export default Tip;
