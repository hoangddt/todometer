import { useEffect } from "react";
import { remote } from "electron";
import { useItems } from "../AppContext";

function getTimeCondition(nd) {
  let condition = false;

  switch (remote.getGlobal("notificationSettings").reminderNotification) {
    case "hour":
      condition = nd.getMinutes() === 0 && nd.getSeconds() === 0;
      break;
    case "halfhour":
      condition = nd.getMinutes() % 30 === 0 && nd.getSeconds() === 0;
      break;
    case "quarterhour":
      condition = nd.getMinutes() % 15 === 0 && nd.getSeconds() === 0;
      break;
    default:
      break;
  }

  return condition;
}

export default function useReminderNotification() {
  const { doing, pending, paused } = useItems();
  let currentDoing = null;
  if (doing.length) {
    let first = doing[0];
    currentDoing = first.text;
  } 

  useEffect(() => {
    const interval = setInterval(() => {
      let nd = new Date();

      // sends a notification if reminder notifications are enabled,
      // and todos are not completed
      if (getTimeCondition(nd) && (doing.length > 0 || pending.length > 0 || paused.length > 0)) {
        let totalRemaining = pending.length + paused.length
        let doingReminder = doing.length > 0 ? `You need to complete "${currentDoing}" and then do ${totalRemaining} remaining tasks` : "";
        let defaultText = `Don't forget, you have ${totalRemaining} tasks to do today (${pending.length} incomplete, ${
          paused.length
        } paused for later)`;
        let textInUse = doing.length > 0 ? doingReminder : defaultText;
        new Notification("todometer reminder!", {
          body: textInUse
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [pending.length, paused.length]);
}
