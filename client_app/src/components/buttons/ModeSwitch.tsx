import { observer } from "mobx-react-lite";
import { Icon, SwitchContainer } from "../buttons/styled";

interface Props {
  isDarkMode: boolean | null;
  onToggle: () => void;
}

const ModeSwitch = ({ isDarkMode, onToggle }: Props) => {
  const iconSrc = isDarkMode
    ? "../../assets/moon.svg"
    : "../../assets/sun_icon.svg";
  const altText = isDarkMode ? "Dark Mode" : "Light Mode";
  return (
    <SwitchContainer onClick={onToggle}>
      <Icon src={iconSrc} alt={altText} />
    </SwitchContainer>
  );
};

export default observer(ModeSwitch);
