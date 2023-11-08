import React from 'react'

import { useAuth } from '@hooks/useAuth'

import { NoTruck } from './no-truck'
import { TruckerForm } from './trucker-form'
import { UserForm } from './user-form'

export const AddAnnouncement = () => {
  const { user } = useAuth()

  if (user.type === 'USER') return <UserForm />

  if (user.type === 'TRUCKER' && !user.truck) return <NoTruck />

  if (user.type === 'TRUCKER' && user.truck) return <TruckerForm />
}
