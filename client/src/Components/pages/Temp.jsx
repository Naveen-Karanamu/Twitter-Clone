import React from 'react';
import { connect } from 'react-redux';

const Temmp = ({ user }) => {
  console.log('User:', user);

  return (
    <div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.authReducer.user._id, 
});

export default connect(mapStateToProps)(Temmp);
