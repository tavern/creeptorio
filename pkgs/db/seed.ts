import { cells, db, type NewCell } from '.'

const initialMapSize = 5

const cellsToInsert: NewCell[] = []

for (let x = 0; x < initialMapSize; x++) {
  for (let y = 0; y < initialMapSize; y++) {
    cellsToInsert.push({ x, y, terrain: 'grass' })
  }
}

await db.insert(cells).values(cellsToInsert).execute()
