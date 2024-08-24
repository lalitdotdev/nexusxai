'use client'

import { Button } from '../atoms/button'
import { Input } from '../atoms/input'
import { Label } from '../atoms/label'
import { SimpleDialog } from '../molecules/SimpleDialog'
import { loadStripe } from '@stripe/stripe-js'
import { trpcClient } from '@/trpc/clients/client'
import { useFormAddCredits } from '@/forms/addCredits'
import { useState } from 'react'

export const AddCredits = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useFormAddCredits()
  const [openDialog, setOpenDialog] = useState(false)
  const { mutateAsync: createStripeSession } =
    trpcClient.stripe.createSession.useMutation()

  return (
    <div className="flex font-sans flex-col gap-1">
      <Button
        onClick={() => {
          setOpenDialog(true)
        }}
      >
        Buy more credits
      </Button>
      <SimpleDialog
        open={openDialog}
        setOpen={setOpenDialog}
        title="Add Credits"
      >
        <form
          onSubmit={handleSubmit(async (data) => {
            console.log('data ', data)
            const stripeSession = await createStripeSession(data)
            const publishableKey =
              process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
            const stripe = await loadStripe(publishableKey || '')
            await stripe?.redirectToCheckout({
              sessionId: stripeSession.sessionId,
            })
            reset()
          })}
        >
          <Label title={'Credits'} error={errors.creditsCount?.message}>
            <Input
              placeholder="Enter credits..."
              type="number"
              {...register('creditsCount', { valueAsNumber: true })}
            />
          </Label>
          <Button type="submit">Create</Button>
        </form>
      </SimpleDialog>
    </div>
  )
}
