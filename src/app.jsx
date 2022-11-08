import { Component } from 'react';

import Body from './components/layout/body';
import Header from './components/layout/header';
import Footer from './components/layout/footer';

class App extends Component {
  render() {
    return (
      <div class="app">
        <Header />
        <Body />
        <Footer />
      </div>
    );
  }
}

export default App;
