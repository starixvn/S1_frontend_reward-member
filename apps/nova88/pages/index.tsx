import Wrapper from "common/components/Wrapper";
import Layout from "common/components/Layout";
import Home from "components/Index";
import React from "react";

export function Index() {
  return (
    <Wrapper authRequired={false}>
      <Layout>
        <Home />
      </Layout>
    </Wrapper>
  );
}

export default Index;
