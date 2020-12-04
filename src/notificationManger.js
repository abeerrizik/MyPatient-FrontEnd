import { Axios, getUrl } from "./utils/backEndApiCall";

export function requestNotificationPermission() {
  return new Promise((resolve, reject) => {
    Notification.requestPermission(function (status) {
      if (status === "granted") return resolve();
      reject();
    });
  });
}

export async function notificationSubscribe() {
  if ("serviceWorker" in navigator)
    await navigator.serviceWorker.register("/sw.js");
  const reg = await navigator.serviceWorker.ready;
  //define my device
  let sub = await reg.pushManager.getSubscription();
  const { data } = await Axios.get(getUrl("/notifications/key"));

  if (!sub)
    sub = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: data.key,
      /* todo get public key form the frontend*/
    });
  await Axios.post(getUrl("/notifications"), sub);
}
