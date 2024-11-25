import React from 'react';  
import type { Meta, StoryObj } from '@storybook/react';  
import TextDisplay, { TextDisplayProps } from '@ys-ui/components/TextDisplay';  

const meta: Meta<TextDisplayProps> = {  
  title: 'Example/TextDisplay',  
  component: TextDisplay,  
  argTypes: {  
    color: { control: 'color' },  
    fontSize: { control: 'text' },  
  },  
};  

export default meta;  

type Story = StoryObj<TextDisplayProps>;  

export const DefaultText: Story = {  
  args: {  
    text: 'This is a default text display',  
  },  
};  

export const ColoredText: Story = {  
  args: {  
    text: 'This text has a custom color',  
    color: '#007bff',  
  },  
};  

export const LargeText: Story = {  
  args: {  
    text: 'This is a large text display',  
    fontSize: '24px',  
  },  
};