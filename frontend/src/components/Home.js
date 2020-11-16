import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const Home = ({ isAuthenticated }) => {
  // ensure user is NOT able to go back to landing page once they are on d dashboard
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <>
      <h2>Redux Boilerplate</h2>
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Home);
