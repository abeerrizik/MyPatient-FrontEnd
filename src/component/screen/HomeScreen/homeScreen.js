import React from "react";
import "./homeScreen.css";
import { getNurseSchedule, updateStatus } from "../../../utils/login";

import {
  notificationSubscribe,
  requestNotificationPermission,
} from "../../../notificationManger";
import {useHistory} from "react-router-dom";

const HomeScreen = function () {
  const [schedule, setSchedule] = React.useState([]);
  const history = useHistory()

  React.useEffect(() => {
    requestNotificationPermission()
      .then(notificationSubscribe)
      .catch(console.error);

    getNurseSchedule()
      .then((data) => {
        setSchedule(data);
      })
      .catch(() => {});
  }, []);

  const handlClick = (treatment_id, status) => {
    updateStatus(treatment_id, status).then(() => {
      schedule[
        schedule.findIndex((x) => x.id === treatment_id)
      ].status = status;
      setSchedule([...schedule]);
    });
  };

  return (
    <div className="main-card">
      <div className="title">
        <p>My Schedule</p>
      </div>
      <table className="schedule-List">
        <thead>
          <tr>
            <th>Time</th>
            <th>Patient Name</th>
            <th>Room</th>
            <th>Bed</th>
            <th>Treatment</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {schedule?.map((data) => (
            <tr key={data.id} onClick={()=> history.push(`/treatment/${data.id}`)}>
              <td>{data.Time}</td>
              <td>{data["Patient Name"]}</td>
              <td>{data.Room}</td>
              <td>{data.Bed}</td>
              <td>{data.Description}</td>
              <td>
                {" "}
                <input
                  type="checkbox"
                  className="status"
                  checked={data.status}
                  onChange={() => handlClick(data.id, !data.status)}
                />{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HomeScreen;
