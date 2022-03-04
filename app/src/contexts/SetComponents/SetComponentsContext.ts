import { createContext } from 'react'

import { SetComponent } from './SetComponent'

interface SetComponentsProps {
  solunavaxComponents?: SetComponent[]
}

const SetComponentsContext = createContext<SetComponentsProps>({})

export default SetComponentsContext
