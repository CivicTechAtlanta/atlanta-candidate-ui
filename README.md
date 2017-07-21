
# atlanta-candidate-ui
UI for https://github.com/jordanstreiff/atlanta-candidate-api

> A Code for Atlanta project

## Build Setup

### Installing dependencies

``` bash
# install dependencies
npm install
```
### Running in development
To develop locally against the database you first need to clone and follow the instructions for [the backend](https://github.com/jordanstreiff/atlanta-candidate-api).

*Mac users may have an issue getting the backend setup because Postgres is required. The solution [here](https://stackoverflow.com/questions/19625487/impossible-to-install-pg-gem-on-my-mac-with-mavericks) may be helpful.*

Once installed, you will need to change the origins setting of the backend server to allow CORS requests. Change `config/application.rb` to read as follows:

```ruby
  config.middleware.insert_before 0, Rack::Cors do
    allow do
      origins '*' # this is the line you need to change
      #origins /https:\/\/codeforatlanta\.github\.com/
      resource '*', :headers => :any, :methods => [:get, :post, :options]
    end
  end
```

Next, change the `baseURL` variable to 'http://localhost:3000' in the files `src/Offices.vue`, `src/Office.vue`, and `src/Candidate.vue`.

You can now serve the frontend with

```bash
npm run dev
```
This will serve the frontend at localhost:8080. The server includes hot reload so no need to restart after saves.


### Build for production with minification
- Change all `baseURL` variables back to the prod version
- Make sure index.html points to `dist/build.js`
- Run the following command from your terminal
```bash
npm run build
```

## Vue framework
For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).
Also useful is [docs for Vuetify](https://vuetifyjs.com/vuetify/quick-start).
