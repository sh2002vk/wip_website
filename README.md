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
