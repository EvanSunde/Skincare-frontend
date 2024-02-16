"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PaymentContextProps {
  clientId: string | null;
  setClientId: React.Dispatch<React.SetStateAction<string | null>>;
  paymentIntent: object | null;
  setPaymentIntent: React.Dispatch<React.SetStateAction<object | null>>;
}

// Create the context
const PaymentContext = createContext<PaymentContextProps | undefined>(undefined);

// Create a custom hook to use the context
export const UsePaymentContext = () => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error('usePaymentContext must be used within a PaymentProvider');
  }
  return context;
};

// Create the provider component
interface PaymentProviderProps {
  children: ReactNode;
}

export const PaymentProvider: React.FC<PaymentProviderProps> = ({ children }) => {
  const [clientId, setClientId] = useState<string | null>(null);
  const [paymentIntent, setPaymentIntent] = useState<object | null>(null);

  const values: PaymentContextProps = {
    clientId,
    setClientId,
    paymentIntent,
    setPaymentIntent,
  };

  return (
    <PaymentContext.Provider value={values}>
      {children}
    </PaymentContext.Provider>
  );
};
