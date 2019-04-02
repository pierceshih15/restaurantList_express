const express = require('express');
const app = express();
const port = 3000;
const exphbs = require('express-handlebars');
const restaurantsList = require('./restaurants.json');

app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//Setting static file
app.use(express.static('public'));

// Setting homePage route
app.get('/', (req, res) => {
  res.render('index', {
    restaurants: restaurantsList.results
  })
});

app.get('/search', (req, res) => {
  const searchKeyword = req.query.keyword;

  // 處理 1.餐廳英文名稱 2.餐廳中文名稱 3.餐廳分類 的搜尋條件
  const filterRestaurants = restaurantsList.results.filter(item => {
    return item.name_en.toLowerCase().includes(searchKeyword.toLowerCase()) || item.name.toLowerCase().includes(searchKeyword.toLowerCase()) || item.category.toLowerCase().includes(searchKeyword.toLowerCase())
  })

  res.render('index', {
    keyword: searchKeyword,
    restaurants: filterRestaurants,
  })
});

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantsList.results.filter(item => item.id == req.params.restaurant_id);

  res.render('show', {
    restaurant: restaurant[0],
  })
});

app.listen(port, () => {
  console.log(`The express is listening on localhost:${port}.`);
})