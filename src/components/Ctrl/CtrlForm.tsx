import { useEffect, useState } from "react";
import { ctrlService } from "../../service";
import styles from "./CtrlForm.module.css";

export default function CtrlForm() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    categoryId: "",
  });
  const [categories, setCategories] = useState<any>([]);

  useEffect(() => {
    getCategories();
  }, []);
  const getCategories = async () => {
    const { data } = await ctrlService.getCategories();
    setCategories(data);
  };
  const formHandle = (event: any) => {
    setForm((prevForm) => ({
      ...prevForm,
      [event.target.name]: event.target.value,
    }));
  };
  const sendForm = async (event: any) => {
    event.preventDefault();
    if (!form.categoryId) {
      alert("do you need select a category");
      return;
    }
    const response = ctrlService.createCtrl(form);
    console.log(`response`, response);
  };
  return (
    <div>
      <pre>{JSON.stringify(form, null, 2)}</pre>
      <form onSubmit={sendForm}>
        <div className={styles.formContainer}>
          <div className={styles.formItem}>
            <label htmlFor="title" className={styles.label}>
              Title
            </label>
            <input
              onChange={formHandle}
              name="title"
              value={form.title}
              type="text"
              className={styles.input}
              required
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
            <select name="categoryId" onChange={formHandle} required>
              <option>----- SELECT A CATEGORY0-----</option>
              {categories.map((category: any) => (
                <option key={category.category_id} value={category.category_id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.buttonActions}>
            <button className={styles.buttonPrimary}>SAVE</button>
          </div>
        </div>
      </form>
    </div>
  );
}
