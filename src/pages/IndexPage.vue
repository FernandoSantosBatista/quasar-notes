<template>
  <q-page class="">
    <q-table
      class="q-mb-xl"
      title="Anotações"
      :rows="notes"
      :columns="columns"
      row-key="name"
    >
    <template v-slot:body-cell-actions="props">
        <q-td :props="props" class="q-gutter-x-md">
          <q-btn
            icon="edit"
            color="primary"
            dense
            @click="editNote(props.row.uuid)"
          />
          <q-btn
            icon="delete"
            color="negative"
            dense
            @click="deleteNote(props.row.uuid)"
          />
        </q-td>
      </template>
  </q-table>
  <q-page-sticky position="bottom" :offset="[0, 18]">
    <q-btn fab icon="add" color="primary" @click="goToForm" />
  </q-page-sticky>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import db from '../boot/database'

export default defineComponent({
  name: 'IndexPage',
  setup () {
    const notes = ref([])
    const columns = [
      { name: 'Title', label: 'Titulo', field: 'title', align: 'left', sortable: true },
      { name: 'actions', label: 'Ações', field: 'actions', align: 'right' }
    ]

    onMounted(async () => {
      const fetchedNotes = await db.notes.toArray()
      notes.value = fetchedNotes
    })

    return {
      notes,
      columns

    }
  },
  mounted () {
    console.log(this.form)
  },
  methods: {
    goToForm () {
      this.$router.push('/formulario')
    },
    editNote (uuid) {
      this.$router.push({ name: 'formulario', params: { uuid } })
    },
    async deleteNote (uuid) {
      const notes = this.notes
      this.$q.notify({
        message: 'Deseja realmente excluir?',
        color: 'negative',
        position: 'top',
        actions: [
          {
            label: 'Excluir',
            color: 'blue-6',
            handler: async () => {
              await db.notes.delete(uuid)
              const fetchedNotes = await db.notes.toArray()
              notes.value = fetchedNotes
              this.$q.notify({
                message: 'Excluido com sucesso!',
                color: 'positive',
                position: 'top'
              })
              location.reload()
            }
          },
          {
            label: 'Cancelar',
            color: 'blue-6',
            handler: () => {
              console.log('Cancelado')
            }
          }
        ]
      })
    }

  }
})
</script>
