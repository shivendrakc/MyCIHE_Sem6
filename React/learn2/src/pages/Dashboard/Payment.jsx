import React, { useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  InputAdornment,
  Divider,
  IconButton
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import CreditCardIcon from '@mui/icons-material/CreditCard';

const Payment = () => {
  const location = useLocation();
  const booking = location.state?.bookingDetails || {};
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [discount, setDiscount] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(null);
  const [paying, setPaying] = useState(false);

  // Example items (replace with real data as needed)
  const items = [
    { label: '1 Hour Driving Lesson', price: booking.totalAmount || 70, instructor: booking.instructor?.user?.name || 'Sam' },
    { label: 'Perosonalized Mock Test', price: 50, instructor: booking.instructor?.user?.name || 'Sam' },
    { label: 'Discounts & Offers', price: appliedDiscount ? -appliedDiscount : 0 }
  ];
  const subtotal = items.reduce((sum, item) => sum + (item.price > 0 ? item.price : 0), 0);
  const tax = +(subtotal * 0.205).toFixed(2);
  const total = +(subtotal + tax + (items[2].price || 0)).toFixed(2);

  const handleApplyDiscount = () => {
    // Example: apply a $20 discount for a specific code
    if (discount === 'CHIKAMSO-20-OFF') {
      setAppliedDiscount(20);
    } else {
      setAppliedDiscount(0);
    }
  };

  const handlePay = () => {
    setPaying(true);
    // Simulate payment process
    setTimeout(() => {
      setPaying(false);
      alert('Payment successful!');
    }, 1500);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#e3f7fd', py: 6 }}>
      <Grid container justifyContent="center" alignItems="flex-start" spacing={4}>
        <Grid item xs={12} md={6} lg={5}>
          <Box sx={{ maxWidth: 480, mx: 'auto' }}>
            <Typography variant="h4" fontWeight={700} mb={2}>
              Let's Make Payment
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={4}>
              To start your subscription, input your card details to make payment.<br />
              You will be redirected to your banks authorization page .
            </Typography>
            <Paper elevation={0} sx={{ bgcolor: 'transparent', boxShadow: 'none' }}>
              <Typography fontWeight={500} mb={1}>
                Cardholder's Name
              </Typography>
              <TextField
                fullWidth
                placeholder="PAULINA CHIMAROKE"
                value={cardName}
                onChange={e => setCardName(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Typography fontWeight={500} mb={1}>
                Card Number
              </Typography>
              <TextField
                fullWidth
                placeholder="9870 3456 7890 6473"
                value={cardNumber}
                onChange={e => setCardNumber(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CreditCardIcon sx={{ color: '#e63946', fontSize: 28, mr: 1 }} />
                    </InputAdornment>
                  )
                }}
                sx={{ mb: 2 }}
              />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography fontWeight={500} mb={1}>
                    Expiry
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="03 / 25"
                    value={expiry}
                    onChange={e => setExpiry(e.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography fontWeight={500} mb={1}>
                    CVC
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="654"
                    value={cvc}
                    onChange={e => setCvc(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Typography fontWeight={500} mt={3} mb={1}>
                Discount Code
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
                <TextField
                  fullWidth
                  placeholder="CHIKAMSO-20-OFF"
                  value={discount}
                  onChange={e => setDiscount(e.target.value)}
                />
                <Button
                  variant="outlined"
                  onClick={handleApplyDiscount}
                  sx={{ minWidth: 80 }}
                >
                  Apply
                </Button>
              </Box>
              <Button
                variant="contained"
                fullWidth
                size="large"
                sx={{ mt: 2, fontWeight: 700, fontSize: '1.1rem', bgcolor: '#397c8c' }}
                onClick={handlePay}
                disabled={paying}
              >
                Pay
              </Button>
            </Paper>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 3, maxWidth: 350, mx: 'auto', mt: { xs: 4, md: 0 }, background: 'rgba(255,255,255,0.7)', boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)' }}>
            <Typography color="text.secondary" mb={1}>
              You're paying,
            </Typography>
            <Typography variant="h3" fontWeight={700} mb={3}>
              ${total}
            </Typography>
            {items.map((item, idx) => (
              <Box key={item.label} display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Box>
                  <Typography fontWeight={600}>{item.label}</Typography>
                  {item.instructor && (
                    <Typography variant="caption" color="text.secondary">
                      Instructor: {item.instructor}
                    </Typography>
                  )}
                </Box>
                <Typography fontWeight={500}>${item.price.toFixed(2)}</Typography>
              </Box>
            ))}
            <Divider sx={{ my: 2 }} />
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography color="text.secondary">Tax</Typography>
              <Typography fontWeight={500}>${tax}</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography fontWeight={700}>Total</Typography>
              <Typography fontWeight={700}>${total}</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Payment; 