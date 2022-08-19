import React from "react";
import Wrapper from "common/components/Wrapper";
import Layout from "common/components/Layout";
import HowToEarnPoints from "components/about/Howtoearnpoints";

const Page = () => {
  return (
    <Wrapper authRequired={false}>
      <Layout>
        <HowToEarnPoints />
      </Layout>
    </Wrapper>
  );
};

export default Page;
