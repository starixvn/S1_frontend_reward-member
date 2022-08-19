import React, { FC } from "react";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { mineMenuList } from "components/about/constants";
import { useRouter } from "next/router";
import { useAppSelector } from "store";
import { selectedIsLogin } from "service/slice/auth";
import { usePopBox } from "common/hooks";

interface ILeftMenuProps {
  activePath: string;
}

const LeftMenu: FC<ILeftMenuProps> = ({ activePath }) => {
  const { t } = useTranslation();
  const route = useRouter();
  const isLogin = useAppSelector(selectedIsLogin);
  const { setPopBoxType } = usePopBox();
  return (
    <div className="leftMenu">
      <div className="leftMenu">
        {mineMenuList.map(item => (
          <a
            onClick={() => {
              if (item.authRequired && !isLogin) {
                setPopBoxType({
                  type: "login"
                });
              } else {
                route.push(item.path);
              }
            }}
            key={item.id}
            className={classNames("item", {
              active: activePath === item.path
            })}>
            <span>{t(item.displayKey)}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default LeftMenu;
