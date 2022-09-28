import React from 'react';
import { Button } from 'react-native';

const Arrow = props => {

  return (
    <Button  title='arrow' onPress={ props.click } >
      { props.children }
    </Button>
  );
}

export default Arrow;