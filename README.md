# mern-login

## Takeaway:
1. Frontend: From browser, anytime someone tries to access the home page `/`, the condition `!localstorage.getItem('token')` will redirect user to `login` if a token does not exist.

2. Backend: Anytime someone tries to access the home page (protected route), the middleware `jsonwebtoken` must be verified.
- Via the function `requireLogin` at `/middleware/auth.js`, which checks the request, to see if a `headers.authorization` is present.
- If true, `mongodb.findById` will get encrypted password.
- Then, `bycrypt.compare` will decrypt the password, to compare the actual password entered.
- The a `jsonwebtoken` will `sign` a `JWT_SECRET`.

3. Backend: Once successfully logged in, the user will be provided a token/bearer (via axios), which we save to localstorage,
then reuse to access protected routes (via another axios request). 

4. Frontend: Everytime the home page is mounted `Home.js`, `useEffect` will make a request to `/auth` with the saved Authorization `Bearer token`, saved via `localstorage`.
- Then, we save the response `res.data` to be able to render `user.name`. 

5. Backend: Anytime someon tries to login, a request is made to route `/auth/login`
- If successful, then the Bearer response token `res.data.token` is saved to `localstorage.setItem`.

6. Frontend: When a person logs out, the `localstorage` will be cleared via `localstorage.remoteItem('token')`, then user redirected to login page.

## Heroku

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

```js
heroku login
heroku create
// navigate to heroku > calm-forest-90057 > deploy > "copy" heroku git:remote -a calm-forest-90057

// to update heroku
heroku update

// Since this repo is in GitHub, I will use a `Deploy Button`
// create `app.json` file
// save all changes
git add .
git commit -m "finished"
git push

// Add .env to Heroku > Settings > Config Vars
MONGO_URI
JWT_SECRET
```

## Local Development Run the App
// run concurrent
npm run dev