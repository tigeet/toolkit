import { cn } from "@bem-react/classname";
import "./search.scss";
import { ChangeEvent, ChangeEventHandler, useMemo, useState } from "react";
import SearchIcon from "@shared/assets/search.svg?react";

const debounced = <T,>(fn: (value: T) => void) => {
  let id: number | null = null;
  const timeout = 300;
  return (args: T) => {
    if (id !== null) clearInterval(id);

    id = setTimeout(() => fn(args), timeout) as unknown as number;
  };
};
const cl = cn("search");

type Props = {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
};

const Search = ({ value, onChange, placeholder }: Props) => {
  const [displayValue, setDisplayValue] = useState(value);
  const [focus, setFocus] = useState(false);

  const debouncedOnChange = useMemo(() => debounced(onChange), [onChange]);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDisplayValue(value);
    debouncedOnChange(e);
  };
  return (
    <div className={cl({ focus })}>
      <SearchIcon className={cl("icon")} />
      <input
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        className={cl("control")}
        value={displayValue}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  );
};

export { Search };
