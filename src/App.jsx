import "./App.css";

import PropTypes from "prop-types";

function App() {
  return <ChildComponent requiredText="string" />;
}

function ChildComponent(props) {
  return (
    <>
      <p>Required: {props.requiredText}</p>
      <p>Optional: {props.optionalText}</p>
    </>
  );
}

ChildComponent.propTypes = {
  optionalText: PropTypes.string,
  requiredText: PropTypes.string.isRequired,
};

ChildComponent.defaultProps = {
  optionalText: "default",
};

export default App;
