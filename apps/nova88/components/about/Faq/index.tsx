import { useRouter } from "next/router";
import React, { useState } from "react";
import Link from "next/link";
import LeftMenu from "components/about/components/LeftMenu";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { paths } from "common/constants";

const Faq = () => {
  const { pathname } = useRouter();
  const { t } = useTranslation();
  const [FAQActiveTab, setFAQActiveTab] = useState(0);
  const handleFAQTabChange = number => {
    FAQActiveTab === number ? setFAQActiveTab(0) : setFAQActiveTab(number);
  };
  return (
    <main>
      <div className="container-xxl myCoins-page">
        <div className="row">
          <div className="col col-lg-2 col-xl-3">
            <LeftMenu activePath={pathname} />
          </div>
          <div className="col col-lg-10 col-xl-9">
            <div className="page-content">
              <div className="title">{t("Frequently_Asked_Questions")}</div>
              <div className="faq-content">
                <div
                  className={classNames("faqGroup", {
                    active: FAQActiveTab === 1
                  })}>
                  <button
                    onClick={() => handleFAQTabChange(1)}
                    className="icon icon-keyboard_arrow_down">
                    {t("Question1_title")}
                  </button>
                  <div className="faq-info">{t("Question1_Content")}</div>
                </div>
                <div
                  className={classNames("faqGroup", {
                    active: FAQActiveTab === 2
                  })}>
                  <button
                    onClick={() => handleFAQTabChange(2)}
                    className="icon icon-keyboard_arrow_down">
                    {t("Question2_title")}
                  </button>
                  <div className="faq-info">
                    {t("Question2_Content1")}
                    <ul>
                      <li>{t("Question2_Content2")}</li>
                      <li>{t("Question2_Content3")}</li>
                      <li>{t("Question2_Content4")}</li>
                      <li>{t("Question2_Content5")}</li>
                    </ul>
                    {t("Refer")} <a className="blue">{`'${t("Here")}'`}</a>{" "}
                    {t("for_more_details")}
                    <Link href={paths.about.sub.howtoearnpoints.root}>
                      <a className="blue">
                        {t("How_to_earn_88_Rewards_points")}
                      </a>
                    </Link>
                  </div>
                </div>
                <div
                  className={classNames("faqGroup", {
                    active: FAQActiveTab === 3
                  })}>
                  <button
                    onClick={() => handleFAQTabChange(3)}
                    className="icon icon-keyboard_arrow_down">
                    {t("Question3_title")}
                  </button>
                  <div className="faq-info">
                    <div>
                      {t("Accumulate_Deposit_Amount")}
                      <span className="lightgray">
												{t("Question3_Content1")}
											</span>
                    </div>
                    <div>
                      {t("Valid_Turnover")}
                      <span className="lightgray">
												{t("Question3_Content2")}
											</span>
                    </div>
                    <div>
                      {t("VIP_Upgrade")}
                      <span className="lightgray">
												{t("Question3_Content3")}
											</span>
                    </div>
                    <div>
                      {t("Birthday_Bonus")}
                      <span className="lightgray">
												{t("Question3_Content4")}
											</span>
                    </div>
                  </div>
                </div>
                <div
                  className={classNames("faqGroup", {
                    active: FAQActiveTab === 4
                  })}>
                  <button
                    onClick={() => handleFAQTabChange(4)}
                    className="icon icon-keyboard_arrow_down">
                    {t("Question4_title")}
                  </button>
                  <div className="faq-info">
                    {t("Please_refer_to")}
                    <Link href={paths.shopping}>
                      <a className="blue">{t("88_Rewards_Store")}</a>
                    </Link>
                  </div>
                </div>
                <div
                  className={classNames("faqGroup", {
                    active: FAQActiveTab === 5
                  })}>
                  <button
                    onClick={() => handleFAQTabChange(5)}
                    className="icon icon-keyboard_arrow_down">
                    {t("Question5_title")}
                  </button>
                  <div className="faq-info">{t("Question5_Content")}</div>
                </div>
                <div
                  className={classNames("faqGroup", {
                    active: FAQActiveTab === 6
                  })}>
                  <button
                    onClick={() => handleFAQTabChange(6)}
                    className="icon icon-keyboard_arrow_down">
                    {t("Question6_title")}
                  </button>
                  <div className="faq-info">{t("Question6_Content")}</div>
                </div>
                <div
                  className={classNames("faqGroup", {
                    active: FAQActiveTab === 7
                  })}>
                  <button
                    onClick={() => handleFAQTabChange(7)}
                    className="icon icon-keyboard_arrow_down">
                    {t("Question7_title")}
                  </button>
                  <div className="faq-info">
                    {t("Question7_Content")}
                    <Link href={paths.about.sub.howtoearnpoints.root}>
                      <a className="blue">
                        {t("How_to_earn_88_Rewards_points")}
                      </a>
                    </Link>
                  </div>
                </div>
                <div
                  className={classNames("faqGroup", {
                    active: FAQActiveTab === 8
                  })}>
                  <button
                    onClick={() => handleFAQTabChange(8)}
                    className="icon icon-keyboard_arrow_down">
                    {t("Question8_title")}
                  </button>
                  <div className="faq-info">{t("Question8_Content")}</div>
                </div>
                <div
                  className={classNames("faqGroup", {
                    active: FAQActiveTab === 9
                  })}>
                  <button
                    onClick={() => handleFAQTabChange(9)}
                    className="icon icon-keyboard_arrow_down">
                    {t("Question9_title")}
                  </button>
                  <div className="faq-info">{t("Question9_Content")}</div>
                </div>
                <div
                  className={classNames("faqGroup", {
                    active: FAQActiveTab === 10
                  })}>
                  <button
                    onClick={() => handleFAQTabChange(10)}
                    className="icon icon-keyboard_arrow_down">
                    {t("Question10_title")}
                  </button>
                  <div className="faq-info">{t("Question10_Content")}</div>
                </div>
                <div
                  className={classNames("faqGroup", {
                    active: FAQActiveTab === 11
                  })}>
                  <button
                    onClick={() => handleFAQTabChange(11)}
                    className="icon icon-keyboard_arrow_down">
                    {t("Question11_title")}
                  </button>
                  <div className="faq-info">{t("Question11_Content")}</div>
                </div>
                <div
                  className={classNames("faqGroup", {
                    active: FAQActiveTab === 12
                  })}>
                  <button
                    onClick={() => handleFAQTabChange(12)}
                    className="icon icon-keyboard_arrow_down">
                    {t("Question12_title")}
                  </button>
                  <div className="faq-info">
                    {t("Question12_Content")}
                    <span className="orange">{t("365_days")}</span>.
                  </div>
                </div>
                <div
                  className={classNames("faqGroup", {
                    active: FAQActiveTab === 13
                  })}>
                  <button
                    onClick={() => handleFAQTabChange(13)}
                    className="icon icon-keyboard_arrow_down">
                    {t("Question13_title")}
                  </button>
                  <div className="faq-info">{t("Question13_Content")}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Faq;
