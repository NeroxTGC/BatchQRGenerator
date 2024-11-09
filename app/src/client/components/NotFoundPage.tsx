import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export const NotFoundPage = () => {
  return (
    <>
      <Helmet>
        <title>404 - Page Not Found</title>
        <meta name="description" content="Page not found" />
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className='bg-white dark:text-white dark:bg-boxdark-2'>
        <main className='isolate dark:bg-boxdark-2'>
          <div className='flex items-center justify-center min-h-[calc(100vh-80px)]'>
            <div className='text-center px-6 py-16 sm:py-24 lg:px-8'>
              <h1 className='text-7xl font-bold text-gray-900 dark:text-white'>404</h1>
              <p className='mt-4 text-base leading-7 text-gray-600 dark:text-white'>
                Sorry, we couldn't find the page you're looking for.
              </p>
              <div className='mt-10'>
                <Link
                  to='/'
                  className='rounded-md bg-purple-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'
                >
                  Go back home
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
