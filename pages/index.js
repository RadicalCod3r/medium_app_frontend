import Head from 'next/head';
import Button from '../components/button';
import Navbar from '../components/navbar';
import axios from 'axios';
import { useEffect } from 'react';
import TrendingPost from '../components/trending';


export default function Home({ blogPosts, trendingPosts }) {
  return (
    <div>
      <Navbar />
      <section id="hero" className="bg-yellow-500 flex flex-col justify-center px-6 border-b border-gray-900" style={{ height: '60vh' }}>
        <div className="sm:w-3/4 lg:w-1/2 mx-auto sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl">
          <div>
            <h1 className='font-semibold text-5xl sm:text-6xl tracking-tight'>Stay Curious.</h1>
            <p className='text-gray-800 text-xl font-semibold leading-tight my-7'>Discover stories, thinking, and expertise from writers on any topic.</p>
            <Button href='#' hoverable>Start reading</Button>
          </div>
        </div>
      </section>
      <section id="trending" className="py-10 px-6 flex flex-col ">
        <div className="container mx-auto">
          <div className="flex items-center">
            <span className='rounded-full border-2 border-gray-900 w-5 h-5 flex justify-center items-center'>
              <i className="fa-solid fa-arrow-trend-up fa-xs"></i>
            </span>
            <span className='tracking-widest text-gray-800 text-xs font-bold mx-2'>
              TRENDING ON MEDIUM
            </span>
          </div>          
          <div className="flex flex-col mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {
              trendingPosts?.slice(0, 6).map((post, i) => (
                <TrendingPost post={post} i={i} />
              ))
            }
          </div>
        </div>
      </section>
    </div>
  );
}

export const getStaticProps = async () => {
  const posts = 
    await axios
      .get('http://127.0.0.1:8000/api/v1/posts/list/')
      .then(res => res.data)
      .catch(err => err);

  const trendingPosts = 
    await axios
      .get('http://127.0.0.1:8000/api/v1/posts/list/trending/')
      .then(res => res.data)
      .catch(err => err);

  return {
    props: {
      blogPosts: posts,
      trendingPosts
    }
  }
}