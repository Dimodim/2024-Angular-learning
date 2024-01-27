export class TabelItem {
  link: string
  id: string
  name: string

  constructor(rawObject: ITableItem) {
    this.id = rawObject.id
    this.link = rawObject.link
    this.name = rawObject.name
  }
}

export interface ITableItem {
  link: string
  id: string
  name: string
}
