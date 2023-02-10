import Dexie from 'dexie'

const db = new Dexie('NotesDB')
db.version(1).stores({
  notes: 'uuid, title, note'
})

export default db
