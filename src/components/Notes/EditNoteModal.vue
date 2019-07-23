<template>
  <v-dialog v-model="modal" row v-if="!loading">
    <v-btn class="warning" flat  slot="activator">Редактировать</v-btn>
    <v-card>
      <v-container>
        <v-layout  row>
          <v-flex xs-12>
            <v-card-title>
              <h1 class="text--primary">Редактировать заметку</h1>
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row>
          <v-flex xs-12>
            <v-card-text>
              <v-divider></v-divider>
              <v-text-field name="title" label="Краткое наименование" type="text" v-model="editedTitle" required :rules="[v => !!v || 'Title is required']"></v-text-field>
              <v-divider></v-divider>
              <v-text-field  name="description" label="Title" type="text" v-model="editedDescription" multi-line></v-text-field>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row>
          <v-flex xs-12>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="" flat @click="onCancel">
                Cancel
              </v-btn>
              <v-btn class="success" flat @click="onSave">
               Save
              </v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>

      </v-container>
    </v-card>
  </v-dialog>
  <div v-else class="text-xs-center">
    <v-progress-circular
      :size="100"
      :width="4"
      color="blue"
      indeterminate>

    </v-progress-circular>
  </div>
</template>
<script>
export default {
  props: ['note'],
  data () {
    return {
      modal: false,
      editedTitle: this.note.title,
      editedDescription: this.note.description
    }
  },
  computed: {
    loading () {
      console.log('loading', this.$store.getters.loading)
      return this.$store.getters.loading
    }
  },
  methods: {
    onSave () {
      if (this.editedTitle !== '' && this.editedDescription !== '') {
        this.$store.dispatch('updateNote', {
          title: this.editedTitle,
          description: this.editedDescription,
          id: this.note.id
        })
        this.modal = false
      }
    },
    onCancel () {
      this.modal = false
    }
  }
}
</script>

