// Box.jsx
function Box(props) {
  const style1 = {
    border: '2px solid blue',
    padding: '10px',
    margin: '10px'
  }
  return (
    <div style={style1}>{props.children}</div>
  );
}

export default Box;