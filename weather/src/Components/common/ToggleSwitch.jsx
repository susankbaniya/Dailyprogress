import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../Redux/themeSlice';
import styles from './ToggleSwitch.module.css';

const ToggleSwitch = ({ onToggle }) => {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.theme.mode);

  const handleToggle = () => {
    dispatch(toggleTheme());
    if (typeof onToggle === 'function') {
      onToggle();
    }
  };

  return (
    <input
      type="checkbox"
      className={styles.checkbox}
      checked={theme === 'light'}
      onChange={handleToggle}
    />
  );
};

export default ToggleSwitch;