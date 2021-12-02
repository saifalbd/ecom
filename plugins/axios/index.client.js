export default ({ $axios, redirect, $config: { API_TOKEN } }, inject) => {
  const company_id  = process.env.company_id;
  if (!company_id ) {
    console.error("company_id  not found server");
  }

  

  $axios.defaults.headers.common.company_id = company_id;
  // $axios.defaults.headers.common.token = API_TOKEN
  $axios.defaults.headers.common.baseURL = "http://redcomm.lara";

  inject("axiosWithoutToken", $axios);

  const authAxios = (auth) => {
    try {
      if (!auth.loggedIn) {
        throw new Error("user not loggedIn");
      }
      const ax = $axios.create();
      ax.defaults.headers.common.company_id = company_id;
      // ax.defaults.headers.common.token = API_TOKEN
      const userToken = auth.strategy.token.get();
      ax.defaults.headers.common.Authorization = `Bearer ${userToken}`;
      return ax;
    } catch (error) {
      console.error(error);
      redirect("/login");
    }
  };

  inject("authAxios", authAxios);
};
