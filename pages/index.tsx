import React, { FunctionComponent } from 'react';

import Link from 'next/link'
// import next, { GetServerSideProps } from 'next'
// import axios from 'axios'
// import moment from 'moment'
// // import Chart from 'chart.js';
// import { Line } from 'react-chartjs-2';
// import useSWR from 'swr';

interface Props {
  // data: {
  //   downloadsEachWeek: Array<number>,
  //   labels: Array<string>,
  //   avgGrowthOverWeek: number
  // }
}

const API_URL = "https://arthurblogsapi.com/api/blogs";

const Home = ( props: Props ) => {

  return <div className="min-h-screen bg-gray-800">
    <div className="relative min-h-screen max-w-screen-sm m-auto text-white flex flex-col items-start p-8">
    </div>
  </div>
}

export default Home;
