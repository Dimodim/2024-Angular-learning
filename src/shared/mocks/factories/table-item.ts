import { TabelItem } from '../../models/tabel-item.model'

export function createTableItem({ name ='test',link ='test-1-link', id ='1' } = {}) {
  return new TabelItem({
    name,
    link,
    id,
  })
}
