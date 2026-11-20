import flag_Thai from "../assets/icons/flag_Thai.png";
import flag_USA from "../assets/icons/flag_USA.png";

const LanguageSelect = () => {
  return (
    <div className="language">
      <img className="flag" src={flag_Thai} alt="icon image of the Thailand natianal flag."/>
      <img className="flag" src={flag_USA} alt="icon image of the United States of American national flag."/>
    </div>
  )
};

export default LanguageSelect;