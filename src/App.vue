<template>

  <v-app v-if="!loading">
    <v-navigation-drawer app temporary v-model="drawer" >
      <v-list>
        <v-list-tile v-for="link of links" :key="link.title" :to="link.url">
          <v-list-tile-action>
            <v-icon>{{link.icon}}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title v-text="link.title"></v-list-tile-title>
          </v-list-tile-content>

        </v-list-tile>

        <v-list-tile v-if="isUserLoggedIn" @click="onLogout">
          <v-list-tile-action>
            <v-icon left>exit_to_app</v-icon>

          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title v-text="'Выход'"></v-list-tile-title>
          </v-list-tile-content>

        </v-list-tile>
      </v-list>

    </v-navigation-drawer>

    <v-toolbar app dark color="primary" width="300">
      <v-spacer></v-spacer>
      <v-toolbar-side-icon @click="drawer = !drawer" class="hidden-md-and-up">
      </v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" class="pointer">Заметки</router-link>
      </v-toolbar-title>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn v-for="link in links" :key="link.title" :to="link.url" flat>
          <v-icon left>{{link.icon}}
          </v-icon>{{link.title}}
        </v-btn>
        <v-btn v-if="isUserLoggedIn" @click="onLogout" flat>
          <v-icon left>
            exit_to_app </v-icon>Выход
        </v-btn>


      </v-toolbar-items>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
    <template v-if="error">
      <v-snackbar :multi-line="true" color="error" @input="closeError" :timeout="5000" :value="true" :vertical="true">
        {{error}}
        <v-btn color="dark" flat @click.native="closeError">
          Close
        </v-btn>
      </v-snackbar>

    </template>
  </v-app >
  <div v-else>
    <v-container>
      <v-layout row>
        <v-flex xs12 class="text-xs-center pt-5">
          <v-progress-circular
            :size="100"
            :width="4"
            color="primary"
            indeterminate>

          </v-progress-circular>
        </v-flex>
      </v-layout>
    </v-container>
  </div>

</template>

<script>
export default {

  data () {
    return {
      activator: false,
      drawer: false

    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    error () {
      return this.$store.getters.error
    },
    isUserLoggedIn () {
      return this.$store.getters.isUserLoggedIn
    },
    links () {
      if (this.isUserLoggedIn) {
        return [
          {
            title: 'Новая заметка',
            icon: 'note_add',
            url: '/new'
          }
        ]
      }
      return [{
        title: 'Вход',
        icon: 'lock',
        url: '/login'
      },
      {
        title: 'Регистрация',
        icon: 'face',
        url: '/registration'
      }
      ]
    },
    usersInfo () {

      if (this.$store.getters.user) {
      const uid = this.$store.getters.user.id
      return this.$store.getters.usersInfo[uid]}
    }
  },
  methods: {
    closeError () {
      this.$store.dispatch('clearError')
    },
    onLogout () {
      this.$store.dispatch('logoutUser')
      this.$router.push('/')
    }
  }
}
</script>
<style scoped>

  .pointer {
    cursor: pointer;
  }
  .layout {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;}
  .teal {

  }
  .primary {
    background-color: #009f90
  }
</style>
