<template>
  <div v-if="!loading">

    <v-container  class="mx" fluid fill-height  justify-center>
      <v-layout row class="viewport" align-start justify-center>
       <v-flex xs6 md6 sm6 column class="mr-5">
         <draggable
           class="list-group"
           ghost-class="ghost"
           @start="dragging = true"
           @end="dragging = false"
         >
         <v-flex
          v-for="(note) in filteredNotes"
          :key="note.id"
          >
          <v-card   :style="{backgroundColor: note.color}" :to="'/note/' + note.id" class="mb-2 pt-2 pl-2" height="270">
            <v-layout row wrap align-start justify-start  fill-height>
              <v-flex style="width:200px" ><v-card-title  xs6 md6 sm6  primary-title>
              <div>
                <h3 class="headline mb-0" style="color:#009f90">{{note.title}}</h3>
                <div style="overflow: hidden;  "><p style="overflow: hidden; height: 190px; ">{{note.description}}</p></div>
              </div>
            </v-card-title></v-flex>
            </v-layout>
          </v-card>
        </v-flex>
         </draggable>
         <v-flex v-if="filteredNotes.length === 0" class="text-xs-center text-sm-center text-md-center">
           <v-card-title>Нет объектов подходящих под фильтр</v-card-title>
         </v-flex>

       </v-flex>
        <v-flex xs4 md4 sm4
                class = filter
                column
        >
          <v-text-field
            label="поиск по названию"
            prepend-icon="search"
            v-model="filter"></v-text-field>
          <v-select
              chips
              :items="items"
              label="Тип"
              v-model="filterType"
              multiple
              outline
          >
            </v-select>
          <v-select
              chips
              :items="colors"
              label="Цвета"
              v-model="filterColors"
              multiple
              outline
          >
            <template slot="item" slot-scope="data">
              <div
                :style="{backgroundColor: data.item}"
            >{{data.item }}</div></template>

            </v-select>

        </v-flex>
      </v-layout>
    </v-container>
  </div>
  <div v-else>
    <v-container>
      <v-layout row>
        <v-flex xs12 class="text-xs-center pt-5">
          <v-progress-circular :size="100" :width="4" color="blue" indeterminate>

          </v-progress-circular>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  data () {
    return {
      filter: '',
      items: ['Новая', 'Закрепленная', 'Архив'],
      filterType: '',
      filterColors: []

    }
  },
  components: {
    draggable
  },
  computed: {
    colors () {
      let c = []
      for (let i = 0; i < this.notes.length; i++) {
        if (!c.find(x => x === this.notes[i].color) && typeof this.notes[i].color === 'string') {
          c.push(this.notes[i].color)
        }
      }
      return c
    },
    notes () {
      return this.$store.getters.notes
    },
    loading () {
      return this.$store.getters.loading
    },
    filteredNotes () {
      let fO = this.notes
      if (this.filter) {
        fO = this.notes.filter((note) => {
          let text = note.title + ' ' + note.description
          let title = text.toLowerCase().match(this.filter.toLowerCase())
          console.log('filt', title)
          return title
        })
      }
      //  if (this.filterType) {
      //   fO = this.notes.filter((note) => {
      //     let type = note.type.toLowerCase().match(this.filter.toLowerCase())
      //     return type
      //   })
      // }
      console.log('yes', this.filterType)
      if (this.filterType.length > 0) {

        let FO = []
        for (let i = 0; i < this.filterType.length; i++) {
          console.log(this.filterType[i])
          for (let k = 0; k < fO.length; k++) {
            console.log(this.filterType[i] ,  fO[k].type)
            if (this.filterType[i] === fO[k].type) {
              FO.push(fO[k])
            }
          }
        }
        fO = FO
      }
      if (this.filterColors.length > 0) {

        let FO = []
        for (let i = 0; i < this.filterColors.length; i++) {
          for (let k = 0; k < fO.length; k++) {
            if (this.filterColors[i] === fO[k].color) {
              FO.push(fO[k])
            }
          }
        }
        fO = FO
      }
      return fO
    },
    itemProps (prop) {
      return prop.title
    }},
  methods: {
    notUniq (arr) {
      let result
      for (let i = 0; i + 1 < arr.length; i++) {
        if (typeof arr[i] !== 'undefined') {
          result = []
          for (let k = 0; k < arr[i].length; k++) {
            if (arr[i + 1].includes(arr[i][k])) {
              result.push(arr[i][k])
            }
          }
        }
        arr[i + 1] = result
      }
      return result
    },
  }
}
</script>

<style scoped>
  .maps {
    padding: 0px;

  }
  .car-link {
    position: absolute;
    bottom: 50px;
    left: 50%;
    background: rgba(0, 0, 0, .5);
    transform: translate(-50%, 0);
    padding: 5px 15px;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
  }
  .viewport {
    max-width: 1200px;
  }
  .filter {

  }
</style>
