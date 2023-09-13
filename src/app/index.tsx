import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { TableOfContent } from "../features/table-of-content";

import styles from "./index.module.css";

export const App = () => {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <TableOfContent />
        <div className={styles.content}>
          <div className={styles.wrapper}>Content</div>
          <Footer />
        </div>
      </main>
    </>
  );
};
