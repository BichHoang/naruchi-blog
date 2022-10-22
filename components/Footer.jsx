import React from 'react';
import Link from 'next/link';
import useTrans from '../hooks/useTrans';

const Footer = () => {
  const trans = useTrans();
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;

  return (
    <footer className="p-4 bg-white rounded-lg shadow md:px-6 md:py-8 dark:bg-gray-900">
      <div className="sm:flex sm:items-center sm:justify-between">
        <a href={appUrl} className="flex items-center hover:cursor-pointer">
          <img src="/logo.png" className="mr-3 h-6 sm:h-9" alt="Juneyai Logo" />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            {trans.website.webname}
          </span>
        </a>
        <ul className="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400">
          <li className="px-2">
            <Link href="/about">About</Link>
          </li>
          <li className="px-2">
            <a href="#" className="hover:underline">Contact</a>
          </li>
        </ul>
      </div>
      <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2022 <a href={appUrl} className="hover:underline">{trans.website.webname}</a>. All Rights Reserved.
        </span>
    </footer>
  );
};

export default Footer;
