<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <v-card v-if="!loading">
          <v-card-text>
            <h1 class="text--primary " >{{note.title}}</h1>
            <p>{{note.description}}</p>
          </v-card-text>
            <v-spacer></v-spacer>
            <addEditNoteModal
              :note="note"></addEditNoteModal>
          </v-card-actions>
        </v-card>
          <div v-else class="text-xs-center">
            <v-progress-circular
              :size="100"
              :width="4"
              color="blue"
              indeterminate>

            </v-progress-circular>
          </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import EditNoteModal from './EditNoteModal'

export default {
  props: ['id'],
  data () {
    return {
   }
  },
  computed: {
    note () {
      const id = this.id
      return this.$store.getters.noteById(id)
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  components: {
    addEditNoteModal: EditNoteModal
  },
  methods: {

  }
}
</script>
<style>

</style>
