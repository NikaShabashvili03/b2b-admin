import React from 'react'
import { BeatLoader } from 'react-spinners'

export default function Loader() {
  return (
    <div style={{ background: 'white', width: '100%', height: '100dvh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <BeatLoader color="blue"/>
    </div>
  )
}
