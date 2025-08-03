import { FiSearch } from "react-icons/fi";
import { useState } from "react";
import style from "./Form.module.css";
import toast from "react-hot-toast";

interface Props {
  onSubmit: (query: string) => void;
}

export default function Form({ onSubmit }: Props) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) {
      toast.error("Введіть ключове слово для пошуку");
      return;
    }
    onSubmit(query);
    setQuery("");
  };

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <input
        className={style.input}
        placeholder="What do you want to write?"
        name="search"
        autoFocus
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className={style.button} type="submit">
        <FiSearch size="16px" />
      </button>
    </form>
  );
}
