This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# whatdoihavetolearnnow.com :owl:
## Goals of this project:

* Use an Elixir API
* Learn Javascript tools: Typescript, TailwindCSS, Next.js
* Deploy backend with a load balancer pointing to a target group, attach an SSL to load balancer

## Ideation
Recently, a Youtuber that I follow, Ben Awad, put out an open-source voice streaming application called DogeHouse. I wanted to contribute to the project because I enjoy working with real-time applications and let's be honest, I wanted to have some experience contributing to open-source projects. But more seriously, I also wanted to learn and see how other more experienced devs create applications.

After digging through the code, I quickly realized much of the front end was written in Typescript, and the styling was in TailwindCSS. I was very intrigued and overwhelmed by the absence of CSS files and the blue .ts files instead of the yellow .js files. I was eager to learn what the heck Typescript was and why Ben constantly raves about it;

More generally, I also wanted to learn about these technologies and others like TailwindCSS and NestJS due to encountering these packages in Reddit forums.

Similarly, the backend was written in a language called Elixir. At first, I thought, "why couldn't you just write the thing in NodeJS; you know your entire youtube audience is NodeJS people". But because I was desperate to make my first contribution in the open-source world, I quickly learned the basics of Elixir by building my own bare minimum Phoenix API. That being said, I curiously did some reading and found out why Elixir is growing as a backend language. Essentially, it's very fault-tolerant, is advanced in concurrency, and, unlike NodeJS, very fast. Just like your CPU can run spawn multiple processes, the Elixir language utilizes the Erlang VM to spawn multiple inexpensive processes, which is very useful so that your backend can handle a high number of requests efficiently.

If that wasn't enough to pique my interest, I also found out Discord leverages Elixir to handle all the millions of interactions between their users.

In short, I had to check out all these new technologies... So I built a simple React website using Next.js, Typescript, and TailwindCSS that ironically enough analyzes just how popular these technologies are. Using NPM's API and Chart.js, I created a downloads visualizers for the past 20 weeks for these packages. I also included some basic information about what these packages are and 'yes or no' answers to whether or not I think you should learn these tools.

There wasn't much need for a full API for this website, but I needed some way to track the likes and views for this website, so even though it's a little overkill and something like Firebase would've been enough, I created an API using Elixir/Phoenix with a PostgreSQL DB in AWS RDS. (I'm also hoping that I could use this API in the future for my future blog posts as well, instead of just this site, so it might be handy to have this full API.)

## AWS
I had a lot of fun learning how to deploy this project on AWS because all my previous work has been deployed using my good old friend Heroku. No configuration for deploying, just add a buildpack and you're done...

But for this project, I wanted to make sure I learn how to use AWS to deploy production-level apps. Why? Just for the sake of learning, and also to apply the things I'm learning in my AWS CSA course.

The database is hosted on AWS RDS.
The API is running in an EC2 instance. The API is accessible through a load balancer that points to a target group with the EC2 instance.
Using 53, I pointed the domain whatdoineedtolearnnow.com at the load balancer. Using ACM, I associated an SSL certificate with the load balancer.

I'm happy I did all this; I learned a lot about the DevOps process, and I'm sure this knowledge will come into play in the future.😊

## Next
I deployed the Next project using Vercel, the recommended deployment method for Next apps.

I also learned a great deal about Next and the different methods for data fetching. Server Side (on build) vs server-side (on request) vs client-side using useSWR hook.

## Challenges
Initially, a big challenge was fetching the downloads data from the NPM API. Initially, for each package, I had 20 fetch calls to the NPM API happening server-side (on request).

`https://api.npmjs.org/downloads/range/${start}:${end}/typescript`

```
// => this fetch call will return
// something like
// data = {
downloads: [
{"day1": xxxxxxxx },
{"day2": xxxxxxxx },
{"day3": xxxxxxxx },
{"day4": xxxxxxxx },
.... etc.
]
}
```

This was the URL to get the downloads for a time frame. For each of the past 20 weeks I wanted downloads for, I generated a start date and an end date.

```
// week 2 weeks ago
`https://api.npmjs.org/downloads/range/03-20-2021:03-26-2021/typescript`
// last week
`https://api.npmjs.org/downloads/range/03-27-2021:04-02-2021/typescript`
```

Like that, going back to 20 weeks. I had four different packages I was fetching data for so that was 80 API calls that needed to take place on the server-side before the page gets served.
Not good.

So, I decided if the data fetching takes that long I'll just move it to the client-side using useSWR .

After moving it client-side, I realized I could just lump all the 20 weeks into one range and divide up the downloads into 20 weeks AFTER the fetch call. The fetch call returns the downloads for EACH day of the range you supplied, not just the total downloads for that range, so I can just supply the entire 20-week range and divide up the downloads into 20 weeks after the fetch call.

Using this, I was able to reduce my 80 fetch calls into 4. That sped up my application. Thank god the API returned downloads in a day-by-day format.

## Thoughts
Overall, I enjoyed working on this project a lot. It wasn't that enormous of a project (coding-wise) like my previous ones, but I feel like where the project lacked in the amount of coding, it made up for in DevOps. (By keeping the coding light, I was able to deliver the project within a specific time frame. Usually, I'll end up spending all my budgeted time frame for a project on the code, then try to deploy, make the code production ready, add favicons, set up a production environment all in a couple of days. But with this project, I spent a good 30-40% of the time figuring out how to do the latter, and I feel good about that.)

It was also great to work on a 'lighter' project while being able to learn the different frameworks like TailwindCSS, Typescript, and Next.js. With a project more complicated, I would have had a difficult time because of the added difficulty of learning new frameworks while trying to code something complex.

I'm definitely going to continue working with these packages; I especially loved working with Tailwindcss. TAILWIND IS SO Great. Ditch classNames, and just add styles directly to your components... I've been working with so many different CSS frameworks trying to find the one I like styled-components, material ui, and scss. No more... I found my CSS soulmate.

## Future ideas
I want to add MDX to this project and turn this website into my blog in the future. It just depends on whether I continue to write or not. Quite inefficiently, for this project, I had to manually format the JSX so that I could write the content similar to an article because I was too lazy to setup MDX for just one post, but in the future, if I continue to write posts, MDX is going to be very useful.

Elixir: Regarding Elixir, for my next project; I want to leverage Elixir's concurrency and speed by creating a real-time application, specifically a voice-chatting application similar to Discord. I've also been wondering a lot about how to scale stateful applications and doing some research on just this, but the best way to learn would be to just create one and create a horizontally scaled stateful application. So, that's my next plan for working with Elixir.

Thanks for reading!
## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
