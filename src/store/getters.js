export default {
  appIsBooted: (state) => state.app.booted,
  userIsAuthenticated: (state) => state.user.isAuthenticated,
  myInfo: (state) => state.user.info,
};
