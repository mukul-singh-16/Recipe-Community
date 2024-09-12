import React from "react";
import styles from "./BlogCard.module.css";
const BlogCard = () => {
  return (
    // eslint-disable-next-line react/no-unknown-property
    <div class={styles.card}>
      <div class={styles.cardContent}>
        <h2 class={styles.cardTitle}>Animated Card</h2>
        <p class={styles.cardBody}>
          Responsive animated card works well on every devices.
        </p>
        <a href="#" class={styles.button}>
          Learn More
        </a>
      </div>
    </div>
  );
};

export default BlogCard;
