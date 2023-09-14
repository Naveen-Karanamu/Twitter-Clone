import React from 'react';
import { connect } from 'react-redux';

const Temmp = ({ user }) => {
  // Access the user state from props
  // You can use the 'user' prop in your component
  console.log('User:', user);

  return (
    <div>
      {/* Your component content */}
    </div>
  );
};

// Define a function to map the Redux state to props
const mapStateToProps = (state) => ({
  user: state.authReducer.user, // 'auth' corresponds to the key used in combineReducers
});

// Connect your component to the Redux store
export default connect(mapStateToProps)(Temmp);
