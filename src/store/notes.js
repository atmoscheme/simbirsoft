import * as fb from 'firebase'

class Note {
  constructor (
    title,
    description,
    color,
    type,
    ownerId,
    id = null) {
    this.title = title
    this.description = description
    this.color = color
    this.type = type
    this.ownerId = ownerId
    this.id = id
  }
}
export default {
  state: {
    notes: []
  },
  mutations: {
    createNote (state, payload) {
      state.notes.push(payload)
    },
    loadNotes (state, payload) {
      state.notes = payload
    },
    updateNote (state, {title, description, color, type, id}) {
      const note = state.notes.find(n => {
        return n.id === id
      })
      note.title = title
      note.description = description
      note.color = color
      note.type = type
    }
  },
  actions: {
    async createNote ({commit, getters}, payload) {
      commit('clearError')
      commit('setLoading', true)
      try {
        const newNote = new Note(
          payload.title,
          payload.description,
          payload.color,
          payload.type,
          getters.user.id,
          '')
        const note = await fb.database().ref('notes').push(newNote)
        commit('createNote', {
          ...newNote,
          id: note.key
        })
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    },
    async fetchNotes ({commit}) {
      commit('clearError')
      commit('setLoading', true)
      const resultNotes = []
      try {
        const fbVal = await fb.database().ref('notes').once('value')
        const notes = fbVal.val()
        Object.keys(notes).forEach(
          key => {
            const note = notes[key]
            resultNotes.push(
              new Note(
                note.title,
                note.description,
                note.color,
                note.type,
                note.ownerId,
                key
              )
            )
          }
        )
        commit('loadNotes', resultNotes)
        commit('setLoading', false)

      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    },
    async updateNote ({commit}, {title, description, color, type, id}) {
      commit('clearError')
      commit('setLoading', true)
      try {
        await fb.database().ref('notes').child(id).update(
          {title, description, color, type}
        )
        commit('updateNote', {
          title, description, color, type, id
        })
        commit('setLoading', false)
      } catch (error) {
        throw error
      }
    }
  },
  getters: {
    notes (state) {
      return state.notes
    },
    myNotes (state) {
      return state.notes
    },
    noteById (state) {
      return noteId => {
        return state.notes.find(note => note.id === noteId)
      }
    }
  }
}
