import React from "react";
import Wrapper from "common/components/Wrapper";
import Layout from "common/components/Layout";
import Faq from "components/about/Faq";

const Page = () => {
  return (
    <Wrapper authRequired={false}>
      <Layout>
        <Faq />
      </Layout>
    </Wrapper>
  );
};

export default Page;
