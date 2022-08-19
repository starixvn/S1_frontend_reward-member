// Site Url: {Domain}/rewards/
const isDevelopment = process.env.NODE_ENV !== "production";
const root = isDevelopment ? "/" : "/rewards";

const paths = {
  home: root,
  shopping: `${root}/shopping`,
  cart: `${root}/cart`,
  about: {
    root: `${root}/about`,
    sub: {
      points: {
        root: `${root}/about/points`,
        authRequired: true
      },
      purchase: {
        root: `${root}/about/purchase`,
        authRequired: true
      },
      howtoearnpoints: {
        root: `${root}/about/howtoearnpoints`
      },
      rewardfaq: {
        root: `${root}/about/rewardfaq`
      }
    }
  },
  forgetPassword: "forgetPassword",
  join: "join",
  appDownload: "appDownload",
  profile: "profile"
};

export { paths };
