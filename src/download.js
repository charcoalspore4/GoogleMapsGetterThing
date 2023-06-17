import data from "./2023_FEBRUARY.json";
function headers({ csv }) {
  return (csv += "Name,Address,Latitude,Longitude,StartTimeStamp,EndTimeStamp");
}

function sanitize(myString = "") {
  return myString.replaceAll(",", "");
}

function body({ csv }) {
  const placesVisited = data.timelineObjects.filter((d) => "placeVisit" in d);
  placesVisited.forEach(({ placeVisit }) => {
    // console.log(placeVisit)
    csv += `\n${sanitize(placeVisit.location.name)},${sanitize(
      placeVisit.location.address
    )},${placeVisit.location.latitudeE7},${placeVisit.location.longitudeE7},${
      placeVisit.duration.startTimestamp
    },${placeVisit.duration.endTimestamp}`;
  });
  return csv;
}

function generate({ csv, name }) {
  const blob = new Blob([csv], { type: "text/csv;charset=utf8;" });
  if (navigator.msSaveBlob) {
    navigator.msSaveBlob(blob, name);
  } else {
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", name);
      link.style.visibility = "hidden";
      document.body.append(link);
      link.click();
      link.remove();
    }
  }
}

export function download() {
  let csv = "";
  csv = headers({ csv });
  csv = body({ csv });
  generate({ csv, name: "2023_FEBRUARY" });
}
