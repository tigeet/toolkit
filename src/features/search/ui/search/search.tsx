import { cn } from "@bem-react/classname";
import { ChangeEvent, ChangeEventHandler, useMemo, useState } from "react";
import SearchIcon from "@shared/assets/search.svg?react";
import clsx from "clsx";
import { debounced } from "@shared/utils";

import "./search.scss";
const cl = cn("search");

type Props = {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  className?: string;
};

const Search = ({ value, onChange, placeholder, className }: Props) => {
  const [displayValue, setDisplayValue] = useState(value);
  const [focus, setFocus] = useState(false);

  const debouncedOnChange = useMemo(() => debounced(onChange), [onChange]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDisplayValue(value);
    debouncedOnChange(e);
  };

  return (
    <div className={clsx(className, cl({ focus }))}>
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
