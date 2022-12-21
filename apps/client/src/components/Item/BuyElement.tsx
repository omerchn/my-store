import { useState } from 'react'
import {
  Item,
  useCreatePaymentIntentQuery,
  useMarkBoughtMutation,
} from '../../../__generated__/types-and-hooks'

// stripe
import { loadStripe } from '@stripe/stripe-js'
import {
  PaymentElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js'

// components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import Skeleton from '@mui/material/Skeleton'
import { useNavigate } from 'react-router-dom'

const promise = loadStripe(
  'pk_test_51MFvisCrYW49QcGki2O1EarNLKOCbgNdyIraCowfK7VoovPxrIRQHCTZMcJpqH82ETZGZJntLE8xHLvIBkMF0b1Z00gKZfjIvF',
  {
    locale: 'en',
  }
)

interface Props {
  item: Item
}

export default function BuyElementWrapper(props: Props) {
  const { data } = useCreatePaymentIntentQuery({
    variables: { price: props.item.price },
  })

  return data ? (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        gap: '.5em',
      }}
    >
      <Elements
        stripe={promise}
        options={{
          clientSecret: data.paymentIntent.clientSecret,
          appearance: { theme: 'stripe' },
        }}
      >
        <BuyElement id={props.item.id} />
      </Elements>
    </Box>
  ) : (
    <Skeleton sx={{ width: '100%' }} />
  )
}

function BuyElement(props: { id: string }) {
  const stripe = useStripe()
  const elements = useElements()
  const [stripeLoading, setStripeLoading] = useState(false)
  const [stripeError, setStripeError] = useState<string>()
  const [markBought, markBoughtMutation] = useMarkBoughtMutation()
  const navigate = useNavigate()

  const handleSubmit = async () => {
    if (!stripe || !elements) return

    setStripeLoading(true)

    const { error } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
    })

    setStripeLoading(false)

    if (error) {
      setStripeError(error.message)
      return
    }

    const res = await markBought({
      variables: {
        id: props.id,
      },
    })

    if (!res.errors) {
      navigate('/')
    }
  }

  return (
    <>
      <PaymentElement id="card-element" options={{ layout: 'accordion' }} />
      {(stripeError || markBoughtMutation.error) && (
        <Alert severity="error">
          {stripeError || markBoughtMutation.error?.message}
        </Alert>
      )}
      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={stripeLoading || markBoughtMutation.loading}
      >
        buy now
      </Button>
    </>
  )
}
