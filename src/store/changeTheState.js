/** * Code for changing the state of any stateful component */
const changeTheState = (instance, objectToChange, callback) => {
  instance.setState(prevState => Object.assign({}, prevState, objectToChange), callback);
};

export default changeTheState;
