import { useStore } from "../../stores/store";
import { TempUnit, celsiusToFahrenheit } from "../../utils/unitsConverter";
import { observer } from "mobx-react-lite";

interface Props {
  value: number;
}

const Temperature = ({ value }: Props) => {
  const {
    appStore: { globalState },
  } = useStore();
  const { tempUnit } = globalState;

  if (tempUnit === TempUnit.FAHRENHEIT) {
    return <>{celsiusToFahrenheit(value)}</>;
  }

  return <div>{value}</div>;
};

export default observer(Temperature);
