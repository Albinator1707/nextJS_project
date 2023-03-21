import React, { Component, useState }  from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Inter, Unkempt } from 'next/font/google';
import axios, { AxiosResponse } from 'axios';
import { GetStaticProps, InferGetStaticPropsType } from 'next';

import { Button, Htag, P, Rating } from '@/components';
import { withLayout } from '@/layout';
import { MenuItem } from '@/interfaces/menu.interface';

import styles from '@/styles/Home.module.css';

const inter = Inter({ subsets: ['latin'] });

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory?: number;
}

function Home({ menu }: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  const [rating, setRating] = useState<number>(4);

  return (
    <>
      <Htag tag='h1'> Children </Htag>
      <Button appearance='primary' arrow='right'>Button Primary</Button>
      <Button appearance='ghost' arrow='right'>Button Ghost</Button>
      <P textSize='S'>Small paragraph</P>
      <P>Medium paragraph</P>
      <P textSize='L'>Large paragraph</P>
      <Rating rating={rating} isEditable setRating={setRating}/>
      <ul>
        { menu.map(m => (<li key={m._id.secondCategory}>{m._id.secondCategory}</li>)) }
      </ul>
    </>
  );
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps = async () => {
  const firstCategory = 0;
  const { data: menu } = await axios.post<MenuItem>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
    firstCategory
  });
  return {
    props:  {
      menu,
      firstCategory
    }
  };
};

