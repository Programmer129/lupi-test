# Lupi Test

Test NodeJS web application

## Tech stack

1) NodeJS
2) Express JS
3) MySQL

## Build & Run

Considering you have all requirements installed.

Open your terminal:

Run the following:        
  1)   `npm install`
  2)   `node src/app.js` 

Note: Don't forget to change DB parameters in `src/db.js`.

## Play with it

Parse wiki url
```
curl --location --request POST 'http://localhost:3000/api/parse' \
--header 'Content-Type: application/json' \
--data-raw '{
    "level": 4,
    "url": "https://en.wikipedia.org/wiki/Alan_Turing",
    "maxTraversedPages": 3
}'
```

Note: Because there could be a bunch of links on a page and Wikipedia can block IP,
maxTraversedLinks is used to limit traversed pages

Find path

```
curl --location --request POST 'http://localhost:3000/api/search' \
--header 'Content-Type: application/json' \
--data-raw '{
    "pageId": 1,
    "queryString": "Territories"
}'
```

Enjoy :)
