import React, { useState, useEffect } from 'react';
import useTrans from '../hooks/useTrans';
import { useRouter } from "next/router";
import Link from 'next/link';
import { getCategories } from '../services';
import { useSelector } from 'react-redux';

const Header = () => {
  const trans = useTrans();
  const [categories, setCategories] = useState([]);
  const [isOpenMobileMenu, togleSearchMobile] = useState(false);
  const [mobileClass, setmobileClass] = useState("hidden");
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const categoryCurrentSlug = useSelector((state) => state.common.categoryCurrentSlug);

  const appUrl = process.env.NEXT_PUBLIC_APP_URL;

  useEffect(() => {
    getCategories().then((newCategories) => {
      setCategories(newCategories);
    });
  }, []);

  const onInputChange = (e) => {
    const { target } = e;
    setKeyword(target.value);
  };

  const toggleMobileMenu = () => {
    togleSearchMobile(!isOpenMobileMenu);
    if (isOpenMobileMenu) {
      setmobileClass('');
    } else {
      setmobileClass('hidden');
    }
  };

  const searchPosts = (e) => {
    e.preventDefault();
    togleSearchMobile(false);
    setmobileClass('hidden');
    router.push({
      pathname: '/search',
      query: { keyword: keyword },
    })
  }

  return (
    <nav className="fixed w-full z-50 bg-base-secondary border-gray-300 border-b px-2 sm:px-4 py-2.5 shadow-lg rounded dark:bg-gray-900">
      <div className="container flex flex-wrap justify-between items-center mx-auto px-10">
        <a href={appUrl} className="flex items-center hover:cursor-pointer">
          <img src="/logo.png" className="mr-3 h-6 sm:h-9" alt="Juneyai Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            { trans.website.webname }
          </span>
        </a>
        <div className="flex md:order-2">
          <button type="button" onClick={ toggleMobileMenu } data-collapse-toggle="navbar-search" aria-controls="navbar-search" aria-expanded="false"
            className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700
              focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1">
            <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd">
              </path>
            </svg>
            <span className="sr-only">{ trans.common.search }</span>
          </button>
          <div className="hidden relative md:block">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
              </svg>
              <span className="sr-only">{ trans.common.searchIcon }</span>
            </div>
            <form onSubmit={ searchPosts } >
              <input value={ keyword } onChange={onInputChange} type="text" id="search-navbar" className="block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={ trans.placeholder.search } />
            </form>
          </div>
          <button onClick={ toggleMobileMenu } data-collapse-toggle="navbar-search" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-search" aria-expanded="false">
            <span className="sr-only">{ trans.common.openMenu }</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
          </button>
        </div>
        <div className={"justify-between items-center w-full md:flex md:w-auto md:order-1 " + mobileClass} id="navbar-search">
          <div className="relative mt-3 md:hidden">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
            </div>
            <form onSubmit={ searchPosts } >
              <input value={ keyword } onChange={onInputChange} type="text" id="search-navbar" className="block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={ trans.placeholder.search } />
            </form>
          </div>
          <div className="flex flex-col text-right md:float-left md:contents uppercase">
            { categories.map((category, index) => (
                <Link key={index} href={`/category/${category.slug}`}>
                  <span className={`md:float-right mt-2 ${(categoryCurrentSlug === category.slug) ? 'text-base-600' : 'text-black'} mr-6 font-semibold cursor-pointer dark:text-white`}>
                    {category.name}
                  </span>
                </Link>
            ))}
            <Link href="/about"><span className="md:float-right mt-2 align-middle text-black font-semibold cursor-pointer">{ trans.menu.about }</span></Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
