export type TPaymentMethod = 'SSL' | 'STRIPE' | 'PAYPAL';
export const TPaymentMethods = {
  ssl: 'SSL',
  stripe: 'STRIPE',
  paypal: 'PAYPAL'
} as const;

export const status = {
  active: 'active',
  inactive: 'inactive'
} as const;

export type TPaymentInfo = {
    method: 'SSL' | 'STRIPE' | 'PAYPAL';
    subscriptionStatus: 'active' | 'inactive';
    subscriptionStartDate?: Date;
    subscriptionEndDate?: Date;
    cardInfo: ICardInfo | null;
  }

  export type TPaymentRequest = {
    userId: string;
    amount: number;
    method: TPaymentMethod;
  }
  
  // Payment response after processing
  export type TPaymentResponse = {
    paymentId: string;
    status: 'success' | 'failed';
    transactionDate: Date;
    amount: number;
    method: TPaymentMethod;
  }
  
  // Interface for Payment Info
  export interface IPaymentInfo extends Document {
    method: TPaymentMethod;
    subscriptionStatus: 'active' | 'inactive';
    subscriptionStartDate?: Date;
    subscriptionEndDate?: Date;
    cardInfo?: ICardInfo; // Reference card info type
  }
  
  // Interface for Card Info
  export interface ICardInfo extends Document {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
  }  