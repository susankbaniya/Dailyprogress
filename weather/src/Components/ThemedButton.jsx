import React from "react";
import Theme from "../CustomHooks/Theme";
import { useContext } from "react";
function ThemedButton(){
    const {theme, toggleTheme}=useContext(Theme);
    return(
<button onCLick={toggleTheme}
style={{
        background: theme === 'dark' ? '#333' : '#FFF',
        color: theme === 'dark' ? '#FFF' : '#000',
        padding: '10px',
      }}
>
    Theme:[theme]
</button>
    )
}
export default ThemedButton;