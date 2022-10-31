import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import useTrans from '../hooks/useTrans';
import { getCategories } from '../services';
import { useSelector } from 'react-redux';

const Categories = () => {
  const trans = useTrans();
  const [categories, setCategories] = useState([]);
  const categoryCurrentSlug = useSelector((state) => state.common.categoryCurrentSlug);

  useEffect(() => {
    getCategories().then((newCategories) => {
      setCategories(newCategories);
    });
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">{ trans.title.categories }</h3>
      {categories.map((category, index) => (
        <Link key={index} href={`/category/${ category.slug }`}>
          <span className={`cursor-pointer block hover:text-base-600 ${ (categoryCurrentSlug === category.slug) ? 'text-base-600' : '' } ${ (index === categories.length - 1) ? 'border-b-0' : 'border-b'} pb-3 mb-3` }>
            {category.name}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default Categories;
