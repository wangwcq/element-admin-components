export default {
  data() {
    return {
      isCollapse: false,
    };
  },
  computed: {
    admin() {
      return this.$store.state.admin.username;
    },
  },
  watch: {
    $route(next) {
      this.isCollapse = next.matched.reduce(
        (final, item) => final || (item.meta.sidebarCollapse || false), false,
      )
        || false;
    },
  },
  mounted() {
    if (this.requireAuth && !this.admin) {
      this.$store.dispatch('checkLoggedIn', {
        ok: () => {},
        fail: () => {
          this.$router.replace('/');
        },
      });
    }
    this.isCollapse = this.$route.matched.reduce(
      (final, item) => final || (item.meta.sidebarCollapse || false), false,
    )
      || false;
  },
  methods: {
    openRoute(route) {
      this.$router.push(route);
    },
    handleCommand(command) {
      this[command]();
    },
    logout() {
      this.$store.dispatch('logout', {
        ok: () => {
          this.$router.replace('/login');
        },
      });
    },
    canI(targetRole) {
      return (this.$store.state.admin.roles || '').split(',').indexOf(targetRole) > -1;
    },
    gotoCommand(ev) {
      this.$router.push(ev);
    },
  },
};
