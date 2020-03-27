import React from "react";
import Loading from '../../Components/Loading/Loading';
import NewMessage from '../../Components/NewMessage/NewMessage';
import AllMessages from '../../Components/AllMessages/AllMessages';

import * as styles from './Home.module.scss';
import { Component } from "react";
class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false
    };
  }

  toggleLoading = () => {
    this.setState({ loading: !this.state.loading});
  }

  render() {
    const {loading} = this.state;
    return (
      <div className={styles.Home}>
        {loading && <Loading />}
        <NewMessage toggleLoading={this.toggleLoading} />
        <AllMessages toggleLoading={this.toggleLoading} />
      </div>
    );
  }
}
export default Home;