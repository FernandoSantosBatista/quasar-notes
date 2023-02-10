<template>
  <q-page padding>
    <q-form
      class="q-gutter-y-md"
    >
      <q-input
        v-model="form.title"
        label="Título"
        :rules="[val => val && val.length > 0 || 'Título obrigatório']"
        outlined
      />

      <q-editor
        v-model="form.note"
        :toolbar="[
          ['bold', 'italic', 'strike', 'underline', 'link'],
          ['quote', 'unordered', 'ordered', 'outdent', 'indent'],
          ['undo', 'redo']
        ]"
      />

      <q-btn
    v-if="!this.$route.params.uuid"
    label="Adicionar"
    color="primary"
    class="full-width"
    type="submit"
    @click="addNote"
  />
  <q-btn
    v-if="this.$route.params.uuid"
    label="Atualizar"
    color="primary"
    class="full-width"
    type="submit"
    @click="updateNote"
  />
    </q-form>

  </q-page>
</template>

<script>
import db from '../boot/database'
import { v4 as uuidv4 } from 'uuid'

export default {
  data () {
    return {
      form: {
        title: '',
        note: ''
      }
    }
  },
  mounted () {
    if (this.$route.params.uuid) {
      this.loadData().catch(error => {
        console.error(error)
        this.form = {
          title: '',
          note: ''
        }
      })
    } else {
      this.form = {
        title: '',
        note: ''
      }
    }
  },
  methods: {
    async loadData () {
      try {
        const load = await db.notes.get(this.$route.params.uuid)
        this.form = load
      } catch (error) {
        console.error(error)
      }
    },
    async addNote () {
      this.form.uuid = uuidv4()
      try {
        await db.notes.add(JSON.parse(JSON.stringify(this.form)))
        this.$q.notify({
          message: 'Anotação atualizada com sucesso!',
          color: 'positive',
          icon: 'check'
        })
        this.$router.push('/')
        this.form = {
          title: '',
          note: ''
        }
      } catch (error) {
        console.error(error)
      }
    },
    async updateNote () {
      try {
        await db.notes.update(this.$route.params.uuid, JSON.parse(JSON.stringify(this.form)))
        this.$q.notify({
          message: 'Anotação atualizada com sucesso!',
          color: 'positive',
          icon: 'check'
        })
        this.$router.push('/')
        this.form = {
          title: '',
          note: ''
        }
      } catch (error) {
        console.error(error)
      }
    }
  }
}

</script>
