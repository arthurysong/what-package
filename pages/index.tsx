import React from 'react';
import Image from 'next/image'
import next, { GetServerSideProps } from 'next'
import axios from 'axios'
import moment from 'moment'
// import Chart from 'chart.js';
import { Line } from 'react-chartjs-2';
import useSWR from 'swr';

interface Props {
  data: {
    downloadsEachWeek: Array<number>,
    labels: Array<string>,
    avgGrowthOverWeek: number
  }
}

const blogId = "2c2dc9a2-9924-4555-a94b-4d2ac1ab4258";

const Home = ( props: Props ) => {
  const rgbs = {
    "typescript": "rgba(52, 211, 153, 1)",
    "next": "rgba(248, 113, 113, 1)",
    "@nestjs/core": "rgba(96, 165, 250, 1)",
    "tailwindcss": "rgba(251, 191, 36, 1)",
  }

  const options = {
    title: {
      display: true,
      text: 'Weekly Downloads for the last 20 weeks',
      fontFamily: 'Arial',
    },
    scales: {
      xAxes: [{
        ticks: {
          display: false
        },
        gridLines: {
          display: false
        }
      }],
      yAxes: [{
        ticks: {
          // fontFamily: 'Helvetica',
          // display: false,
        },
        gridLines: {
          display: false,
        }
      }]
    }
  }

  // console.log(props.data);

  // get information on this blog post 

  const { data, error } = useSWR('http://blogs-api-lb-1672867266.us-west-1.elb.amazonaws.com/api/blogs', url => (
    axios
      .get(url)
      .then(res => res.data.data)
  ))

  console.log('data', data);

  React.useEffect(() => {
    axios
      .post("http://blogs-api-lb-1672867266.us-west-1.elb.amazonaws.com/api/blogs/2c2dc9a2-9924-4555-a94b-4d2ac1ab4258/views")
      .then(resp => {
        console.log("incremented view!");
      })
  }, [])


  // I can actually do this in one API call not call the API 5000 times

  // find the end earliest date and latest date
  // divide the dates into 20 weeks.
  // reduce the divided downloads into 20 downloads.

  // we need 
  let x = moment();
  let p = "typescript";
  const end = x.subtract(1, "days").format('YYYY-MM-DD');
  const start = x.subtract(6, "days").subtract(7 * 20, "days").format('YYYY-MM-DD');

  console.log('start', start);
  console.log('end', end);

  // test commit

  const dataFetcher = url => (
    axios
      .get(url)
      .then(resp => {
        // resp.data
        // resp.data contains downloads
        const weekDownloads = [];
        const labels = [];
        const growths = [];
        
        while (resp.data.downloads.length) {
          weekDownloads.push(resp.data.downloads.splice(0, 7));
        }

        let weekBefore;
        for (let i = 0; i < weekDownloads.length; i ++) {
          labels[i] = `${weekDownloads[i][0].day} to ${weekDownloads[i][6].day}`
          weekDownloads[i] = weekDownloads[i].reduce((total, x) => total + x.downloads, 0);

          if (i == 0) {
            weekBefore = weekDownloads[i];
            continue;
          }

          const week = weekDownloads[i];

          const diff = week - weekBefore
          const percentageGrowth = (diff / weekBefore) * 100
          growths.push(percentageGrowth);
          weekBefore = week;
        }

        // console.log('growths', growths);
        const avgGrowthOverWeek = (growths.reduce((sum, current) => sum + current, 0) / growths.length)

        // console.log("weekDownloads", weekDownloads);
        // console.log("avgGrowthOverWeek", avgGrowthOverWeek);
        // console.log("labels", labels);

        return { weekDownloads, labels, avgGrowthOverWeek };
      })
  )

  const { data: typescriptData } = useSWR(`https://api.npmjs.org/downloads/range/${start}:${end}/${p}`, dataFetcher);
  // console.log('typescriptData', typescriptData);

  const chartDataForTypescript = {
    labels: typescriptData?.labels,
    datasets: [
      {
        label: 'Weekly Downloads',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: rgbs[p],
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: rgbs[p],
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: rgbs[p],
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        // This is the only parameter that changes for each graph...
        data: typescriptData?.weekDownloads
      }
    ]
  }

  // const { data: nestData } = 


  return <div className="font-sans">
    
    <div className="min-h-screen bg-gray-800">
      <div className="min-h-screen max-w-screen-sm m-auto text-white flex flex-col items-center p-8">
        <header className="flex flex-col items-center">
          <Image
            className="inline-block m-auto"
            src="/logo.png"
            alt="logo of this app, a box package with a chart behind it"
            width={100}
            height={75}
            />
          <h1 className="p-8 text-xl">
            What %&!@ing Technology do I need to learn now? (A joke, Javascript/NPM)
          </h1>
        </header>
        <section>
          <h2>
            You and <span className="text-5xl">{data && data[0]?.views - 1}</span> other visitors have wondered if you should spend your precious time learning another goddamn framework!
          </h2>
        </section>

        <section className="py-10">
          <h2 className="text-2xl">Features</h2>
          <ul className="list-disc">
            <li >Dark Mode</li>
            <li >Downloads Visualizer</li>
            <li >Answers to "Should you learn package X?" (Yes or No)</li>
            <li >Analysis of Top Javascript Libraries (Typescript, NextJS, and more) </li>
            <li >Visitor Count</li>
          </ul>
        </section>
        <section className="py-6 min-w-full flex flex-col">
          <h2 className="text-2xl text-green-400">How about Typescript?</h2>
          <Line 
            data={chartDataForTypescript} 
            options={options}
            />
          <p className="pt-4">
            <span className="text-4xl">
              {typescriptData ? typescriptData?.weekDownloads[typescriptData?.weekDownloads.length - 1].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : undefined}

            </span> Downloads last week
          </p>
          <p className="pt-4">
            <span className="text-4xl">
              {typescriptData ? typescriptData.avgGrowthOverWeek.toFixed(2) : ""}
            </span>% AVG Growth over week
          </p>
          <p className="pt-4">
          What is Typescript? Typescript is a language that's built on top of Javascript. It compiles to Javascript and runs as Javascript. Why do people use it? Because Javascript is a <strong>dynamically typed</strong> language, which means that Javascript variables don't have type declarations.  
          <br/><br/>
          Example: Function declaration in javascript
          <br/><br/>
          <span className="font-mono">
          {`function sum (x, y) {
            return x + y;
          }`}
          </span>
          <br/><br/>
          Using typescript, we can <strong>statically type</strong> the argument variables as well as the output variables of functions.
          <br/><br/>
          <span className="font-mono">
          {`function sum (x: number, y: number): number) {
            return x + y;
          }`}
          </span>
          <br/><br/>
          Creating statically typed functions makes it easier for developers to determine the behavior of a function. Whereas, with dynamically typed Javascript functions, the only way to understand function input and output rules are by testing them out.
          </p>
          <h3 className="text-4xl pt-20 text-green-400">Should you learn Typescript?</h3>
          <p className="pt-4" ><span className="text-3xl">Probably</span>, it has 20 million downloads per week. To put that in perspective, 
          React has 10 m downloads per week. The number of Typescript users has been steadily increasing by 
          ~3% each week over the past 20 weeks. In <a className="underline" href="https://insights.stackoverflow.com/survey/2020#technology-most-loved-dreaded-and-wanted-languages-loved" target="_blank">
            Stack Overflow's 2020 survey</a>, Typescript was voted the second most loved language just after Rust. And most importantly, Ben Awad, creator of DogeHouse, is a big proponent of Typescript. :)</p><br/>
          <p>But in all seriousness, it's probably a good idea to learn Typescript if you want to continue working with NodeJS because it seems pretty popular among experienced JS developers.</p>
        </section>


        {/* NEXT */}
        {/* <section className="py-6 min-w-full flex flex-col">
          <h2 className="text-2xl text-red-400">What about NextJS?</h2>
          <Line 
            data={getData("next")} 
            options={options}
            />
          <p className="pt-4">
            <span className="text-4xl">
              {(props.data.downloadsEachWeek["next"][props.data.downloadsEachWeek["next"].length - 1]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </span> Downloads last week
          </p>
          <p className="pt-4">
            <span className="text-4xl">
              {props.data.avgGrowthOverWeek["next"].toFixed(2)}
            </span>% AVG Growth over week
          </p>
          <p className="pt-4">
            What is NextJS? NextJS is a library for writing production level React application. NextJS features <strong>SSR (server side rendering)</strong> of React apps, 
            whereas create-react-app utilizes client side rendering. With client-side rendering, 
            the user has to load the app's entire bundled JS file before they begin using your website. With SSR, 
            the user is only served the HTML, JS, CSS needed for that a specific page they requested, resulting in quicker content.
            <br/><br/>
            Why NextJS?<br/>
              1) SSR (faster performance)<br/>
              2) Has a faster dev environment, faster live reloading<br/>
              3) And is optimized for SEO<br/>

            <br/>
            Basically, NextJS is just a better, more professional version of CRA. :) JK.
          </p>
          <h3 className="text-4xl pt-20 text-red-400">Should you learn NextJS?</h3>
          <p className="pt-4" ><span className="text-3xl">Yes</span>, if you want to develop in React professionally. It's time you stop using create-react-app. 
          Yes, CRA is convenient and NextJS might be overkill for your hobby React projects, but NextJS is what you'll be using professionally. </p>
        </section> */}

        {/* NEST */}
        {/* <section className="py-6 min-w-full flex flex-col">
          <h2 className="text-2xl text-blue-400">What about NestJS?</h2>
          <Line 
            data={getData("@nestjs/core")} 
            options={options}
            />
          <p className="pt-4">
            <span className="text-4xl">
              {(props.data.downloadsEachWeek["@nestjs/core"][props.data.downloadsEachWeek["@nestjs/core"].length - 1]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </span> Downloads last week
          </p>
          <p className="pt-4">
            <span className="text-4xl">
              {props.data.avgGrowthOverWeek["@nestjs/core"].toFixed(2)}
            </span>% AVG Growth over week
          </p>
          <p className="pt-4">
            What is NestJS?
            It's ExpressJS's bigger brother. <br/><br/>

            If you're like me and you came from Ruby on Rails for your backends, you were probably a bit lost on how to setup your ExpressJS backend. There's a lot 
            of great things to ExpressJS's minimalism and simplicity, but one negative is there is no inherent structure to
            an Express application (Yes, there is an express generator, but it doesn't give you full API structure). Unlike a lot of other web frameworks, for ExpressJS,
            you run <span className="font-mono">npm init .</span> and start writing out everything (config, controller, routers, middlewares) starting from your empty
            <span className="font-mono"> index.js</span>.

            <br/><br/>
            NestJS's <a className="underline" target="_blank" href="https://docs.nestjs.com/#philosophy">philosophy</a> is to solve this problem of architecture in NodeJS backends.
          </p>
          <h3 className="text-4xl pt-20 text-blue-400">Should you learn NestJS?</h3>
          <p className="pt-4" ><span className="text-3xl">Probably,</span> if you like working with ExpressJS. Something to consider: at the time I'm writing this, the current downloads for ExpressJS is 14m, which 
          makes NestJS's ~600,000 weekly downloads only a small 4.2% of Express users. That being said, Nest is growing quickly at 4% growth over last week. If you like writing in ExpressJS, it might be worth learning. 
          
          <br/><br/>
          On a side note, I think a big problem with ExpressJS, is it's speed. 
          &nbsp;<a className="underline" target="_blank" href="https://github.com/the-benchmarker/web-frameworks" >Check out the speed of different web frameworks here.</a>&mdash;nestjs-express and express are &gt; 150th on the list. 
          nestjs-fastify and fastify are &lt; 100th&mdash; If a framework isn't performant, how likely is it for companies to use them? 
          
          <br/><br/>So if you're going to learn NestJS, maybe use Fastify? (NestJS supports both Fastify and ExpressJS, and Fastify is a much faster framework)</p>
        </section> */}


        {/* Tailwind */}
        {/* <section className="py-6 min-w-full flex flex-col">
          <h2 className="text-2xl text-yellow-400">What about TailwindCSS (My Personal Favorite)?</h2>

          <div className="py-48">
            <h4 className="text-8xl">:D</h4>
            Before going into the data, I just want to say I've been trying Tailwind out, and it's been SO great to work with. No more having to deal with CSS files and arbitrary classes. 
            Okay back to the normal program.
          </div>
          
          <Line 
            data={getData("tailwindcss")} 
            options={options}
            />
          <p className="pt-4">
            <span className="text-4xl">
              {(props.data.downloadsEachWeek["tailwindcss"][props.data.downloadsEachWeek["tailwindcss"].length - 1]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </span> Downloads last week
          </p>
          <p className="pt-4">
            <span className="text-4xl">
              {props.data.avgGrowthOverWeek["tailwindcss"].toFixed(2)}
            </span>% AVG Growth over week
          </p>
          <p className="pt-4">
            What is TailwindCSS?<br/>
            A CSS framework. Remember Bootstrap? This is Bootstrap but improved. Add styles to your html/jsx using tailwinds class names. 
            <br/><br/>
            Example (old way)<br/>
            <span className="font-mono text-sm">
            /someComponent.js<br/>
            {`<div className="someNameYouHaveToSpendTimeComingUpWith">`}<br/>
            &ensp;{`Content Content Content`}<br/>
            {`</div>`}
            <br/><br/>
            /someStyles.css<br/>
            {`.someNameYouHaveToSpendTimeComingUpWith {`}<br/>
            &ensp;{`text-align: center;`}<br/>
            &ensp;{`font-size: 14px;`}<br/>
            &ensp;{`margin: 0 auto;`}<br/>
            {`}`}<br/>
            </span>

            <br/><br/>
            Example with TailwindCSS<br/>
            <span className="font-mono text-sm">
            /someComponent.js<br/>
            {`<div className="text-center text-sm mx-auto">`}<br/>
            &ensp;{`Content Content Content`}<br/>
            {`</div>`}<br/>
            </span><br/><br/>
            (Yes, you can also create your own custom classnames/rules and also it supports responsive design)<br/><br/>
            Tailwind has <a className="underline" href="https://tailwindcss.com/docs" target="_blank" >really good documentation</a>, so I really urge you to check it out for yourself. They make a really good case for the switch.
          </p>
          <h3 className="text-4xl pt-20 text-yellow-400">Should you learn TailwindCSS?</h3>
          <p className="pt-4" ><span className="text-3xl">Yes.</span> Get rid of the extra class abstractions and apply styles quickly with Tailwind :). It supports responsiveness and custom rules.</p>
        </section>

        <section className="pt-20">
          <h3 className="text-3xl">Conclusion</h3>
          <p className="pt-4">In conclusion, Yes, Software Engineering is a never ending quest to keep up with new frameworks and technologies. Yes, you should learn all the packages.</p>
        </section> */}
      </div>
    </div>
  </div>
}


const packages = [
  "typescript", 
  "@nestjs/core", 
  "next",
  // "zustand" // ??,
  "tailwindcss",
]

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const downloadsEachWeek = {};
//   const labels = [];
//   const avgGrowthOverWeek = {};


//   for (let pIndex = 0; pIndex < packages.length; pIndex ++ ) {
//     console.log("package", packages[pIndex])
//     const p = packages[pIndex];
//     downloadsEachWeek[p] = [];
//     avgGrowthOverWeek[p] = undefined;

//     let x = moment();
//     // Goes from last week => last week 20 weeks ago
//     for (let i = 0; i <= 20; i ++) {
//       const end = x.subtract(1, "days").format('YYYY-MM-DD');
//       const start = x.subtract(6, "days").format('YYYY-MM-DD')
  
//       // console.log('end', end);
//       // console.log('start', start);
  
//       if (pIndex == 0) labels.unshift(`${start} to ${end}`)
      
//       const resp = await axios.get(`https://api.npmjs.org/downloads/range/${start}:${end}/${p}`)
//       const totalDownloadsForWeek = resp.data.downloads.reduce((sum, x) => sum + x.downloads, 0);
//       // console.log("totalDownloadsForWeek", totalDownloadsForWeek);
//       downloadsEachWeek[p].unshift(totalDownloadsForWeek)
//     }
  
//     const growths = [];
//     for (let i = 0; i < downloadsEachWeek[p].length - 1; i ++ ) {
//       const week1 = downloadsEachWeek[p][i]
//       const week2 = downloadsEachWeek[p][i + 1]
//       const diff = week2 - week1
//       const percentageGrowth = (diff / week1) * 100
//       growths.push(percentageGrowth);
//     }
  
//     avgGrowthOverWeek[p] = (growths.reduce((sum, current) => sum + current, 0) / growths.length)
//   }

//   return {
//     props: {
//       data: {
//         downloadsEachWeek,
//         labels,
//         avgGrowthOverWeek
//       }
//     }
//   }
// }

export default Home;
