import "./styles.css";
import { download } from "./download";

export default function App() {
  return (
    <div>
      <button onClick={download}>Download the goods lolz</button>
    </div>
  );
}
