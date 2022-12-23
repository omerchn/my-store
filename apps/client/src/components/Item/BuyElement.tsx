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
import Fade from '@mui/material/Grow'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import Skeleton from '@mui/material/Skeleton'

const promise = loadStripe(
  // dev key
  'pk_test_51MFvisCrYW49QcGki2O1EarNLKOCbgNdyIraCowfK7VoovPxrIRQHCTZMcJpqH82ETZGZJntLE8xHLvIBkMF0b1Z00gKZfjIvF',
  {
    locale: 'en',
  }
)

interface Props {
  item: Item
  refetch: () => void
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
  const [message, setMessage] = useState<{
    type: 'error' | 'success'
    body: string
  }>()
  const [markBought, markBoughtMutation] = useMarkBoughtMutation()

  const handleSubmit = async () => {
    if (!stripe || !elements) return

    setStripeLoading(true)

    const { error } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
    })

    setStripeLoading(false)

    if (error) {
      setMessage({
        type: 'error',
        body: error.message || 'Payment error',
      })
      return
    }

    const res = await markBought({
      variables: {
        id: props.id,
      },
    })

    if (res.errors) {
      setMessage({
        type: 'error',
        body: 'Server error',
      })
      return
    }

    setMessage({
      type: 'success',
      body: 'Successfully purchased item, redirecting to home page..',
    })
    setTimeout(() => {
      window.location.href = '/'
    }, 1000)
  }

  return (
    <>
      <PaymentElement id="card-element" options={{ layout: 'accordion' }} />
      {message?.type === 'error' ? (
        <Alert severity="error">{message?.body}</Alert>
      ) : message?.type === 'success' ? (
        <Alert severity="success">{message?.body}</Alert>
      ) : null}
      <Fade appear in timeout={1000}>
        <Box>
          <Button
            variant="contained"
            sx={{ width: '100%' }}
            onClick={handleSubmit}
            disabled={stripeLoading || markBoughtMutation.loading}
          >
            Buy Now
          </Button>
        </Box>
      </Fade>
    </>
  )
}
