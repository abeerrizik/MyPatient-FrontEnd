import React from "react";
import "./homeScreen.css";
import { getNurseSchedule } from "../../../utils/login";
import dayjs from "dayjs"
import {
  notificationSubscribe,
  requestNotificationPermission,
} from "../../../notificationManger";
import {useHistory} from "react-router-dom";
import {Table} from "react-bootstrap";
import useWindowSize from "../../../utils/hooks/useWindowSize";


const maxScreenWith= 800;


const HomeScreen = function () {
  const [schedule, setSchedule] = React.useState([]);
  const history = useHistory()
    const {width}= useWindowSize();

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



  return (
    <div className="homeScreen_component">
      <div className="title">
        <p>My Schedule</p>
      </div>
      <Table className={"homeScreen_table "}  hover variant={"light"} >
        <thead>
          <tr>
            <th>Time</th>
              {width > maxScreenWith && <th>Patient Name</th>}
            <th>Room</th>
            <th>Bed</th>
            <th>Treatment</th>
              {width > maxScreenWith && <th>Status</th>}
          </tr>
        </thead>
        <tbody>
          {schedule?.map((data) => (
            <tr key={data.id} onClick={()=> history.push(`/treatment/${data.id}`)} style={{"opacity":data.status?".3":1}}>
              <td>{dayjs(data.Time).format("DD/MM/YYYY HH:MM")}</td>
                {width > maxScreenWith && <td style={{textTransform:"capitalize",textAlign:"start"}}>{data["Patient Name"]}</td>}
              <td>{data.Room}</td>
              <td>{data.Bed}</td>
             {width > maxScreenWith &&<td style={{textTransform:"capitalize"}}>{data.Description}</td>}
              <td>
                {" "}
                <input
                  type="checkbox"
                  className="status"
                  checked={data.status}
                  onChange={()=>{}}
                />{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default HomeScreen;
