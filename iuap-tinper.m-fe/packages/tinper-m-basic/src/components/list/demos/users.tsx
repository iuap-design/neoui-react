import React from 'react'
import Person from '@tinper/m-icons/lib/cjs/Person'
import Phone from '@tinper/m-icons/lib/cjs/Phone'

export const users = [
  {
    "id": "1000001234",
    "name": "员工",
    "phone": "121****6789"
  },
  {
    "id": "9876543210",
    "name": "员工",
    "phone": "139****5678"
  },
  {
    "id": "5678901234",
    "name": "员工",
    "phone": "137****4321"
  },
  {
    "id": "0123456789",
    "name": "员工",
    "phone": "136****8765"
  },
  {
    "id": "4567890123",
    "name": "员工",
    "phone": "135****2109"
  },
  {
    "id": "8901234567",
    "name": "员工",
    "phone": "134****7890"
  }
]

export const DesComponent = ({id, phone}) => (
  <div style={{ display: 'flex', alignItems: 'center', color: '#888888', paddingBottom: '0.04rem' }}>
    <Person />
    <div style={{ marginLeft: '0.1rem', fontSize: '0.28rem', lineHeight: 1.5 }}>{id}</div>
    <div style={{ width: '0.01rem', height: '0.2rem', background: '#888888', margin: '0 0.24rem' }}/>
    <Phone />
    <div style={{ marginLeft: '0.1rem', fontSize: '0.28rem', lineHeight: 1.5 }}>{phone}</div>
  </div>
)

export default users
