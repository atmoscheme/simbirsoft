<template>
  <v-container >
    <v-layout row>
      <v-flex xs12 sm12  v-if="!loading" :style="{backgroundColor: color.hex}">
        <h1 class="text--secondary mb-3">Добавление заметки</h1>
        <div class="col-sm-8">
          <colorpicker :color="color" v-model="color" />
        </div>
        <v-form ref="form" v-model="valid" validation class="mb-3">
          <v-divider></v-divider>
          <v-text-field name="title" label="Название заметки" type="text" v-model="title" required :rules="[v => !!v || 'Title is required']"></v-text-field>
          <v-divider></v-divider>
          <v-textarea name="description" label="Текст заметки" type="password" v-model="description" :rules="[v => !!v || 'Description is required']"></v-textarea>
          <v-divider></v-divider>
            <v-flex xs12 sm6 d-flex>
              <v-select
                :items="items"
                v-model="type"
                label="тип заметки"
              ></v-select>
            </v-flex>
          <v-flex
                        xs12 sm4 md4>
            <v-checkbox
              v-model="checkbox"
              label="checkboxMode"
              color="red"
            ></v-checkbox>
          </v-flex>

        </v-form>

        <ul v-if="checkbox">
          <v-flex
            v-for="(l, key) in description.split('\n')"
            xs12 sm4 md4>
            <v-checkbox
              :label="l"
              :value="l"
            ></v-checkbox>
          </v-flex>
        </ul>
        <v-layout row>
          <v-flex xs12>
            <v-spacer></v-spacer>
            <v-btn class="success" @click="createNote" :loading="loading" :disabled="!valid || loading">Создать заметку</v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
      <div v-else>
        <v-container>
          <v-layout row>
            <v-flex xs12 class="text-xs-center pt-5">
              <v-progress-circular
                :size="100"
                :width="4"
                color="blue"
                indeterminate>
              </v-progress-circular>
            </v-flex>
          </v-layout>
        </v-container>
      </div>
    </v-layout>
  </v-container>
</template>

<script>
import VueColor from 'vue-color'
export default {
  data () {
    return {
      title: '',
      description: '',
      color: '#FFFFFF00',
      type: '',
      items: ['Новая', 'Закрепленная', 'Архив'],
      checkbox: false
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  components: {colorpicker: VueColor.Chrome},

  methods: {
    createNote () {
      if (this.$refs.form.validate()) {
        const note = {
          title: this.title,
          description: this.description,
          color: this.color.hex,
          type: this.type
        }
        this.$store.dispatch('createNote', note)
          .then(() => {
            this.$router.push('/')
          })
          .catch(() => {})
      }
    }
  }
}
</script>

<style>
 .big .v-input__control .v-input__slot .v-slider .v-slider__thumb-container .v-slider__thumb-label
 {
   width:  60px !important;
   height: 60px !important;  }
</style>
