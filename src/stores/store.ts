import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import type { machineType, notiType } from "@/interface/main";

export const useStore = defineStore("store", () => {
  const username = ref<string>("");
  const notiActive = ref<boolean>(false);
  const history = reactive<machineType[]>([]);
  const notification = reactive<notiType[]>([]);
  function addNotification(data: machineType, status: number) {
    const current = new Date();
    const time =
      hour(current.getHours()) +
      ":" +
      min(current.getMinutes()) +
      ":" +
      sec(current.getSeconds());
    let message = "";
    if (status === 0) {
      message = `${data.name} จะซักเสร็จในอีก 1 นาที`;
    } else {
      message = `${data.name} ซักเสร็จแล้ว`;
    }
    notification.push({
      id: data.id,
      message: message,
      isReaded: false,
      created_at: time,
    });
  }
  function updateNotification(id: number) {
    const noti_id_length = notification.filter((e) => e.id === id).length;
    for (let i = 0; i < noti_id_length; i++) {
      notification.filter((e) => e.id === id)[i].isReaded = true;
    }
  }
  function checkNoti() {
    notiActive.value = false;
  }
  function addHistory(data: machineType) {
    history.push({
      id: data.id,
      name: data.name,
      rates: data.rates,
      timer: data.timer,
    });
    const history_id_length = history.filter((e) => e.id === data.id).length;
    let interval = setInterval(() => {
      if (
        history.filter((e) => e.id === data.id)[history_id_length - 1].timer ===
        0
      ) {
        notiActive.value = true;
        addNotification(data, 1);
        clearInterval(interval);
      } else {
        if (
          history.filter((e) => e.id === data.id)[history_id_length - 1]
            .timer === 60
        ) {
          addNotification(data, 0);
          notiActive.value = true;
        }
        history.filter((e) => e.id === data.id)[history_id_length - 1].timer--;
      }
    }, 1000);
  }
  const hour = (h: number) => {
    const digiH = h.toString();
    if (digiH.length < 2) {
      return "0" + digiH;
    } else {
      return digiH;
    }
  };
  const min = (m: number) => {
    const digiM = m.toString();
    if (digiM.length < 2) {
      return "0" + digiM;
    } else {
      return digiM;
    }
  };
  const sec = (s: number) => {
    const digiS = s.toString();
    if (digiS.length < 2) {
      return "0" + digiS;
    } else {
      return digiS;
    }
  };

  return {
    username,
    history,
    notiActive,
    notification,
    addHistory,
    checkNoti,
    updateNotification,
  };
});
