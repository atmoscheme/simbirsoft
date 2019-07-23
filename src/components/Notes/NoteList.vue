<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm-6 offset-sm3>
        <h1
        class="text--secondary mb-3">Мои заметки</h1>
        <v-card
          class="mb-3"
          v-for="note in myNotes"
          :key="note.id">
          <v-layout
            height="300">
            <v-flex xs8>
              <v-card-text>
                <h2 class="text--primary">{{note.title}}</h2>
                <p>{{note.description}}</p>
              </v-card-text>
              <v-card-actions>
              <v-spacer></v-spacer>
                <v-btn
                  class="info"
                :to="'/note/' + note.id">Открыть</v-btn>
              </v-card-actions>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    myNotes () {
      return this.$store.getters.myNotes
    }

  }
}
</script>

<style>

</style>
