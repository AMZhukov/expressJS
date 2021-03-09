const App = {
  data() {
    return {
      servers: [],
      name: '',
    };
  },
  async mounted() {
    const res = await fetch('/api/server');
    this.servers = await res.json();
    console.log(this.servers);
  },
  methods: {
    async createServer() {
      const data = {
        name: this.name,
        status: 'created',
      };
      const res = await fetch('/api/server', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      this.name = '';
      const newServer = await res.json();
      this.servers.push(newServer);
      console.log(this.servers);
    },
    async remove(_id) {
      await fetch(`/api/server/${_id}`, { method: 'DELETE' });
      this.servers = this.servers.filter((server) => server._id !== _id);
    },
  },
};

Vue.createApp(App).mount('#app');
