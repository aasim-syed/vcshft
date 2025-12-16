import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
  return (
    <div style={{ padding: '10px' }}>
      <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        <DraggableNode type='customInput' label='Input' />
        <DraggableNode type='llm' label='LLM' />
        <DraggableNode type='customOutput' label='Output' />
        <DraggableNode type='text' label='Text' />

        {/* New nodes */}
        <DraggableNode type='merge' label='Merge' />
        <DraggableNode type='math' label='Math' />
        <DraggableNode type='delay' label='Delay' />
        <DraggableNode type='apiRequest' label='API Request' />
        <DraggableNode type='booleanGate' label='Bool Gate' />
      </div>
    </div>
  );
};
