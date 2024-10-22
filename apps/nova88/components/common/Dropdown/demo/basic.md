# Basic Usage

```tsx
import { Dropdown } from 'components';
import React from 'react';

const { Option } = Dropdown;

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

const App: React.FC = () => (
  <>
   <Dropdown defaultValue="lucy" onChange={handleChange}>
    <Option value="jack">Jack</Option>
    <Option value="lucy">Lucy</Option>
    <Option value="disabled">Disabled</Option>
    <Option value="Yiminghe">yiminghe</Option>
   </Dropdown>

   <Dropdown defaultValue="lucy">
    <Option value="lucy">Lucy</Option>
   </Dropdown>

   <Dropdown value="lucy">
    <Option value="lucy">Lucy</Option>
   </Dropdown>
  </>
);

export default App; ****
```
