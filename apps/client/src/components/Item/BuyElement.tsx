import { useState } from 'react'
import { useCreatePaymentIntentQuery } from '../../../__generated__/types-and-hooks'

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
import CircularProgress from '@mui/material/CircularProgress'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'

const promise = loadStripe(
  'pk_test_51MFvisCrYW49QcGki2O1EarNLKOCbgNdyIraCowfK7VoovPxrIRQHCTZMcJpqH82ETZGZJntLE8xHLvIBkMF0b1Z00gKZfjIvF',
  {
    locale: 'en',
  }
)

interface Props {
  price: number
}

export default function BuyElement(props: Props) {
  const { data } = useCreatePaymentIntentQuery({
    variables: { price: props.price },
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
        <BuyElementInner />
      </Elements>
    </Box>
  ) : (
    <CircularProgress sx={{ margin: 'auto' }} />
  )
}

function BuyElementInner() {
  const stripe = useStripe()
  const elements = useElements()
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<string | undefined>()

  const handleSubmit = async () => {
    if (!stripe || !elements) return

    setIsLoading(true)

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin,
      },
    })

    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message)
    } else {
      setMessage('An unexpected error occurred.')
    }

    setIsLoading(false)
  }

  return (
    <>
      <PaymentElement id="card-element" options={{ layout: 'accordion' }} />
      {message && <Alert severity="error">{message}</Alert>}
      <Button variant="contained" onClick={handleSubmit} disabled={isLoading}>
        pay now
      </Button>
    </>
  )
}
