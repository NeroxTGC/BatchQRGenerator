import type { User } from 'wasp/entities';
import { type SubscriptionStatus, prettyPaymentPlanName, parsePaymentPlanId } from '../payment/plans';
import { getCustomerPortalUrl, useQuery } from 'wasp/client/operations';
import { updateCurrentUser } from 'wasp/client/operations';
import { Link } from 'wasp/client/router';
import { logout } from 'wasp/client/auth';
import { motion } from 'framer-motion';
import { LogOut, CreditCard, Mail, User as UserIcon, Info, Edit2, Check, X } from 'lucide-react';
import { useState } from 'react';

export default function AccountPage({ user }: { user: User }) {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(user.description ?? "I'm a cool customer.");
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdateDescription = async () => {
    try {
      setIsUpdating(true);
      await updateCurrentUser({
        description: description || null
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating description:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className='min-h-screen bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/20 dark:to-black py-12 px-6 pt-32 transition-colors duration-300'
    >
      <div className='max-w-4xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className='text-center mb-12'
        >
          <h2 className='text-4xl font-bold text-gray-900 dark:text-white mb-4'>Account Information</h2>
          <p className='text-gray-600 dark:text-purple-200'>Manage your account settings and subscription</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className='bg-white/50 dark:bg-purple-900/20 backdrop-blur-sm border border-purple-200 dark:border-purple-500/20 
                     rounded-2xl overflow-hidden shadow-lg transition-all duration-300'
        >
          <dl className='divide-y divide-purple-200 dark:divide-purple-500/20'>
            {!!user.email && (
              <div className='px-6 py-6 flex items-center'>
                <dt className='flex items-center gap-2 text-gray-500 dark:text-white w-1/3'>
                  <Mail className="w-5 h-5" />
                  Email address
                </dt>
                <dd className='text-gray-900 dark:text-gray-400 flex-1'>{user.email}</dd>
              </div>
            )}

            {!!user.username && (
              <div className='px-6 py-6 flex items-center'>
                <dt className='flex items-center gap-2 text-gray-500 dark:text-white w-1/3'>
                  <UserIcon className="w-5 h-5" />
                  Username
                </dt>
                <dd className='text-gray-900 dark:text-gray-400 flex-1'>{user.username}</dd>
              </div>
            )}

            <div className='px-6 py-6 flex items-center'>
              <dt className='flex items-center gap-2 text-gray-500 dark:text-white w-1/3'>
                <CreditCard className="w-5 h-5" />
                Your Plan
              </dt>
              <UserCurrentPaymentPlan
                subscriptionStatus={user.subscriptionStatus as SubscriptionStatus}
                subscriptionPlan={user.subscriptionPlan}
                datePaid={user.datePaid}
                credits={user.credits}
              />
            </div>

            <div className='px-6 py-6 flex items-center'>
              <dt className='flex items-center gap-2 text-gray-500 dark:text-white w-1/3'>
                <Info className="w-5 h-5" />
                About
              </dt>
              <dd className='text-gray-900 dark:text-gray-400 flex-1 flex items-center gap-2'>
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="flex-1 bg-white dark:bg-gray-800 border border-purple-200 dark:border-purple-500/20 
                        rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <button
                      onClick={handleUpdateDescription}
                      disabled={isUpdating}
                      className="p-1 rounded-lg bg-green-500/10 text-green-600 dark:text-green-400 
                       hover:bg-green-500/20 transition-colors duration-200"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setDescription(user.description ?? "I'm a cool customer.");
                      }}
                      className="p-1 rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 
                       hover:bg-red-500/20 transition-colors duration-200"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <>
                    {description}
                    <button
                      onClick={() => setIsEditing(true)}
                      className="p-1 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 
                       hover:bg-purple-500/20 transition-colors duration-200"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </>
                )}
              </dd>
            </div>
          </dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className='mt-8 flex justify-end'
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={logout}
            className='flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 
                      dark:from-purple-500 dark:to-pink-500 text-white font-semibold hover:shadow-lg 
                      hover:shadow-purple-500/25 transition-all duration-300'
          >
            <LogOut className="w-5 h-5" />
            Logout
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}

type UserCurrentPaymentPlanProps = {
  subscriptionPlan: string | null;
  subscriptionStatus: SubscriptionStatus | null;
  datePaid: Date | null;
  credits: number;
};

function UserCurrentPaymentPlan({ subscriptionPlan, subscriptionStatus, datePaid, credits }: UserCurrentPaymentPlanProps) {
  if (subscriptionStatus && subscriptionPlan && datePaid) {
    return (
      <>
        <dd className='mt-1 text-sm text-gray-900 dark:text-gray-400 sm:col-span-1 sm:mt-0'>{getUserSubscriptionStatusDescription({ subscriptionPlan, subscriptionStatus, datePaid })}</dd>
        {subscriptionStatus !== 'deleted' ? <CustomerPortalButton /> : <BuyMoreButton />}
      </>
    );
  }

  return (
    <>
      <dd className='mt-1 text-sm text-gray-900 dark:text-gray-400 sm:col-span-1 sm:mt-0'>Credits remaining: {credits}</dd>
      <BuyMoreButton />
    </>
  );
}

function getUserSubscriptionStatusDescription({ subscriptionPlan, subscriptionStatus, datePaid }: { subscriptionPlan: string; subscriptionStatus: SubscriptionStatus; datePaid: Date }) {
  const planName = prettyPaymentPlanName(parsePaymentPlanId(subscriptionPlan));
  const endOfBillingPeriod = prettyPrintEndOfBillingPeriod(datePaid);
  return prettyPrintStatus(planName, subscriptionStatus, endOfBillingPeriod);
}

function prettyPrintStatus(planName: string, subscriptionStatus: SubscriptionStatus, endOfBillingPeriod: string): string {
  const statusToMessage: Record<SubscriptionStatus, string> = {
    active: `${planName}`,
    past_due: `Payment for your ${planName} plan is past due! Please update your subscription payment information.`,
    cancel_at_period_end: `Your ${planName} plan subscription has been canceled, but remains active until the end of the current billing period${endOfBillingPeriod}`,
    deleted: `Your previous subscription has been canceled and is no longer active.`,
  };
  if (Object.keys(statusToMessage).includes(subscriptionStatus)) {
    return statusToMessage[subscriptionStatus];
  } else {
    throw new Error(`Invalid subscriptionStatus: ${subscriptionStatus}`);
  }
}

function prettyPrintEndOfBillingPeriod(date: Date) {
  const oneMonthFromNow = new Date(date);
  oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1);
  return ': ' + oneMonthFromNow.toLocaleDateString();
}

function BuyMoreButton() {
  return (
    <div className='ml-4 flex-shrink-0 sm:col-span-1 sm:mt-0'>
      <Link to='/pricing' className='font-medium text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500'>
        Buy More/Upgrade
      </Link>
    </div>
  );
}

function CustomerPortalButton() {
  const { data: customerPortalUrl, isLoading: isCustomerPortalUrlLoading, error: customerPortalUrlError } = useQuery(getCustomerPortalUrl);

  const handleClick = () => {
    if (customerPortalUrlError) {
      console.error('Error fetching customer portal url');
    }

    if (customerPortalUrl) {
      window.open(customerPortalUrl, '_blank');
    } else {
      console.error('Customer portal URL is not available');
    }
  };

  return (
    <div className='ml-4 flex-shrink-0 sm:col-span-1 sm:mt-0'>
      <button onClick={handleClick} disabled={isCustomerPortalUrlLoading} className='font-medium text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300'>
        Manage Subscription
      </button>
    </div>
  );
}
