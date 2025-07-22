import {
  type Node,
  type NodeProps,
  Position,
  useReactFlow,
} from '@xyflow/react';
import { useState } from 'react';

import { BaseNode, BaseNodeHeader, BaseNodeHeaderTitle } from '../base-node';
import { LabeledHandle } from '../labeled-handle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';

export type NumNode = Node<{
  value: number;
}>;

export function NumNode({ id, data }: NodeProps<NumNode>) {
  const { updateNodeData } = useReactFlow();
  const [value, setValue] = useState(data.value);

  const updateValue = (newValue: number) => {
    setValue(newValue);
    updateNodeData(id, { value: newValue });
  };

  return (
    <BaseNode className="w-32">
      <BaseNodeHeader>
        <BaseNodeHeaderTitle>Number</BaseNodeHeaderTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <MoreHorizontal className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </BaseNodeHeader>

      <div className="p-3 space-y-2">
        <Input
          type="number"
          value={value}
          onChange={(e) => updateValue(Number(e.target.value))}
          className="text-center"
        />
        <div className="flex gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => updateValue(value - 1)}
            className="flex-1"
          >
            -
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => updateValue(value + 1)}
            className="flex-1"
          >
            +
          </Button>
        </div>
      </div>

      <LabeledHandle title="out" type="source" position={Position.Right} />
    </BaseNode>
  );
} 