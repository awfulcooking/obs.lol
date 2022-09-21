import { useContext } from 'react'

import OBSContext from './obsContext'

export default function useOBS() {
  return useContext(OBSContext)
}
