import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Articles from './Articles';
import ArticleCard from './ArticleCard';

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/articles" component={Articles} />
      <Route exact path="/articles/:id" component={ArticleCard} />
    </Switch>
  </Router>,
  document.getElementById('root')
);