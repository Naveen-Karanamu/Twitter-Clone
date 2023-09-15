import React from 'react';
import { connect } from 'react-redux';

const Temmp = ({ user }) => {
  // const userObjString = localStorage.getItem('userObj');
  // const userObj = JSON.parse(userObjString);
  // const user = userObj.userId

  // const dispatch = useDispatch();
  // // const user = useSelector((state) => state.authReducer.user._id);

  return (
    <div>
    </div>
  );
};
const userObjString = localStorage.getItem('userObj');

if (userObjString) {
  const userObj = JSON.parse(userObjString);

  // console.log(userObj);

  const userId = userObj._id;
  const username = userObj.username;
} else {
  console.log("No user data found in localStorage.");
}


const mapStateToProps = (state) => ({
  user: state.authReducer.user._id, 
});

export default connect(mapStateToProps)(Temmp);
