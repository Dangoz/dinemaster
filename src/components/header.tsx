// import React from 'react'
import PropTypes from "prop-types";

const Header = (item) => {
  return (
    <header>
      <h1> Hello, {item.title} !</h1>
    </header>
  )
}

Header.defaultProps = { title: "i'm a header hehe" };

Header.propTypes = {
  title: PropTypes.string.isRequired,
}


export default Header;