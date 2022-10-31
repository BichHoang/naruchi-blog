import React from 'react';
import { useRouter } from 'next/router';
import { grpahCMSImageLoader, getContentFragment } from '../util';
import { getAboutMe } from '../services/index';
import Image from 'next/image';
import Head from 'next/head';

const AboutMe = ({ me }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }

  return (
    <>
      <Head>
        <title>Juneyai - About</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="text-center mt-20 mb-8 mx-10 md:mx-20 lg:mx-40 p-12 relative rounded-lg border shadow-xl">
        <div className="absolute left-0 right-0 -top-14">
          <Image
            unoptimized
            loader={grpahCMSImageLoader}
            alt={me.avatar.fileName}
            height="100px"
            width="100px"
            className="align-middle rounded-full"
            src={me.avatar.url}
          />
        </div>
        {me.aboutMe.raw.children.map((typeObj, index) => {
          const children = typeObj.children.map((item, itemindex) => getContentFragment(itemindex, item.text, item));

          return getContentFragment(index, children, typeObj, typeObj.type);
        })}
      </div>
    </>
  );
};
export default AboutMe;

export async function getStaticProps() {
  const me = await getAboutMe();

  return {
    props: { me },
  };
}
