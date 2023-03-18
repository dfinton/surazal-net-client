import { Component } from 'react';
import Link from 'next/link';

import styles from './header.module.scss';

class HeaderComponent extends Component {
  render() {
    return (
      <header className="top-level">
        <div className={styles.header}>
          <h1>The 24th Dimension</h1>
          <span><em>&quot;This site is under construction&quot;</em></span>
        </div>
        <div className={styles.subheader}>
          <div className={styles['subheader-navigation']}>
            <ul className={styles['subheader-links']}>
              <li><Link href={"/"}>Main Page</Link></li>
              <li><Link href={"/blog"}>Blog</Link></li>
              <li><Link href={"/fractal"}>Fractals</Link></li>
            </ul>
          </div>
        </div>
      </header>
    );
  }
}

export default HeaderComponent;
