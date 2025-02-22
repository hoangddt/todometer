import React from "react";
import { useAppReducer } from "../AppContext";
import styles from "./Item.module.scss";

// Individual todo item
function Item({ item }) {
  const dispatch = useAppReducer();
  let text = item.text;
  let paused = item.status === "paused";
  let completed = item.status === "completed";
  let doing = item.status === "doing";

  function deleteItem() {
    dispatch({ type: "DELETE_ITEM", item });
  }

  function pauseItem() {
    const pausedItem = { ...item, status: "paused" };
    dispatch({ type: "UPDATE_ITEM", item: pausedItem });
  }

  function resumeItem() {
    const pendingItem = { ...item, status: "pending" };
    dispatch({ type: "UPDATE_ITEM", item: pendingItem });
  }

  function completeItem() {
    const completedItem = { ...item, status: "completed" };
    dispatch({ type: "UPDATE_ITEM", item: completedItem });
  }

  function markDoingItem() {
    const completedItem = { ...item, status: "doing" };
    dispatch({ type: "UPDATE_ITEM", item: completedItem });
  }

  function changeToPending() {
    const completedItem = { ...item, status: "pending" };
    dispatch({ type: "UPDATE_ITEM", item: completedItem });
  }

  return (
    <div className={`${styles.item} ${doing ? styles.itemHightlight : ""}`} tabIndex="0">
      <div className={styles.itemName}>{text}</div>
      <div
        className={`${styles.buttons} ${completed ? styles.completedButtons : ""}`}
      >
        {!doing && !completed && (
          <button className={styles.doing} onClick={markDoingItem} tabIndex="0"></button>
        )}
        {doing && !completed && (
          <button className={styles.down} onClick={changeToPending} tabIndex="0"></button>
        )}
        <button className={styles.delete} onClick={deleteItem} tabIndex="0"></button>
        {!paused && !completed && (
          <button className={styles.pause} onClick={pauseItem} tabIndex="0"></button>
        )}
        {paused && !completed && (
          <button
            className={styles.resume}
            onClick={resumeItem}
            tabIndex="0"
          ></button>
        )}
        {!completed && (
          <button
            className={styles.complete}
            onClick={completeItem}
            tabIndex="0"
          ></button>
        )}
      </div>
    </div>
  );
}

export default Item;
