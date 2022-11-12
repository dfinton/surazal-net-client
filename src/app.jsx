import { Component } from 'react';

import Column from './components/layout/column';
import Content from './components/layout/content';
import Footer from './components/layout/footer';
import Header from './components/layout/header';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <div className="body">
          <Column />
          <Content />
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
