# WorkInProgress Engineering Principles

At WIP, we're building the future of internship recruiting. Our software is our core product. In order to have a cohesive product that is easy to debug, we aim to follow these principles:

1. Take `100% responsibility and ownership` over the code you write
2. Break up your code to be easily understandable
3. Label parts of your code and what they do through comments
4. Before you `push`, make sure to `pull` all of the latest changes and ensure that your component works with the old code
5. If you know of any problems that aren't urgent but need to be fixed, put them into `GitHub issues`
6. Use ChatGPT to speed up your development, but know all parts of the code you write 


# Get your environment setup

1. ```npm install```
2. ```npm run dev```

Open [http://localhost:3000](http://localhost:3000)

# Current TODOs
- Need to move from placeholder login to authZero
- Implement the search filter component

# Structure
- page.tsx                      _(holds the login)_
- layout.tsx                    _(basic root layout)_
  - home                        _(home page once logged in)_
    - manage
    - search
      - layout.tsx             _(holds the parameters element)_
      - page.tsx               _(will be filled later with job search results)_
    - layout.tsx               _(holds the sidebar)_
    - page.tsx                 _(empty for now, will be the home dashboard)_
  - lib                        _(will hold database models)_
  - ui                         _(has all the components)_
    - home
      - sidebar.tsx 
    - manage
    - search
      - parameters.tsx         _(the filters for search)_

## Component Structure
