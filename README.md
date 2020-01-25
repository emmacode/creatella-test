# Creatella Faces

This is an ecommerce site, where you can buy all sorts of ascii faces like `(ノ・∀・)ノ` and `¯_(ツ)_/¯`, in a wide variety of font sizes. The homepage should display a list of products for people to browse.

---

## Running the application

This application is prepackaged with the server and the client code residing in different folders. Follow the process below to run the application

- Run: `$ git clone https://github.com/emmacode/creatella-test.git`
- Run: `$ npm install`
- Run: `$ npm run start:server`
- Run: `$ npm run start:react-app`

The react app should open in port 3001 or any other port available since the server runs on 3000, but it would state this explicitly. The above commands start the server and react app

---

## Features Implemented

- Products displays in Grid.
- Users can sort products in ascending order based on "size", "price", or "id" with refresh after every filter selection.
- Faces are rendered based on font-size giving the impression of what is to be purchased.
- Prices are formatted in dollars
- Dates are formatted in relative time e.g 3 days ago except its a week
- Product Grid automatically load more items when scrolled
- Animated "Loading..." text when users scroll to load more
- "~ end of catalogue ~" message displayed when user gets to end of list.
- Next batch of items are pre-emptively fetched during idle-time and loaded on demand
- Adds randomly generated after every 20 products without 2 ads appearing in a row.
- Add to Cart functionality added
- Smooth notification system
- Responsive and simple UI

---

## Other Details

Some features like

- Add to Cart
- Displaying a notification

were extra features added to this system not explicitly stated. This were added to give the site close-to-full experience of an e-commerce store :).

Also some decisions were taken based the general use of the app. For instance, Redux was added even if this is a small library because I wanted to decouple the query data management from the UI component itself. Also a NotificationBanner component was designed without the Redux or context API because components like this is fit for use in other several project as a Plug-and-play.

Necessary comments on how germane features were implemented have been added to the code...
