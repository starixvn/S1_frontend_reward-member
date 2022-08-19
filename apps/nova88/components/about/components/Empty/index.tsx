import React from "react";
import { useTranslation } from "react-i18next";

const Empty = () => {
  const { t } = useTranslation();
  return (
    <div className="noData">
      <i className="icon icon-alarm" />
      {t("NoData")}
    </div>
  );
};

export default Empty;
