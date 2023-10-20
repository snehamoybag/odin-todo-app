import { todoFormDialogEl } from "./components/TodoFormDialog";
import Header from "./components/Header";

function App() {
  const containerEl = document.createElement("div");

  containerEl.append(todoFormDialogEl, Header());

  return containerEl;
}

export default App;
