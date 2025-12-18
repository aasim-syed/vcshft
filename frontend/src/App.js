import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import { DemoButton } from './demo';
import { BrokenDemoButton } from './Brokennode';
function App() {
  return (
    <div>
      <PipelineToolbar />
      <DemoButton />
      <BrokenDemoButton />  
      <PipelineUI />
      <SubmitButton />
    </div>
  );
}

export default App;
