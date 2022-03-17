import styles from "./Category.module.css";
import Icon from "../Icon/Icon";
import { FormEventHandler, useState } from "react";
import clsx from "clsx";
import { ctrlService } from "../../service";

type CategoryForm = {
  name: string;
  description: string;
  favorite: boolean;
};

export default function Category() {
  const [form, setForm] = useState<CategoryForm>({
    name: "",
    description: "",
    favorite: false,
  });
  const formHandle = (event: any) => {
    setForm((prevForm) => ({
      ...prevForm,
      [event.target.name]: event.target.value,
    }));
  };
  const toggleFavorite = () => {
    setForm((prevForm) => ({
      ...prevForm,
      favorite: !prevForm.favorite,
    }));
  };
  const sendForm = async (event: any) => {
    event.preventDefault();
    const response = await ctrlService.createCategory(form);
    console.log(`response`, response);
  };
  return (
    <div>
      <pre>{JSON.stringify(form, null, 2)}</pre>
      <form onSubmit={sendForm}>
        <div className={styles.formContainer}>
          <div className={styles.formItem}>
            <label htmlFor="name" className={styles.label}>
              Name
            </label>
            <input
              onChange={formHandle}
              name="name"
              value={form.name}
              type="text"
              className={styles.input}
            />
          </div>
          <div className={styles.formItem}>
            <label htmlFor="description" className={styles.label}>
              Description
            </label>
            <textarea
              onChange={formHandle}
              name="description"
              className={styles.input}
            />
          </div>
          <div className={styles.formItem}>
            <label htmlFor="description" className={styles.label}>
              Favorite?
            </label>
            <span className={styles.iconContainer} onClick={toggleFavorite}>
              <Icon
                name="FAVORITE"
                color="#2d303e"
                className={clsx(styles.favoriteIcon, {
                  [styles.favoriteIconActive]: form.favorite,
                })}
              />
            </span>
          </div>
          <div className={styles.buttonActions}>
            <button className={styles.buttonPrimary}>SAVE</button>
          </div>
        </div>
      </form>
    </div>
  );
}
