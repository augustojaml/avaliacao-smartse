import { v4 as uuidv4 } from 'uuid'

abstract class BaseEntity<Props> {
  public readonly id: string
  public readonly props: Props

  protected constructor(props: Props, id?: string) {
    this.id = id ?? uuidv4()
    this.props = props
  }
}

export { BaseEntity }
