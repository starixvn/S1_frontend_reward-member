import React from "react";


const Inputbox = (
  {
    icon = "",
    value = "",
    onBlur = null,
    onChange = null,
    placeHolder = "",
    iconActions = [],
    isShowTip = "",
    tipContent = "",
    hotKey = "",
    link = ""
  }
) => {
  return (
    <div className="inputModule">
      <div className="inputTxt">
        {icon &&
          <i className={`icon ${icon}`} />}
        <input onChange={onChange} onBlur={onBlur} value={value} type="text" placeholder={placeHolder} />
        {iconActions.length > 0 &&
          <div className="iconModule">
            {iconActions.map((value, key) => (
              <i key={key} className={`icon ${value}`} />
            ))}
          </div>}
      </div>
      {tipContent &&
        <div className={`tip ${isShowTip ? "active" : ""}`}>
          {tipContent}
        </div>}
      {hotKey && <a href={link}>{hotKey}</a>}
    </div>
  );
};

export default Inputbox;
