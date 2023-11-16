import React from 'react'

import { FormScreen } from '@components/form-screen'
import { useAuth } from '@hooks/useAuth'

import { NoTruck } from './no-truck'
import { TruckerForm } from './trucker-form'
import { UserForm } from './user-form'

export const AddAnnouncement = () => {
  const { user } = useAuth()

  return (
    <FormScreen>
      {user.type === 'USER' && <UserForm />}
      {user.type === 'TRUCKER' && user.truck ? <TruckerForm /> : <NoTruck />}
    </FormScreen>
  )
}
