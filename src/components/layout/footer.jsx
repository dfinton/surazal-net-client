import { Component } from 'react';

import styles from './footer.module.scss';

class FooterComponent extends Component {
  render() {
    return (
      <div className="top-level">
        <div className={styles.footer}>
          <a rel="me" href="https://mastodon.surazal.net/@zalasur">Check out my Mastodon Feed!</a>
        </div>
      </div>
    );
  }
}

export default FooterComponent;
