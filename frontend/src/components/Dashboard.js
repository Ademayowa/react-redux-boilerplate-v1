import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import Spinner from './layout/Spinner';
import { getCurrentProfile } from '../actions/profile';

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      Welcome {user && user.user.name}
      {/* checks if user has a profile or not */}
      {profile !== null ? (
        <Fragment> has a profile</Fragment>
      ) : (
        <Fragment> NO PROFILE</Fragment>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
