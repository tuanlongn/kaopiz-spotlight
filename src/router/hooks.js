import router from ".";
import store from "../store";

router.beforeEach(async (to, from, next) => {
  if (!store.getters.appIsBooted) {
    await store.dispatch("app/boot");
  }

  if (!store.getters.userIsAuthenticated && to.path !== "/login") {
    router.push("/login");
  } else {
    next();
  }

  next();
});
