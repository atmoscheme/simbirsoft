<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Регистрация</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-layout row mb-3>
              <v-flex xs12>
                <v-btn class="warning" @click="toggleShow">Загрузить основное фото<v-icon right dark>cloud_upload</v-icon>
                </v-btn>

              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <div id="app">
                <my-upload
                  class="crop"
                  field="img"
                  lang-type="ru"
                  @crop-success="cropSuccess"
                  @crop-upload-success="cropUploadSuccess"
                  @crop-upload-fail="cropUploadFail"
                  v-model="show"
                  :width="500"
                  :height="500"
                  :params="params"
                  :headers="headers"
                  img-format="png"
                  @change="onFileChange(field)"
                >
                </my-upload>
                <input ref="fileInput" type="file" style="display: none" accept="image/*" @change="onFileChange">
              </div>
            </v-layout>
            <v-layout row>
              <v-flex xs12>
                <img :src="imageSrc" height="200" v-if="imageSrc"/>
              </v-flex>
            </v-layout>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field prepend-icon="person" name="email" label="email" type="text" v-model="email" :rules="emailRules"></v-text-field>
              <v-text-field  prepend-icon="account_circle" name="firstname" label="Имя" type="text" v-model="personal.name" ></v-text-field>
              <v-text-field  prepend-icon="account_circle" name="lastname" label="Фамилия" type="text" v-model="personal.lastname"></v-text-field>
              <v-select prepend-icon="accessibility" label="пол" :items="sex" v-model="personal.sex"></v-select>
              <v-select prepend-icon="person_pin_circle" label="район" :items="districts" v-model="personal.districts"></v-select>
              <v-select prepend-icon="directions_run" label="любимый вид спорта" :items="mySports" item-text="title" v-model="personal.sport"></v-select>
              <v-text-field prepend-icon="phone" name="phone" label="Телефон" type="text" v-model="personal.phone" ></v-text-field>
              <v-text-field prepend-icon="lock" name="password" label="Пароль" type="password" v-model="password" :counter="6" :rules="passRules"></v-text-field>
              <v-text-field prepend-icon="lock" name="confirm-password" label="Повторите пароль" type="password" v-model="confirmPassword" :counter="6" :rules="confirmPassRules"></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="OnSubmit" :loading="loading" :disabled="!valid || loading">Зарегистрироваться</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import myUpload from 'vue-image-crop-upload'
export default {
  data () {
    return {
      email: '',
      personal: {},
      sex: ['Мужской', 'Женский'],
      districts: ['Авиастроительный', 'Вахитовский', 'Кировский', 'Московский', 'Новосавиновский', 'Приволжский', 'Советский'],
      password: '',
      confirmPassword: '',
      valid: false,
      emailRules: [
        v => !!v || 'E-mail обязателен',
        v => /.+@.+/.test(v) || 'Введите коррректный email'
      ],
      phoneRules: [
        v => /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test(v) || 'Введите корректный номер телефона'
      ],
      passRules: [
        v => !!v || 'Пароль обязателен',
        v => (v && v.length >= 6) || 'Слишком короткий пароль'
      ],
      params: {
        token: '123456798',
        name: 'avatar'
      },
      image: null,
      confirmPassRules: [
        v => !!v || 'Пароль обязателен',
        v => v === this.password || 'Пароли не совпадают'

      ],
      show: false,
      headers: {
        smail: '*_~'
      },
      imageSrc: ''
    }
  },
  components: {
    'my-upload': myUpload
  },
  computed: {
    loading (store) {
      return this.$store.getters.loading
    },
    mySports () {
      return this.$store.getters.mySports
    }
  },
  methods: {
    cropSuccess (imageSrc, field) {
      fetch(imageSrc)
        .then(res => res.blob())
        .then(blob => {
          let file = new File([blob], 'File name')
          const reader = new FileReader()
          reader.onload = e => {
            this.imageSrc = reader.result
          }
          reader.readAsDataURL(file)
          this.image = file
        })
    },
    cropUploadFail (status, field) {
    },
    cropUploadSuccess (jsonData, field) {
    },
    onFileChange (field) {
      console.log(field)
      const file = event.target.files[0]
      const reader = new FileReader()
      reader.onload = e => {
        this.imageSrc = reader.result
      }
      reader.readAsDataURL(file)
      this.image = file
    },
    OnSubmit () {
      if (this.$refs.form.validate()) {
        const user = {
          email: this.email,
          password: this.password,
          personal: this.personal,
          image: this.image
        }
        this.$store.dispatch('registerUser', user)
          .then(() => {
            this.$router.push('/')
          })
          .catch(() => {})
      }
    },
    toggleShow () {
      this.show = !this.show
    }
  }
}
</script>
